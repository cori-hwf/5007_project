const bcrypt = require('bcryptjs'); //to hash password for security sake
const jwt = require('jsonwebtoken')

const User = require('../../models/user');

module.exports ={
    createUser: async (args) => { 
        try{
        const user = await User.findOne({email: args.userInput.email}) //asynchornous function with return allows graphql to wait for the return value
        if (user) {throw new Error('There is an existing account.')}
        
        const hashedpassword= await bcrypt.hash(args.userInput.password,12)  //else create an user and save to db; 
          
        const newUser = new User({
        email: args.userInput.email,
        password: hashedpassword
        });

        const result = await newUser.save(); //save to db
        return {...result._doc,  _id: result._doc._id.toString(), password: null } //return the user object; ._doc gets rid of the meta data; the _id property needs to be converted to string
        }
        
        catch(error) {throw error;}
    },


    login: async ({email,password}) => {
        try{
        const user = await User.findOne({email:email});
        if (!user) {throw new Error('Invalid Credential')}
        
        const isEqual = await bcrypt.compare(password,user.password);
        if (!isEqual){throw new Error('Invalid Credential');}
        
        const token = jwt.sign({userId: user.id, email: user.email},'secretkey', {expiresIn: '1h'});//create an token; (data to be stored in the token, a string used to hash the token(private key), token valid duration )
        return {userId: user.id, token: token, tokenExpiration:1}
        }
        catch(error) {throw error;}

    }

}