import React from "react";
import {graphQLFetch} from "./helper/graphqlFetch.js";
const emailValidator = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
const passwordValidator = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z]{8,}$/;

class CreateAccount extends React.Component{
    constructor() {
        super();
        this.handleSubmit = this.handleSubmit.bind(this);

    }

    validateEmailAddress(email) {
        let emailAddressError = "";
        if (email.trim === "") emailAddressError = "Email Address is required";
        else if (!emailValidator.test(email))
          emailAddressError = "Email is not valid";
        return emailAddressError ;
      }
    
      validatePassword(password) {
        let passwordError = "";
        if (password.trim === "") passwordError = "Password is required";
        else if (!passwordValidator.test(password))
          passwordError =
            "Password must contain at least 8 characters, 1 number, 1 upper and 1 lowercase!";
        return passwordError;
      }

    async handleSubmit(e){
        e.preventDefault();
        const form = document.forms.createAcc;
        const email = form.username.value;
        const password = form.password.value;
        //if (email.trim().length === 0 || password.trim().length === 0){
        //    alert("Email address and Password fields are compulsary.")
        //    return;
        //}
        const emailError = this.validateEmailAddress(email)
        if (emailError) {alert(emailError); return}
        const passwordError = this.validatePassword(password);
        if (passwordError) {alert(passwordError); return}
        
        const query = `mutation {
        createUser(userInput: {email: "${email}", password: "${password}"})  {
        _id
        email
        }
        }`;    
        
        const data = await graphQLFetch(query);
        if (data){
            alert("Account created. Please log in by filling in below.");
            this.props.jump()
        }
        //console.log(data)
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