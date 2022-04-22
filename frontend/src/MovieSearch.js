import React, {useEffect, useState} from "react";
import Movie from "./Movie";

const FEATURED_API = "https://api.themoviedb.org/4/discover/movie?sort_by=popularity.desc&api_key=b04fbab9b2da3ad07f3c3f82bdd2c994&page=1";
const SEARCH_API = "https://api.themoviedb.org/3/search/movie?&api_key=b04fbab9b2da3ad07f3c3f82bdd2c994&query=";



const MovieSearch = (probs) =>{
    const [movies, setMovies] = useState([]);

    useEffect(() =>{
        fetch(SEARCH_API + probs.searchStuff).then(res => res.json()).then(data =>{
            setMovies(data.results);
        });
    })


    return (
        <div className="movie-container">
            {movies.length > 0 && movies.map((movie) => <Movie key={movie.id} {...movie} />)}
        </div>
    )
}


export default MovieSearch;
