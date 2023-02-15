import { URLS, ENDPOINTS } from "./config"

/**
 * @file loginUtil.js
 * @author 0xChristopher
 * @brief This file contains functions used in the Login component.
 */

const loginUrl = `${URLS.api}${ENDPOINTS.loginUser}`                    // API Login Endpoint
const registerUrl = `${URLS.api}${ENDPOINTS.registerUser}`              // API Register Endpoint

/**
 * @brief The onLogin() function accepts credentials entered by the user and attempts to log them 
 *      into the website.
 */
function onLogin(onLoggedInChange, onSetCurrentUser, setLoginError)
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
                // Clear previous login errors, get the user's name, and set the loggedIn state variable
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

                // Make page scrollable
                document.body.classList.remove("lock-scroll")
            }
        })
        .then(() => {
            // Clear input fields if they still contain text
            document.getElementById("login-box--email-address--input").value = ""
            document.getElementById("login-box--password--input").value = ""
        })
        .catch(console.error)
}

/**
 * @brief The onSignup() function accepts credentials entered by the user and attempts to sign them 
 *      up for the website.
 */
function onSignup(setLoginError)
{
    const firstName = document.getElementById("login-box--first-name--input").value
    const lastName = document.getElementById("login-box--last-name--input").value
    const emailAddress = document.getElementById("login-box--email-address--input").value
    const password = document.getElementById("login-box--password--input").value

    // Check for required credentials
    if (!firstName || !lastName || !emailAddress || !password)
        return

    // Construct JSON object for POST request
    const loginBody = {
        firstName: firstName,
        lastName: lastName,
        email: emailAddress,
        password: password
    }

    // Send POST request to sign up the user
    fetch(registerUrl, {
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
                setLoginError("Sign Up failed: " + res.body.error)

                return
            }
            // Otherwise proceed with successful login
            else
            {
                // Clear previous login errors, get the user's name, and set the loggedIn state variable
                // to true
                // setLoginError()
                // onSetCurrentUser(res.body.firstName)
                // onLoggedInChange(true)

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

                // Make page scrollable
                document.body.classList.remove("lock-scroll")
            }
        })
        .then(() => {
            // Clear input fields if they still contain text
            document.getElementById("login-box--first-name--input").value = ""
            document.getElementById("login-box--last-name--input").value = ""
            document.getElementById("login-box--email-address--input").value = ""
            document.getElementById("login-box--password--input").value = ""
        })
        .catch(console.error)
    
}

/**
 * @brief The switchToLogin() function switches the login form to the login variant.
 */
function switchToLogin(onSetLoginForm)
{
    document.body.classList.add("lock-scroll")
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
function switchToSignup(onSetLoginForm)
{
    document.body.classList.add("lock-scroll")
    document.getElementById("login-box--header-container--signup-header")
        .classList.add("header--selected")
    document.getElementById("login-box--header-container--login-header")
        .classList.remove("header--selected")

    // Show the signup form
    onSetLoginForm(false)
}

/**
 * @brief The formLoginOrSignup() function prevents the submit button on the login form from re-rendering 
 *      the page.
 */
function formLoginOrSignup(e)
{
    e.preventDefault()
}

export { 
    onLogin, 
    onSignup,
    switchToLogin, 
    switchToSignup, 
    formLoginOrSignup 
}