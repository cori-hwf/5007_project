const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
    email: {
        type: String,
        required:true
    },
    password: {
        type: String,
        required: true
    },
    savedmovie: [
    {
        type: Schema.Types.ObjectId,
        ref: 'Movie'
    }
    ]

}) ;

module.exports = mongoose.model('User',userSchema)
