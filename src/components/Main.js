import React from "react"
import Cryptos from "./Cryptos"

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
    const [cryptoData, setCryptoData] = React.useState([])

    const url = "http://localhost:8000/api/v1/crypto/all"

    const cryptocurrencies = cryptoData.map((crypto) => {
        return <Cryptos 
            key={crypto.id}
            index={crypto.cmc_rank}
            {...crypto}
        />
    })

    // Render initial values
    React.useEffect(() => {
        fetch(url)
            .then((res) => res.json())
            .then((data) => setCryptoData(data))

        console.log("Effect ran")
    }, [])

    // Check for updates every 30 seconds
    React.useEffect(() => {
        const update = setInterval(() => {
            fetch(url)
                .then((res) => res.json())
                .then((data) => setCryptoData(data))

            console.log("Effect ran")
        }, 30000)

        return () => clearInterval(update)
    }, [cryptoData.props])

    return (
        <main>
            <section className="cryptocurrencies">
                <section className="cryptocurrencies--options">
                    <h1>Top 100 Cryptocurrencies</h1>
                    <div className="cryptocurrencies--options--content">
                        <div className="dropbutton--container">
                            <button className="dropbutton" 
                                id="rowbtn" 
                                onClick={showDropdown}>100 Rows</button>
                            <div className="dropbutton--content" id="rowbtn--content">
                                <p>20</p>
                                <p>50</p>
                                <p>100</p>
                            </div>
                        </div>
                    </div>
                </section>
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
                {cryptocurrencies}
            </section>
        </main>
    )
}

export default Main