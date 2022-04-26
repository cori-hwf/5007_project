import React, {useEffect, useState} from "react";
import './DetailPage.css'
import Movie from "./Movie";

const IMG_API_BACK = "https://image.tmdb.org/t/p/original";
const IMG_API = "https://image.tmdb.org/t/p/w500";
const per_movie = "http://api.themoviedb.org/3/movie/"
const API_KEY = "?api_key=b04fbab9b2da3ad07f3c3f82bdd2c994"
const movie_cast = "https://api.themoviedb.org/3/movie/"
const cast_API_KEY = "/credits?api_key=b04fbab9b2da3ad07f3c3f82bdd2c994"



function DetailPage(props){
    const [casts, setCasts] = useState([]);
    useEffect(() =>{
        fetch(movie_cast + props.move_info.id + cast_API_KEY).then(res => res.json()).then(data =>{
            setCasts(data.cast);
        });

    }, [])

    // 用 props.user_name 获取用户名称

        return (

            <div className="con">
                 <img src= {props.move_info.backdrop_path? (IMG_API_BACK + props.move_info.backdrop_path) :
                     "https://images.pexels.com/photos/2486168/pexels-photo-2486168.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"}
                     alt="Image Not Found!" className="image_back"/>


                <img src= {props.move_info.poster_path? (IMG_API + props.move_info.poster_path) :
                    "https://images.pexels.com/photos/2486168/pexels-photo-2486168.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"}
                     alt="Image Not Found!" className="image_front"/>


                <h1 className="detail_title">{props.move_info.original_title}</h1>
                <h3 className="release_date">Release Date: {props.move_info.release_date}</h3>
                <h3 className="ratings">User Score: {props.move_info.vote_average}</h3>
                <h3 className="number_vote">Vote Count: {props.move_info.vote_count}</h3>
                <h2 className="overview">Overview</h2>
                <h4 className="detail_overview">{props.move_info.overview}</h4>

                <button className="button-addwatchlist" role="button">Add to Watchlist</button>


                <h2 className="cast">Casts</h2>

                {casts.length > 0 && <img src={IMG_API + casts[0].profile_path} className="cast1"/>}
                {casts.length > 0 && <h4 className="name1"> {casts[0].name.split(' ').slice(-1)} </h4>}
                {casts.length > 0 && <img src={IMG_API + casts[1].profile_path} className="cast2"/>}
                {casts.length > 0 && <h4 className="name2"> {casts[1].name.split(' ').slice(-1)} </h4>}
                {casts.length > 0 && <img src={IMG_API + casts[2].profile_path} className="cast3"/>}
                {casts.length > 0 && <h4 className="name3"> {casts[2].name.split(' ').slice(-1)} </h4>}
                {casts.length > 0 && <img src={IMG_API + casts[3].profile_path} className="cast4"/>}
                {casts.length > 0 && <h4 className="name4"> {casts[3].name.split(' ').slice(-1)} </h4>}
                {casts.length > 0 && <img src={IMG_API + casts[4].profile_path} className="cast5"/>}
                {casts.length > 0 && <h4 className="name5"> {casts[4].name.split(' ').slice(-1)} </h4>}
            </div>
        )
}

export default DetailPage;
