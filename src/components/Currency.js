import React from "react"
import { useParams } from "react-router-dom"
import { URLS } from "../utils/config"

/**
 * @file Currency.js
 * @author 0xChristopher
 * @brief This file is responsible for the Currency module of the cryptocurrency website.
 */

function Currency()
{
    const {
        currency
    } = useParams()

    const [currencyData, setCurrencyData] = React.useState([])              // Current cryptocurrency

    const currencyUrl = `${URLS.api}/metadata/?cryptos=${currency}`

    // Get cryptocurrency metadata from server
    React.useEffect(() => {
        fetch(currencyUrl)
            .then((res) => res.json())
            .then((res) => setCurrencyData(res[0]))
            .catch(console.error)
    }, [currencyUrl])

    return (
        <main>
            <img src={currencyData.logo} alt="currency logo" className="cryptos--name--logo" />
            <h1>{currencyData.name}&nbsp;{currencyData.symbol}</h1>
            {currencyData ? (
                <div>
                    <div>
                        {currencyData.id}
                    </div>
                    <div>{currencyData.description}</div>
                    <div>{console.log(currencyData) /* For Testing */}</div>
                </div>
            ) : (
                <div>Loading...</div>
            )}
        </main>
    )
}

export default Currency