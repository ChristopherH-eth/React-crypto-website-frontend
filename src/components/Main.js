import React from "react"
import { LOCAL_URL } from "../../config"
import Cryptos from "./Cryptos"

/**
 * @file Main.js
 * @author 0xChristopher
 * @brief 
 */

function Main()
{
    const [cryptoData, setCryptoData] = React.useState([])

    const url = LOCAL_URL
    let count = 0

    const cryptocurrencies = cryptoData.map((crypto) => {
        count = count + 1

        return <Cryptos 
            key={crypto.cryptoId}
            index={i}
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
                    <div className="cryptocurrencies--column-headers--circ-supply">Circulating Supply</div>
                </section>
                {cryptocurrencies}
                {console.log(cryptocurrencies)}
            </section>
        </main>
    )
}

export default Main