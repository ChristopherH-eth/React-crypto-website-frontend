import React from "react"
import Cryptos from "./Cryptos"

/**
 * @file Main.js
 * @author 0xChristopher
 * @brief This file is responsible for the Main module of the cryptocurrency website.
 */

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
    let count = 0

    const cryptocurrencies = cryptoData.map((crypto) => {
        count = count + 1

        return <Cryptos 
            key={crypto.id}
            index={count}
            {...crypto}
        />
    })

    React.useEffect(() => {
        fetch(url)
            .then((res) => res.json())
            .then((data) => setCryptoData(data))
    }, [])

    return (
        <main>
            <h1>Top 100 Cryptocurrencies</h1>
            <section className="cryptocurrencies">
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
                {console.log(cryptocurrencies)}
            </section>
        </main>
    )
}

export default Main