import React from "react";
const IMG_API = "https://image.tmdb.org/t/p/w500";




class Movie extends React.Component{
    constructor() {
        super();

    }

    handleclick(prob_in) {
        prob_in.click_control(prob_in)
    }


    render(){
        return (

            <div className="movie">
                <img src= {this.props.poster_path? (IMG_API + this.props.poster_path) :
                    "https://images.pexels.com/photos/2486168/pexels-photo-2486168.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"}
                     alt="Image Not Found!" onClick={e => {e.preventDefault(); this.handleclick(this.props)}}/>
                <div className="movie-info">
                    <h3>{this.props.title}</h3>
                    <span>{this.props.vote_average}</span>
                </div>

                <div className="movie-over">
                    <h4>Overview:</h4>
                    <h4>{this.props.overview}</h4>
                </div>
            </div>

        );
    }
}

export default Movie;
