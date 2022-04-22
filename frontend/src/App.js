import React, {useEffect, useState} from "react";
import Movie from "./Movie";
import Login from "./login";
import MovieFeed from "./MovieFeed";
import MovieSearch from "./MovieSearch";
import CreateAccount from "./CreateAccount";

class App extends React.Component{
  constructor() {
    super();
    this.state = {
      control_state: 'main_page',
      searchStuff: "",
    }
    this.handleSubmit = this.handleSubmit.bind(this);
    this.jump_to_log_in = this.jump_to_log_in.bind(this);
    this.jump_to_create_account = this.jump_to_create_account.bind(this)
  }

  jump_to_log_in(){
    console.log(this.state.control_state)
    this.setState({control_state:'log_in'})
  }

  jump_to_create_account(){
    this.setState({control_state:'create_account'})
  }



  control() {
    if (this.state.control_state == 'main_page') {
      return (<MovieFeed/>)
    } else if (this.state.control_state == 'log_in') {
      return (<Login jump={this.jump_to_create_account}/>)
    } else if (this.state.control_state == 'search') {
      return (<MovieSearch {...{searchStuff: this.state.searchStuff}}/>)
    } else if(this.state.control_state == 'create_account'){
      return (<CreateAccount jump={this.jump_to_log_in}/>)
    }
  }

  handleSubmit(e) {
    e.preventDefault();
    const form = document.forms.searchMovies;
    const searchStuff = form.search.value
      if(searchStuff.trim()) {
          this.setState({control_state: 'search'})
          this.setState({searchStuff: searchStuff})
          console.log(this.state)
          form.search.value = "";
      }
  }

  render() {
    return (
            <div>
              <header>
                <button className="topButton" type="button" onClick={() =>{this.setState({control_state: 'main_page'})}}> Main Page </button>
                <button className="topButton" type="button" onClick={() =>{this.setState({control_state: 'log_in'})}}> Log in </button>
                <button className="topButton" type="button" onClick={() =>{this.setState({control_state: 'create_account'})}}> Create account </button>
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
