import React, {useEffect, useState} from "react";
import Movie from "./Movie";
import Login from "./login";
import MovieFeed from "./MovieFeed";
import MovieSearch from "./MovieSearch";
import CreateAccount from "./CreateAccount";
import DetailPage from "./DetailPage";
import WatchList from "./WatchList";
import Movie_by_release_date from "./Movie_by_release_date";
import Movie_by_popularity from "./Movie_by_popularity";
import {graphQLFetch} from "./helper/graphqlFetch.js";

class App extends React.Component{
  constructor() {
    super();
    this.state = {
      control_state: 'main_page',
      searchStuff: "",
      click_movie_info: null,
      logged_in_user_name: null,
      token: null,
      timer: null,
      user_watchlist: null
    }
    this.handleSubmit = this.handleSubmit.bind(this);
    this.jump_to_log_in = this.jump_to_log_in.bind(this);
    this.jump_to_create_account = this.jump_to_create_account.bind(this)
    this.jump_to_detail_page = this.jump_to_detail_page.bind(this)
    this.set_log_in_user = this.set_log_in_user.bind(this)
    this.set_token = this.set_token.bind(this)  
    this.set_log_out = this.set_log_out.bind(this)
    this.auto_log_out = this.auto_log_out.bind(this)
    this.if_successful_log_in = this.if_successful_log_in.bind(this)
    this.fetchMovie = this.fetchMovie.bind(this)
  }

  jump_to_log_in(){
    //console.log(this.state.control_state)
    this.setState({control_state:'log_in'})
  }

  jump_to_create_account(){
    this.setState({control_state:'create_account'})
  }

  set_log_in_user(user_name){
    this.setState({logged_in_user_name: user_name})
  }

  set_token(token){
    this.setState({token: token})
  }

  set_log_out(event,message = null){
    if (message!==null){alert(message);}
    else {clearTimeout(this.state.timer);}
    this.setState({logged_in_user_name: null, token:null, control_state: 'main_page',timer:null})
  }

  auto_log_out(expiration){
    const timerId = setTimeout(()=>{this.set_log_out("","Your login has expired, please login again.")},expiration);
    this.setState({timer:timerId})
  }

  jump_to_detail_page(move_info){
    this.setState({control_state:'detail_page', click_movie_info : move_info})
  }

  if_successful_log_in(){
    this.setState({control_state:'main_page'})
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
    const data = await graphQLFetch(query,this.state.token);
    console.log("check backend")
    console.log(data.fetchmovie.savedmovie) //the data wanted
    this.setState({user_watchlist: data.fetchmovie.savedmovie})
  }


  control() {
    if (this.state.control_state == 'main_page') {
      return (<MovieFeed jump={this.jump_to_detail_page}/>)
    } else if (this.state.control_state == 'log_in') {
      return (<Login jump={this.jump_to_create_account} set_user = {this.set_log_in_user} set_token = {this.set_token} handle_expiration = {this.auto_log_out} change_to_main = {this.if_successful_log_in}/>)
    } else if (this.state.control_state == 'search') {
      return (<MovieSearch {...{searchStuff: this.state.searchStuff, jump: this.jump_to_detail_page}}/>)
    } else if(this.state.control_state == 'create_account'){
      return (<CreateAccount jump={this.jump_to_log_in}/>)
    } else if(this.state.control_state == 'detail_page'){
      return (<DetailPage move_info = {this.state.click_movie_info} user_name = {this.state.logged_in_user_name} token={this.state.token}/>)
    }else if(this.state.control_state == 'watch_list'){
      return (<WatchList user_name = {this.state.logged_in_user_name} token={this.state.token} watch_list={this.state.user_watchlist}/>)
    }else if(this.state.control_state == 'by_release_date') {
      return (<Movie_by_release_date jump={this.jump_to_detail_page}/>)
    }else if(this.state.control_state == 'by_popularity'){
      return (<Movie_by_popularity jump={this.jump_to_detail_page}/>)
    }
  }

  handleSubmit(e) {
    e.preventDefault();
    const form = document.forms.searchMovies;
    const searchStuff = form.search.value
    if(searchStuff.trim()) {
      this.setState({control_state: 'search'})
      this.setState({searchStuff: searchStuff})
      //console.log(this.state)
      form.search.value = "";
    }
  }

  render() {
    return (
        <div>
          <header>
            {this.state.logged_in_user_name != null && <button className="NameButton" type="button" onClick={() => {this.setState({control_state: 'watch_list'}); this.fetchMovie()} }>{this.state.logged_in_user_name}</button>}
            <button className="topButton" type="button" onClick={() =>{this.setState({control_state: 'main_page'})}}> Main Page </button>
            {this.state.logged_in_user_name == null && <button className="topButton" type="button" onClick={() =>{this.setState({control_state: 'log_in'})}}> Log in </button>}

            <div className="dropdown">
              <button className="dropbtn">Explore More
              </button>
              <div className="dropdown-content">
                <a onClick={() => {this.setState({control_state: 'by_release_date'})}}>Latestest Released</a>
                <a onClick={() => {this.setState({control_state: 'by_popularity'})}}>Popularity</a>
              </div>
            </div>

            {this.state.logged_in_user_name != null && <button className="topButton" type="button" onClick={this.set_log_out}> Log Out </button>}
            {this.state.logged_in_user_name == null && <button className="topButton" type="button" onClick={() =>{this.setState({control_state: 'create_account'})}}> Create account </button>}
            <form name="searchMovies" onSubmit={this.handleSubmit}>
              <input className="topSearch" type="text" name="search" placeholder="Search..." />
              <button className="topButton">Search</button>
            </form>
          </header>
          {this.control()}
        </div>
    )
  }
}


export default App;
