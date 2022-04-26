import React from "react";

async function graphQLFetch(query, variables = {}) {
    try {
      const response = await fetch('http://localhost:8081/graphql', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json'},
        body: JSON.stringify({ query, variables })
      });
      const body = await response.text();
      const result = JSON.parse(body);
      console.log(`body is ${body}`)

      if (result.errors) {
        const error  = result.errors[0]
        alert(`${error.message}`);}

      return result.data.createUser ? result.data : 'existing account';
    } catch (e) {
      if (!e.message){alert("You have an existing account, please log in.")}
      else alert(`Error in sending data to server: ${e.message}`);
    }
  }

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
        console.log(data)
        form.username.value = ""; form.password.value = "";
        if (data!="existing account"){alert("Account created");}
        this.props.set_user(email.trim())
        this.props.change_to_main()
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
