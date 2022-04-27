import React from "react";
import {graphQLFetch} from "./helper/graphqlFetch.js";

class CreateAccount extends React.Component{
    constructor() {
        super();
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    async handleSubmit(e){
        e.preventDefault();
        const form = document.forms.createAcc;
        const email = form.username.value;
        const password = form.password.value;
        if (email.trim().length === 0 || password.trim().length === 0){
            alert("Email address and Password fields are compulsary.")
            return;
        }
        const query = `mutation {
        createUser(userInput: {email: "${email}", password: "${password}"})  {
        _id
        email
        }
        }`;    
        
        const data = await graphQLFetch(query);
        if (data){alert("Account created");}
        console.log(data)
        form.username.value = ""; form.password.value = "";
    }

    render() {
        return (
            <div className="login-root">
                <div className="formbg">
                    <span className="signInTitle">Create your account</span>
                    <form name="createAcc" id="stripe-login" onSubmit={this.handleSubmit}>
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
                    <span>Already have account? <button className="jump" onClick={this.props.jump} >Log in</button></span>
                </div>
            </div>
        );
    }

}

export default CreateAccount;