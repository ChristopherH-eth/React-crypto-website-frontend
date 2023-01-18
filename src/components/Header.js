/**
 * @file Header.js
 * @author 0xChristopher
 * @brief This file builds and returns the header component.
 */

/**
 * @brief The showLogin() function toggles the 'show' class on the login box
 */
function showLogin()
{
    document.getElementById("login-container").classList.toggle("show")
    document.getElementById("login-page-mask").classList.toggle("show")
}

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
        onLoggedInChange
    } = props

    /**
     * @brief The onLogOut() function attempts to log out the current user.
     */
    function onLogOut()
    {
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
                <section className="header--info-bar--button-container">
                    {loggedIn === false ? 
                        <div>
                            <button 
                                className="header--info-bar--button" 
                                id="login-button" 
                                onClick={showLogin}
                            >
                                Login
                            </button>
                            <button className="header--info-bar--button">
                                Sign Up
                            </button>
                        </div>
                    :
                        <button
                            onClick={onLogOut}
                        >
                            Log Out
                        </button>}
                </section>
            </section>
            <section className="header--navigation">
                <h1 className="header--navigation--text">
                    Cryptocurrency Website
                </h1>
                <nav className="header--navigation--container">
                    <div className="header--navigation--item">
                        Cryptocurrencies
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