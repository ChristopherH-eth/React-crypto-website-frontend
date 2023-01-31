import { URLS, ENDPOINTS } from "./config"

/**
 * @file headerUtil.js
 * @author 0xChristopher
 * @brief This file contains functions used in the Header component.
 */

const cookieUrl = `${URLS.api}${ENDPOINTS.cookies}`                     // API Cookies Endpoint

/**
 * @brief The showLogin() function toggles the 'show' class on the login box
 */
function showLogin(onSetLoginForm)
{
    document.getElementById("login-container").classList.add("show")
    document.getElementById("login-page-mask").classList.add("show")
    document.getElementById("login-box--header-container--login-header")
        .classList.toggle("header--selected")

    // Set loginForm state variable to true
    onSetLoginForm(true)
}

/**
 * @brief The showSignup() function toggles the 'show' class on the login box
 */
function showSignup(onSetLoginForm)
{
    document.getElementById("login-container").classList.add("show")
    document.getElementById("login-page-mask").classList.add("show")
    document.getElementById("login-box--header-container--signup-header")
        .classList.toggle("header--selected")

    // Set loginForm state variable to false
    onSetLoginForm(false)
}

/**
 * @brief The onLogOut() function attempts to log out the current user.
 */
function onLogOut(onLoggedInChange, onSetCurrentUser)
{
    fetch(cookieUrl, {
        method: "GET",
        credentials: "include"
    })
        .then((res) => res.json())
        .then((res) => console.log(res))
        .catch(console.error)

    // Clear currentUser state variable and set loggedIn state variable to false
    onSetCurrentUser()
    onLoggedInChange(false)
}

export {
    showLogin,
    showSignup,
    onLogOut
}