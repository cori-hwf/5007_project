const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const movieSchema = new Schema({
    adult: {type: Boolean},
    backdrop_path: {type: String},
    movieid: {type: String,
        required: true
    },
    original_language: {type: String},
    original_title: {type: String},
    overview: {type: String},
    popularity: {type: Number},
    poster_path: {type: String},
    release_date: {type: String},    
    video: {type: Boolean},  
    vote_average: {type: Number},      
    release_date: {type: String},  
    title: {type: String},
    vote_average: {type: Number},    
    vote_count: {type: Number},
    saver: [
    {
        type: Schema.Types.ObjectId,
        ref: 'User'
    }
    ]
}) ;

module.exports = mongoose.model('Movie',movieSchema)