import React from "react"
import { Outlet, useLocation } from "react-router-dom"
import { URLS } from "./utils/config"
import Header from "./components/Header"
import Footer from "./components/Footer"
import Login from "./components/Login"

/**
 * @file App.js
 * @author 0xChristopher
 * @brief This file imports the main components of the page and returns them as the main 'App'
 *      component.
 */

// Closes menus and popups if the user clicks outside of it
window.onclick = function(event) 
{
    // Dropdown menus
    if (!event.target.matches(".dropbutton")) 
    {
        const dropdowns = document.getElementsByClassName("dropbutton--content")

        for (let i = 0; i < dropdowns.length; i++) 
        {
            let openDropdown = dropdowns[i]

            if (openDropdown.classList.contains("show"))
                openDropdown.classList.remove("show")
        }
    }

    // Login popup and page mask
    if (event.target.matches("#login-page-mask") || event.target.matches(".login-container")) 
    {
        const pageMask = document.getElementsByClassName("login-page-mask")
        const loginHeaders = document.getElementsByClassName("login-box--header-container--header")
        const loginBox = document.getElementsByClassName("login-container")

        for (let i = 0; i < pageMask.length; i++) 
        {
            let openPageMask = pageMask[i]

            if (openPageMask.classList.contains("show"))
                openPageMask.classList.remove("show")
        }

        for (let i = 0; i < loginHeaders.length; i++) 
        {
            let selectedHeaders = loginHeaders[i]

            if (selectedHeaders.classList.contains("header--selected"))
                selectedHeaders.classList.remove("header--selected")
        }

        for (let i = 0; i < loginBox.length; i++) 
        {
            let openLoginBox = loginBox[i]

            if (openLoginBox.classList.contains("show"))
                openLoginBox.classList.remove("show")
        }
    }
}

/**
 * @brief The App() function builds the webpage with necessary components.
 * @returns Returns the webpage to be rendered
 */
function App()
{
    const [cryptoData, setCryptoData] = React.useState([])          // Most recent crypto data fetched
    const [displayLimit, setDisplayLimit] = React.useState(100)     // Current page limit
    const [pageNumber, setPageNumber] = React.useState(1)           // Current page number
    const [cryptoCount, setCryptoCount] = React.useState(1)         // Total cryptocurrencies
    const [loggedIn, setLoggedIn] = React.useState(false)           // User is logged in
    const [loginForm, setLoginForm] = React.useState(true)          // Whether to use the login or signup form

    const pageUrl = `${URLS.api}/pages/?page=${pageNumber}&limit=${displayLimit}`
    const countUrl = `${URLS.api}/all/count/`

    const location = useLocation()                                  // Current URL path

    /**
     * @brief The getProps() function checks the current URL path name and returns relevant props.
     * @returns Returns props to pass to the child component
     */
    function getProps()
    {
        switch(location.pathname)
        {
            case "/":
                return ([
                    cryptoData, 
                    displayLimit, 
                    setDisplayLimit, 
                    pageNumber, 
                    setPageNumber, 
                    cryptoCount
                ])
            default:
                break
        }
    }

    // Render initial crypto values and when page is changed
    React.useEffect(() => {
        fetch(pageUrl, {
            method: "GET"
        })
            .then((res) => res.json())
            .then((res) => setCryptoData(res))
            .catch(console.error)
        
        fetch(countUrl, {
            method: "GET"
        })
            .then((res) => res.json())
            .then((res) => setCryptoCount(res))
            .catch(console.error)

        // Check for updates every 30 seconds
        const update = setInterval(() => {
            fetch(pageUrl, {
                method: "GET"
            })
                .then((res) => res.json())
                .then((res) => setCryptoData(res))
                .catch(console.error)
            
            fetch(countUrl, {
                method: "GET"
            })
                .then((res) => res.json())
                .then((res) => setCryptoCount(res))
                .catch(console.error)
        }, 30000)

        return () => clearInterval(update)
    }, [pageUrl, countUrl])

    console.log("Re-rendering")

    return (
        <div className="app-container">
            <Header 
                cryptoCount={cryptoCount}
                loggedIn={loggedIn}
                onLoggedInChange={(login) => setLoggedIn(login)}
                onSetLoginForm={(form) => setLoginForm(form)}
            />
            <Outlet context={getProps()} />
            <Footer />
            {/* Login Page Mask */}
            <div className="login-page-mask" id="login-page-mask" />
            <Login
                loginForm={loginForm}
                onLoggedInChange={(login) => setLoggedIn(login)}
                onSetLoginForm={(form) => setLoginForm(form)}
            />
        </div>
    )
}

export default App