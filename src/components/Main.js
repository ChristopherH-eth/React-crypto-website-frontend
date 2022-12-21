import React from "react"
import Cryptos from "./Cryptos"
import Pagination from "./Pagination"

/**
 * @file Main.js
 * @author 0xChristopher
 * @brief This file is responsible for the Main module of the cryptocurrency website.
 */

/**
 * @brief The showDropdown() function toggles the 'show' class on a particular dropdown button
 */
function showDropdown()
{
    document.getElementById("rowbtn--content").classList.toggle("show")
}

// Closes dropdown menus if the user clicks outside of it
window.onclick = function(event) 
{
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
}

/**
 * @brief The Main() function builds the module, which consists of the module itself, as well as separate
 *      Crypto submodules. When there are changes to the Crypto submodules (such as changes in supply, price,
 *      etc.) the page will re-render to reflect those changes.
 * @return Returns the constructed Main module
 */
function Main()
{
    const [cryptoData, setCryptoData] = React.useState([])          // Most recent crypto data fetched
    const [displayLimit, setDisplayLimit] = React.useState(100)     // Current page limit
    const [pageNumber, setPageNumber] = React.useState(1)           // Current page number
    const [cryptoCount, setCryptoCount] = React.useState(1)         // Total cryptocurrencies

    const page20 = 20                                               // Page limit of 20 items
    const page50 = 50                                               // Page limit of 50 items
    const page100 = 100                                             // Page limit of 100 items

    const pageUrl = `http://localhost:8000/api/v1/crypto/pages/${pageNumber}/${displayLimit}`
    const countUrl= "http://localhost:8000/api/v1/crypto/all"

    // Map fetched cryptocurrency data
    const cryptocurrencies = cryptoData.map((crypto) => {
        return <Cryptos 
            key={crypto.id}
            index={crypto.cmc_rank}
            {...crypto}
        />
    })

    // Create Pagination based on our cryptocurrency data
    const pages = <Pagination 
        totalCount={cryptoCount}
        pageSize={displayLimit}
        pageNumber={pageNumber}
        onPageChange={page => setPageNumber(page)}
    />

    /**
     * @brief The changeDisplayLimit20() function sets the number of cryptocurrencies to be displayed
     *      on each page to 20, and resets the page number to 1 to avoid a blank page populating.
     */
    function changeDisplayLimit20()
    {
        setDisplayLimit(page20)
        setPageNumber(1)
    }

    /**
     * @brief The changeDisplayLimit50() function sets the number of cryptocurrencies to be displayed
     *      on each page to 50, and resets the page number to 1 to avoid a blank page populating.
     */
    function changeDisplayLimit50()
    {
        setDisplayLimit(page50)
        setPageNumber(1)
    }

    /**
     * @brief The changeDisplayLimit100() function sets the number of cryptocurrencies to be displayed
     *      on each page to 100, and resets the page number to 1 to avoid a blank page populating.
     */
    function changeDisplayLimit100()
    {
        setDisplayLimit(page100)
        setPageNumber(1)
    }

    // Render initial crypto values and when page is changed
    React.useEffect(() => {  
        fetch(pageUrl)
            .then((res) => res.json())
            .then((data) => setCryptoData(data))

        fetch(countUrl)
            .then((res) => res.json())
            .then((data) => setCryptoCount(data))
    }, [pageUrl])

    // Check for updates every 30 seconds
    React.useEffect(() => {
        const update = setInterval(() => {
            fetch(pageUrl)
                .then((res) => res.json())
                .then((data) => setCryptoData(data))
            
            fetch(countUrl)
                .then((res) => res.json())
                .then((data) => setCryptoCount(data))
        }, 30000)

        return () => clearInterval(update)
    }, [pageUrl])

    return (
        <main>
            <section className="cryptocurrencies">
                {/* Filter & Display Selectors */}
                <section className="cryptocurrencies--options">
                    <h1>Top Cryptocurrencies</h1>
                    <div className="cryptocurrencies--options--content">
                        <div className="dropbutton--container">
                            <button className="dropbutton" 
                                id="rowbtn" 
                                onClick={showDropdown}>100 Rows</button>
                            <div className="dropbutton--content" id="rowbtn--content">
                                <div 
                                    className="dropbutton--content--row" 
                                    onClick={changeDisplayLimit20}
                                >20</div>
                                <div 
                                    className="dropbutton--content--row"
                                    onClick={changeDisplayLimit50}
                                >50</div>
                                <div 
                                    className="dropbutton--content--row"
                                    onClick={changeDisplayLimit100}
                                >100</div>
                            </div>
                        </div>
                    </div>
                </section>
                {/* Cryptocurrency Column Headers */}
                <section className="cryptocurrencies--column-headers">
                    <div className="cryptocurrencies--column-headers--rank">#</div>
                    <div className="cryptocurrencies--column-headers--name">Name</div>
                    <div className="cryptocurrencies--column-headers--price">Price</div>
                    <div className="cryptocurrencies--column-headers--change">1h %</div>
                    <div className="cryptocurrencies--column-headers--change">24h %</div>
                    <div className="cryptocurrencies--column-headers--change">7d %</div>
                    <div className="cryptocurrencies--column-headers--market-cap">Market Cap</div>
                    <div className="cryptocurrencies--column-headers--volume">Volume (24h)</div>
                    <div className="cryptocurrencies--column-headers--circ-supply">Circulating Supply</div>
                </section>
                {/* Cryptocurrency Object Array */}
                {cryptocurrencies}
                {/* Paginator */}
                <section className="cryptocurrencies--page-selector">
                    {pages}
                </section>
            </section>
        </main>
    )
}

export default Main