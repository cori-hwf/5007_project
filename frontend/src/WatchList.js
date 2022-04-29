import React from "react";
import Movie_small from "./Movie_small";
import {graphQLFetch} from "./helper/graphqlFetch.js";

class WatchList extends React.Component{
    constructor() {
        super();
        this.state ={movies:[]}
        this.set_movies_state =this.set_movies_state.bind(this)
    }

    componentDidMount(){
        this.fetchMovie();

    }

    set_movies_state(movies){
        this.setState({movies: movies})
      }

    async fetchMovie(){
        const query = `query {
            fetchmovie{
            savedmovie{
                _id
                movieid
                poster_path
                title
                vote_average
            }
            }
            }`;
        const data = await graphQLFetch(query,this.props.token);
        this.set_movies_state(data.fetchmovie.savedmovie)
//        console.log("check backend")
//        console.log(data.fetchmovie.savedmovie) //the data wanted

      }

    render() {
      
        return (
            <>
                <h1 align="center">My watch list</h1>
                <div className="movie-container">
                    {this.state.movies.length > 0 && this.state.movies.map((movie) => <Movie_small key={movie.id} {...movie} token={this.props.token} updateWatchList = {this.set_movies_state}/>)}
                </div>
            </>
        );
    }

}

export default WatchList;
