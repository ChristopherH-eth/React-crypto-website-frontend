import { Link } from "react-router-dom"
import { showLogin, showSignup, onLogOut } from "../utils/headerUtil"

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

    // Component functions stored in headerUtil
    const login = () => showLogin(onSetLoginForm)
    const signup = () => showSignup(onSetLoginForm)
    const logout = () => onLogOut(onLoggedInChange, onSetCurrentUser)

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
                            onClick={login}
                        >
                            Login
                        </button>
                        <button 
                            className="header--info-bar--button"
                            id="signup-button"
                            onClick={signup}
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
                            onClick={logout}
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