const express = require('express');
const bodyParser = require('body-parser');
const graphqlHttp = require('express-graphql').graphqlHTTP; //a middleware that takes in incoming request -> funnel through graphql parser -> forward to resolvers
const mongoose = require('mongoose');

const graphQlSchema = require('./graphql/schema/index');
const resolvers = require('./graphql/resolvers/index')
//const {buildSchema} = require('graphql');
//const bcrypt = require('bcryptjs'); //to hash password for security sake
//const User = require('./models/user');

const isAuth = require('./middleware/is-auth');


const app = express();

app.use(bodyParser.json());

app.use((req,res,next) => { //resolve the CORS issue
    res.setHeader('Access-Control-Allow-Origin','*') //any clients are allowed to send request to this server
    res.setHeader('Access-Control-Allow-Methods','POST,GET,OPTIONS');
    res.setHeader('Access-Control-Allow-Headers','Content-Type, Authorization'); //Headers that can be sent to the server 
    if (req.method === 'OPTIONS'){return res.sendStatus(200);}
    next(); //if it's not options -> continue to next
})

app.use(isAuth);//add in isAuth property to the metadata

app.use('/graphql',
     graphqlHttp({
    schema:graphQlSchema,
    rootValue:resolvers, //resolver

    graphiql: true
}));

mongoose.connect(`mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASSWORD}@cluster0.bebr0.mongodb.net/${process.env.MONGO_DB}?retryWrites=true&w=majority`)
.then(() => {
    app.listen(8081);
    console.log("connected to db")
}).catch(err => {console.log(err)});

