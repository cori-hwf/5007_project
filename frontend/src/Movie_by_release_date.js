import React, {useEffect, useState} from "react";
import Movie from "./Movie";

const FEATURED_API = "https://api.themoviedb.org/3/discover/movie?year=2022&api_key=b04fbab9b2da3ad07f3c3f82bdd2c994&page=5"



function Movie_by_release_date(probs){
    const [movies, setMovies] = useState([]);
    useEffect(() =>{
        fetch(FEATURED_API).then(res => res.json()).then(data =>{
            setMovies(data.results.filter(each => each.poster_path != null && each.backdrop_path != null));
        });
    }, [])


    return (
        <div className="movie-container">
            {movies.length > 0 && movies.map((movie) => <Movie key={movie.id} {...movie} click_control = {probs.jump}/>)}
        </div>
    )
}


export default Movie_by_release_date;
