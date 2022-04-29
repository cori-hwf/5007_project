import React from "react";
import Movie_small from "./Movie_small";

class WatchList extends React.Component{
    constructor() {
        super();
    }

    render() {
        return (
            // {this.props.user_name}
            // this.props.watch_list
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
