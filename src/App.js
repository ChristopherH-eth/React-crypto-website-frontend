import React from "react"
import Header from "./components/Header"
import Main from "./components/Main"
import Footer from "./components/Footer"

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

    const pageUrl = `http://localhost:8000/api/v1/pages/?page=${pageNumber}&limit=${displayLimit}`
    const countUrl= "http://localhost:8000/api/v1/all"

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
        <div>
            <Header 
                cryptoCount={cryptoCount}
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
        </div>
    )
}

export default App