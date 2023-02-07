import React from "react"
import { useParams } from "react-router-dom"
import { URLS } from "../utils/config"
import { addCommas, fixDecimals } from "../utils/utils"
import { getLinks, getTags } from "../utils/currencyUtil"

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
            .then(() => {
                fetch(currencyDataUrl)
                    .then((res) => res.json())
                    .then((res) => setCurrencyData(res))
                    .catch(console.error)
            })
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
                            <div className="currency--data--basic--title">
                                <img src={currencyMetadata.logo} 
                                    alt="currency logo" 
                                    className="currency--logo" 
                                />
                                <div>{currencyMetadata.name}&nbsp;</div>
                                <div className="currency--data--basic--symbol">
                                    {currencyMetadata.symbol}
                                </div>
                            </div>
                            <div className="currency--data--basic--left-line">
                                <div className="currency--data--basic--rank">
                                    Rank #{currencyData.cmc_rank}
                                </div>
                                <div className="currency--data--basic--category">
                                    {currencyMetadata.category}
                                </div>
                            </div>
                            {getLinks(currencyMetadata)}
                            <div className="currency--data--basic--left-line">Tags:</div>
                            <div className="currency--data--basic--left-line">
                                {getTags(currencyMetadata)}
                                {currencyData.tags.length > 4 ? <div>View All</div> : <div></div>}
                            </div>
                        </div>
                        {/* Currency Price Data */}
                        <div className="currency--data--price">
                            <div className="currency--data--basic--right-line">
                                {currencyData.name} Price ({currencyData.symbol})
                            </div>
                            <div className="currency--data--basic--right-line">
                                <div className="currency--data--price--value">
                                    ${addCommas(fixDecimals(currencyData.quote.USD.price))}
                                </div>
                                <div className={currencyData.quote.USD.percent_change_24h 
                                    >= 0 ? "currency--data--price--change greenbg" 
                                    : "currency--data--price--change redbg"}>
                                    {currencyData.quote.USD.percent_change_24h.toFixed(2)}%
                                </div>
                            </div>
                        </div>
                    </div>
                    <div>{currencyMetadata.symbol} Data</div>
                    <div>{currencyMetadata.description}</div>
                </div>
            ) : (
                <div className="currency--container">Loading...</div>
            )}
        </main>
    )
}

export default Currency