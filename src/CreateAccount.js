import React from "react";

class CreateAccount extends React.Component{
    constructor() {
        super();
    }

    render() {
        return (
            <div className="login-root">
                <div className="formbg">
                    <span className="signInTitle">Create your account</span>
                    <form id="stripe-login">
                        <div className="field">
                            <label htmlFor="email">Name</label>
                            <input type="text" name="username" placeholder="Your User Name"/>
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