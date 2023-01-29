import React from "react"
import { URLS } from "../utils/config"

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

    const loginUrl = `${URLS.api}/login/`

    /**
     * @brief The onLogin() function accepts credentials entered by the user and attempts to log them 
     *      into the website.
     */
    function onLogin()
    {
        const emailAddress = document.getElementById("login-box--email-address--input").value
        const password = document.getElementById("login-box--password--input").value

        // Check for required credentials
        if (!emailAddress || !password)
            return

        // Construct JSON object for POST request
        const loginBody = {
            email: emailAddress,
            password: password
        }
        
        // Send POST request to log in the user
        fetch(loginUrl, {
            method: "POST",
            mode: "cors",
            credentials: "include",
            headers: {"Content-type": "application/json; charset=UTF-8"},
            body: JSON.stringify(loginBody)
        })
            .then((res) => res.json().then((data) => ({status: res.status, body: data})))
            .then((res) => {
                console.log(res)

                // Check for server-side error
                if (res.status !== 200)
                {
                    setLoginError("Login failed: " + res.body.error)

                    return
                }
                // Otherwise proceed with successful login
                else
                {
                    // Clear revious login errors, get the user's name, and set the loggedIn state variable
                    // to true
                    setLoginError()
                    onSetCurrentUser(res.body.firstName)
                    onLoggedInChange(true)

                    // Get page mask and login box elements to be hidden
                    const pageMask = document.getElementsByClassName("login-page-mask")
                    const loginHeaders = document.getElementsByClassName("login-box--header-container--header")
                    const loginBox = document.getElementsByClassName("login-container")

                    // Hide page mask
                    for (let i = 0; i < pageMask.length; i++) 
                    {
                        let openPageMask = pageMask[i]

                        if (openPageMask.classList.contains("show"))
                            openPageMask.classList.remove("show")
                    }

                    // Reset login box header links
                    for (let i = 0; i < loginHeaders.length; i++) 
                    {
                        let selectedHeaders = loginHeaders[i]

                        if (selectedHeaders.classList.contains("header--selected"))
                            selectedHeaders.classList.remove("header--selected")
                    }

                    // Hide login box
                    for (let i = 0; i < loginBox.length; i++) 
                    {
                        let openLoginBox = loginBox[i]

                        if (openLoginBox.classList.contains("show"))
                            openLoginBox.classList.remove("show")
                    }
                }
            })
            .catch(console.error)
    }

    /**
     * @brief The switchToLogin() function switches the login form to the login variant.
     */
    function switchToLogin()
    {
        document.getElementById("login-box--header-container--login-header")
            .classList.add("header--selected")
        document.getElementById("login-box--header-container--signup-header")
            .classList.remove("header--selected")

        // Show the login form
        onSetLoginForm(true)
    }

    /**
     * @brief The switchToSignup() function switches the login form the signup variant.
     */
    function switchToSignup()
    {
        document.getElementById("login-box--header-container--signup-header")
            .classList.add("header--selected")
        document.getElementById("login-box--header-container--login-header")
            .classList.remove("header--selected")

        // Show the signup form
        onSetLoginForm(false)
    }

    /**
     * @brief The formLogIn() function prevents the submit button on the login form from re-rendering 
     *      the page.
     */
    function formLogin(e)
    {
        e.preventDefault()
    }

    return (
        <div className="login-container" id="login-container">
            <section className="login-box">
                <div className="login-box--header-container">
                    <h1 
                        className="login-box--header-container--header"
                        id="login-box--header-container--login-header"
                        onClick={switchToLogin}
                    >Log In</h1>
                    <h1 
                        className="login-box--header-container--header"
                        id="login-box--header-container--signup-header"
                        onClick={switchToSignup}
                    >Sign Up</h1>
                </div>
                {/* Login/Signup form */}
                {/* Show login form if loginForm is true, otherwise show signup form */}
                {loginForm === true ?
                    <form className="login-box--login-form" onSubmit={(e) => formLogin(e)}>
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
                            onClick={onLogin}
                        >Log In</button>
                    </form>
                :
                    <form className="login-box--signup-form">
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
                            type="submit" 
                            className="login-box--login-button" 
                        >Sign Up</button>
                    </form>
                }
                {/* Login Error Display */}
                {loginError && <div>{loginError}</div>}
            </section>
        </div>
    )
}

export default Login