import React from "react";
const IMG_API = "https://image.tmdb.org/t/p/w500";
const Movie = ({title, poster_path, overview, vote_average}) => (

    <div className="movie">
        <img src= {poster_path? (IMG_API + poster_path) :
            "https://images.pexels.com/photos/2486168/pexels-photo-2486168.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"}
             alt="Image Not Found!"/>
        <div className="movie-info">
            <h3>{title}</h3>
            <span>{vote_average}</span>
        </div>

        <div className="movie-over">
            <h4>Overview:</h4>
            <h4>{overview}</h4>
        </div>
    </div>
)

export default Movie;