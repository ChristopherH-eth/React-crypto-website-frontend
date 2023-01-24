import React from "react"
import { useParams } from "react-router-dom"
import { URLS } from "../utils/config"

/**
 * @file Currency.js
 * @author 0xChristopher
 * @brief This file is responsible for the Currency module of the cryptocurrency website.
 */

/**
 * @brief The Currency() function builds the currency module.
 * @return Returns the currency module to be added to the page
 */
function Currency()
{
    const {
        currency                                                            // Currency id from URL
    } = useParams()

    const [currencyMetadata, setCurrencyMetadata] = React.useState([])      // Current currency metadata
    const [currencyData, setCurrencyData] = React.useState()                // Current currency data

    const currencyMetadataUrl = `${URLS.api}/metadata/?cryptos=${currency}`
    const currencyDataUrl = `${URLS.api}/cryptocurrencies/?cryptoId=${currency}`

    // Get currency data from server
    React.useEffect(() => {
        fetch(currencyMetadataUrl)
            .then((res) => res.json())
            .then((res) => setCurrencyMetadata(res[0]))
            .catch(console.error)

        fetch(currencyDataUrl)
            .then((res) => res.json())
            .then((res) => setCurrencyData(res))
            .catch(console.error)
    }, [currencyMetadataUrl, currencyDataUrl])

    // Used for testing
    console.log(currencyMetadata)
    console.log(currencyData)

    return (
        <main className="currency">
            {currencyMetadata && currencyData ? (
                <div className="currency--container">
                    <div className="currency--data">
                        {/* Currency Basic Data */}
                        <div className="currency--data--basic">
                            <div className="currency--data--basic--line">
                                <img src={currencyMetadata.logo} 
                                    alt="currency logo" 
                                    className="currency--logo" 
                                />
                                <h1>{currencyMetadata.name}&nbsp;{currencyMetadata.symbol}</h1>
                            </div>
                            <div className="currency--data--basic--line">
                                <div className="currency--data--basic--rank">
                                    Rank {currencyData.cmc_rank}
                                </div>
                                <div className="currency--data--basic--categoty">
                                    {currencyMetadata.category}
                                </div>
                            </div>
                            <div className="currency--data--basic--line">**Links Go Here**</div>
                            <div>Tags:</div>
                            <div className="currency--data--basic--line">**Tag Links Go Here**</div>
                        </div>
                        {/* Currency Price Data */}
                        <div className="currency--data--price">
                            <div>{currencyData.name} Price ({currencyData.symbol})</div>
                            <div>{currencyData.quote.USD.price}</div>
                        </div>
                    </div>
                    <div>{currencyMetadata.id}</div>
                    <div>{currencyMetadata.description}</div>
                </div>
            ) : (
                <div className="currency--container">Loading...</div>
            )}
        </main>
    )
}

export default Currency