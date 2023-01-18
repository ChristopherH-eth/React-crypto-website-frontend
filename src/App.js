import React from "react"
import Header from "./components/Header"
import Main from "./components/Main"
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
        var dropdowns = document.getElementsByClassName("dropbutton--content")

        for (var i = 0; i < dropdowns.length; i++) 
        {
            var openDropdown = dropdowns[i]

            if (openDropdown.classList.contains("show"))
                openDropdown.classList.remove("show")
        }
    }

    // Page masks
    if (event.target.matches("#login-page-mask") || event.target.matches(".login-container")) 
    {
        var loginBox = document.getElementsByClassName("login-container")

        for (var j = 0; j < loginBox.length; j++) 
        {
            var openLoginBox = loginBox[j]

            if (openLoginBox.classList.contains("show"))
                openLoginBox.classList.remove("show")
        }
    }

    // Login popup
    if (event.target.matches("#login-page-mask") || event.target.matches(".login-container")) 
    {
        var pageMask = document.getElementsByClassName("login-page-mask")

        for (var k = 0; k < loginBox.length; k++) 
        {
            var openPageMask = pageMask[k]

            if (openPageMask.classList.contains("show"))
                openPageMask.classList.remove("show")
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

    const pageUrl = `http://localhost:8000/api/v1/pages/?page=${pageNumber}&limit=${displayLimit}`
    const countUrl= "http://localhost:8000/api/v1/all/count/"

    // Render initial crypto values and when page is changed
    React.useEffect(() => {
        fetch(pageUrl)
            .then((res) => res.json())
            .then((res) => setCryptoData(res))
            .catch(console.error)
        
        fetch(countUrl)
            .then((res) => res.json())
            .then((res) => setCryptoCount(res))
            .catch(console.error)

        // Check for updates every 30 seconds
        const update = setInterval(() => {
            fetch(pageUrl)
                .then((res) => res.json())
                .then((res) => setCryptoData(res))
                .catch(console.error)
            
            fetch(countUrl)
                .then((res) => res.json())
                .then((res) => setCryptoCount(res))
                .catch(console.error)
        }, 30000)

        return () => clearInterval(update)
    }, [pageUrl])

    console.log("Re-rendering")

    return (
        <div className="app-container">
            <Header 
                cryptoCount={cryptoCount}
                loggedIn={loggedIn}
                onLoggedInChange={(login) => setLoggedIn(login)}
            />
            <Main 
                cryptoData={cryptoData}
                displayLimit={displayLimit}
                pageNumber={pageNumber}
                cryptoCount={cryptoCount}
                onDisplayLimitChange={(limit) => setDisplayLimit(limit)}
                onPageChange={(page) => setPageNumber(page)}
            />
            <Footer />
            {/* Login Page Mask */}
            <div className="login-page-mask" id="login-page-mask" />
            <Login
                onLoggedInChange={(login) => setLoggedIn(login)}
            />
        </div>
    )
}

export default App