import React from "react";
const IMG_API = "https://image.tmdb.org/t/p/w500";


class Movie_small extends React.Component{
    constructor() {
        super();

    }


    render(){
        return (

            <div className="movie">
                <img src= {this.props.poster_path? (IMG_API + this.props.poster_path) :
                    "https://images.pexels.com/photos/2486168/pexels-photo-2486168.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"}
                     alt="Image Not Found!"/>
                <div className="movie-info">
                    <h3>{this.props.title}</h3>
                    <span>{this.props.vote_average}</span>
                </div>

                <div className="movie-over" align="center">
                    <button className="remove-bu">
                        <i className="fa fa-trash-o fa-lg"></i> Delete
                    </button>
                </div>
            </div>

        );
    }
}

export default Movie_small;
