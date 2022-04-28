import React from "react";
import Movie_small from "./Movie_small";

class WatchList extends React.Component{
    constructor() {
        super();
        this.state = {
            movies: [{id: 629542, poster_path: "/7qop80YfuO0BwJa1uXk1DXUUEwv.jpg", title: "The Bad Guys", vote_average: 7.4},
                     {id: 629543, poster_path: "/7qop80YfuO0BwJa1uXk1DXUUEwv.jpg", title: "The Bad Guys", vote_average: 7.4},
                     {id: 629544, poster_path: "/7qop80YfuO0BwJa1uXk1DXUUEwv.jpg", title: "The Bad Guys", vote_average: 7.4}]
        }
    }

    render() {
        return (
            // {this.props.user_name}
            <>
                <h1 align="center">My watch list</h1>
                <div className="movie-container">
                    {this.state.movies.length > 0 && this.state.movies.map((movie) => <Movie_small key={movie.id} {...movie}/>)}
                </div>
            </>
        );
    }

}

export default WatchList;
