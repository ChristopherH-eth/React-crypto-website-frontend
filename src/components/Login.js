import React from "react"
import { 
    onLogin, 
    onSignup,
    switchToLogin, 
    switchToSignup, 
    formLoginOrSignup 
} from "../utils/loginUtil"

/**
 * @file Login.js
 * @author 0xChristopher
 * @brief This file builds and returns the login component.
 */

/**
 * @brief The Login() function builds the login box.
 * @return Returns the login box to be added to the page
 */
function Login(props)
{
    const {
        loginForm,
        onLoggedInChange,
        onSetLoginForm,
        onSetCurrentUser
    } = props

    const [loginError, setLoginError] = React.useState()                // Current login error

    // Component functions stored in loginUtil
    const login = () => onLogin(onLoggedInChange, onSetCurrentUser, setLoginError)
    const signup = () => onSignup(setLoginError)
    const toLogin = () => switchToLogin(onSetLoginForm)
    const toSignup = () => switchToSignup(onSetLoginForm)

    return (
        <div className="login-container" id="login-container">
            <section className="login-box">
                <div className="login-box--header-container">
                    <h1 
                        className="login-box--header-container--header"
                        id="login-box--header-container--login-header"
                        onClick={toLogin}
                    >Log In</h1>
                    <h1 
                        className="login-box--header-container--header"
                        id="login-box--header-container--signup-header"
                        onClick={toSignup}
                    >Sign Up</h1>
                </div>
                {/* Login/Signup form */}
                {/* Show login form if loginForm is true, otherwise show signup form */}
                {loginForm === true ?
                    <form className="login-box--login-form" onSubmit={(e) => formLoginOrSignup(e)}>
                        <div className="login-box--input-container">
                            <div className="login-box--email-address">Email Address</div>
                            <input 
                                type="text"
                                className="login-box--email-address--input" 
                                id="login-box--email-address--input"
                                placeholder="Enter your email address..."
                                required
                            ></input>
                            <div className="login-box--password">Password</div>
                            <input 
                                type="password"
                                className="login-box--password--input" 
                                id="login-box--password--input"
                                placeholder="Enter your password..."
                                required
                            ></input>
                        </div>
                        <button 
                            className="login-box--login-button" 
                            onClick={login}
                        >Log In</button>
                    </form>
                :
                    <form className="login-box--signup-form" onSubmit={(e) => formLoginOrSignup(e)}>
                        <div className="login-box--input-container">
                            <div className="login-box--first-name">First Name</div>
                            <input
                                type="text"
                                className="login-box--first-name--input"
                                id="login-box--first-name--input"
                                placeholder="First Name"
                                required
                            ></input>
                            <div className="login-box--last-name">Last Name</div>
                            <input
                                type="text"
                                className="login-box--last-name--input"
                                id="login-box--last-name--input"
                                placeholder="Last Name"
                                required
                            ></input>
                            <div className="login-box--email-address">Email Address</div>
                            <input 
                                type="text"
                                className="login-box--email-address--input" 
                                id="login-box--email-address--input"
                                placeholder="Email Address"
                                required
                            ></input>
                            <div className="login-box--password">Password</div>
                            <input 
                                type="password"
                                className="login-box--password--input" 
                                id="login-box--password--input"
                                placeholder="Password"
                                required
                            ></input>
                        </div>
                        <button 
                            className="login-box--login-button" 
                            onClick={signup}
                        >Sign Up</button>
                    </form>
                }
                {/* Login Error Display */}
                {loginError && <div className="login-box--login-error">{loginError}</div>}
            </section>
        </div>
    )
}

export default Login