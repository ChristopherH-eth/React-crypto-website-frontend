import { Link } from "react-router-dom"
import { URLS } from "../utils/config"

/**
 * @file Header.js
 * @author 0xChristopher
 * @brief This file builds and returns the header component.
 */

/**
 * @brief The Header() function builds the page header.
 * @return Returns the header to be added to the page
 */
function Header(props)
{
    // Set variables to prop values
    const {
        cryptoCount,
        loggedIn,
        onLoggedInChange,
        onSetLoginForm,
        currentUser,
        onSetCurrentUser
    } = props

    const cookieUrl = `${URLS.api}/cookies/`

    /**
     * @brief The showLogin() function toggles the 'show' class on the login box
     */
    function showLogin()
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
    function showSignup()
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
    function onLogOut()
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

    return (
        <header>
            <section className="header--info-bar">
                <section className="header--info-bar--stats-container">
                    <div className="header--info-bar--stats">
                        Cryptos:&nbsp;
                        <a className="header--info-bar--stats--value" href="/">
                            {cryptoCount}
                        </a>
                    </div>
                    <div className="header--info-bar--stats">
                        Market Cap:&nbsp;
                    </div>
                    <div className="header--info-bar--stats">
                        24h Vol:&nbsp;
                    </div>
                    <div className="header--info-bar--stats">
                        Dominance:&nbsp;
                    </div>
                    <div className="header--info-bar--stats">
                        ETH Gas:&nbsp;
                    </div>
                </section>
                {loggedIn === false ? 
                    <section className="header--info-bar--button-container">
                        <button 
                            className="header--info-bar--button" 
                            id="login-button" 
                            onClick={showLogin}
                        >
                            Login
                        </button>
                        <button 
                            className="header--info-bar--button"
                            id="signup-button"
                            onClick={showSignup}
                        >
                            Sign Up
                        </button>
                    </section>
                :
                    <section className="header--info-bar--button-container">
                        <div className="header--info-bar--welcome-text">
                            Welcome, {currentUser}
                        </div>
                        <button
                            onClick={onLogOut}
                        >
                            Log Out
                        </button>
                    </section>
                }
            </section>
            <section className="header--navigation">
                <h1 className="header--navigation--text">
                    Cryptocurrency Website
                </h1>
                <nav className="header--navigation--container">
                    <div className="header--navigation--item">
                        <Link to={"/"} className="link">Cryptocurrencies</Link>
                    </div>
                    <div className="header--navigation--item">
                        Exchanges
                    </div>
                </nav>
                <input className="header--navigation--search" placeholder="Search" />
            </section>
        </header>
    )
}

export default Header