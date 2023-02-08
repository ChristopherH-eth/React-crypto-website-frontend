import React from "react"
import { Outlet, useLocation } from "react-router-dom"
import { selectWindow } from "./utils/appUtil"
import { URLS, ENDPOINTS } from "./utils/config"
import Header from "./components/Header"
import Footer from "./components/Footer"
import Login from "./components/Login"

/**
 * @file App.js
 * @author 0xChristopher
 * @brief This file imports the main components of the page and returns them as the main 'App'
 *      component.
 */

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
    const [currentUser, setCurrentUser] = React.useState()          // Current logged in user

    const pageUrl = `${URLS.api}${ENDPOINTS.cryptosByPage}?page=${pageNumber}&limit=${displayLimit}`
    const countUrl = `${URLS.api}${ENDPOINTS.cryptoCount}`

    window.onclick = selectWindow                                   // Window event handler

    /**
     * @brief The useUrl() hook checks the current URL path name and returns relevant props.
     * @returns Returns props to pass to the child component
     */
    const useUrl = () => {
        // Current URL path
        const location = useLocation()

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
            .then(() => {
                fetch(countUrl, {
                    method: "GET"
                })
                    .then((res) => res.json())
                    .then((res) => setCryptoCount(res))
                    .catch(console.error)
        })

        // Check for updates every 30 seconds
        const update = setInterval(() => {
            fetch(pageUrl, {
                method: "GET"
            })
                .then((res) => res.json())
                .then((res) => setCryptoData(res))
                .then(() => {
                    fetch(countUrl, {
                        method: "GET"
                    })
                        .then((res) => res.json())
                        .then((res) => setCryptoCount(res))
                        .catch(console.error)
                    })
        }, 30000)

        return () => clearInterval(update)
    }, [pageUrl, countUrl])

    // For testing
    console.log("Re-rendering")

    return (
        <div className="app-container">
            <Header 
                cryptoCount={cryptoCount}
                loggedIn={loggedIn}
                onLoggedInChange={(login) => setLoggedIn(login)}
                onSetLoginForm={(form) => setLoginForm(form)}
                currentUser={currentUser}
                onSetCurrentUser={(user) => setCurrentUser(user)}
            />
            {/* Gets props for main page component by URL */}
            <Outlet context={useUrl()} />
            <Footer />
            {/* Login Page Mask (dimmed background) */}
            <div className="login-page-mask" id="login-page-mask" />
            <Login
                loginForm={loginForm}
                onLoggedInChange={(login) => setLoggedIn(login)}
                onSetLoginForm={(form) => setLoginForm(form)}
                onSetCurrentUser={(user) => setCurrentUser(user)}
            />
        </div>
    )
}

export default App