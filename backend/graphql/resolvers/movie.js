const User = require('../../models/user');
const Movie = require('../../models/movie');


module.exports= {
    saveMovie: async (args,req) => {
        if (!req.isAuth) {throw new Error('Unauthenticated!')};
        try{
            const user = await User.findById(req.userId);
            if (!user) {throw new Error('User not found.');} 

            //save user to movie (saver property) 
            const moviefetch = await Movie.findOne({movieid: args.movieInput.movieid});
            if (!moviefetch){
                const movie = new Movie({
                    adult: args.movieInput.adult,
                    backdrop_path: args.movieInput.backdrop_path,
                    movieid: args.movieInput.movieid,
                    original_language: args.movieInput.original_language,
                    original_title: args.movieInput.original_title,
                    overview: args.movieInput.overview,
                    popularity: args.movieInput.popularity,
                    poster_path: args.movieInput.poster_path,
                    release_date: args.movieInput.release_date,
                    title: args.movieInput.title,
                    vote_average: args.movieInput.vote_average,
                    vote_count: args.movieInput.vote_count,
                    saver: user.id
                });
                await movie.save();
            }

            else{
                moviefetch.saver.push(user.id);
                await moviefetch.save();
                }

            //save movie to user (savedmovie property)
            const result = await Movie.findOne({movieid: args.movieInput.movieid});
            user.savedmovie.push(result.id);
            user.save();
            return {...result._doc,  _id:result.id}
        }
        catch(e){
            console.log(e);
            throw e;}
    },

    fetchmovie: async(args,req) => {
        if (!req.isAuth) {throw new Error('Unauthenticated!')};
        try{
            const user = await User.findById(req.userId).populate('savedmovie');
            if (!user) {throw new Error('User not found.');} 
            return {...user._doc,  _id: user._doc._id.toString()};
        }
        catch(e){throw e;}
    },


    unsaveMovie: async(args,req) => {
        if (!req.isAuth) {throw new Error('Unauthenticated!')};
        try{
            const user = await User.findById(req.userId).populate('savedmovie');
            if (!user) {throw new Error('User not found.');} 
            const movie = await Movie.findById(args.objectid).populate('saver');
            if (!movie) {throw new Error('Movie not found.');}
            user.savedmovie.pull(args.objectid);
            movie.saver.pull(req.userId);
            user.save();
            movie.save();
            return {...user._doc,  _id: user._doc._id.toString()};
        }
        catch(e){throw e;}
    }
}