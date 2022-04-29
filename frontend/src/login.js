import React from "react";
import {graphQLFetch} from "./helper/graphqlFetch.js";

class Login extends React.Component{
    constructor() {
        super();
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    async handleSubmit(e){
        e.preventDefault();
        const form = document.forms.login;
        const email = form.username.value;
        const password = form.password.value;
        if (email.trim().length === 0 || password.trim().length === 0){
            alert("Email address and Password fields are compulsary.")
            return;
        }
        const query = `query {
        login(email: "${email}", password: "${password}")  {
        userId
        token
        tokenExpiration
        }
        }`;

        const data = await graphQLFetch(query);
        if (data){
            console.log(data.login.tokenExpiration)
            this.props.set_user(email.trim())
            this.props.set_token(data.login.token)
            this.props.handle_expiration(data.login.tokenExpiration *3600000)
            this.props.change_to_main()
        }
        else {alert("Please try to log in again")}
        form.username.value = ""; form.password.value = "";

    }

    render() {
        return (
            <div className="login-root">
                <div className="formbg">
                    <span className="signInTitle">Sign in to your account</span>
                    <form name= "login" id="stripe-login" onSubmit={this.handleSubmit}>
                        <div className="field">
                            <label htmlFor="email">Name</label>
                            <input type="text" name="username" placeholder="Your Email Address"/>
                        </div>
                        <div className="field">
                            <label htmlFor="password">Password</label>
                            <input type="text" name="password" placeholder="Your Password"/>
                        </div>
                        <div className="field">
                            <input type="submit" name="submit" value="Continue"/>
                        </div>
                    </form>
                </div>

                <div className="footer-link">
                    <span>Don't have an account? <button className="jump" onClick={this.props.jump} >Create Account</button></span>
                </div>

            </div>
        );
    }

}

export default Login;
