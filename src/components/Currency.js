import React from "react"
import { useSearchParams } from "react-router-dom"
import { URLS, ENDPOINTS } from "../utils/config"
import { addCommas, fixDecimals } from "../utils/utils"
import { getLinks, getTags, BTCRatio, ETHRatio } from "../utils/currencyUtil"

/**
 * @file Currency.js
 * @author 0xChristopher
 * @brief This file is responsible for the Currency module of the cryptocurrency website. It fetchs all
 *      cryptocurrency documents from the database to pull our the current currency, BTC, and ETH data to
 *      process on the page.
 * @dev It may be faster to fetch the currency, BTC, and ETH data in separate fetches should the database
 *      become too large.
 */

/**
 * @brief The Currency() function builds the currency module.
 * @return Returns the currency module to be added to the page
 */
function Currency()
{
    const [params] = useSearchParams()                                          // URL search parameters
    const currency = params.get("currency")                                     // Currency parameter from URL

    const [cryptoData, setCryptoData] = React.useState([])                      // Array of crypto objects
    const [currencyMetadata, setCurrencyMetadata] = React.useState()            // Current currency metadata

    const currencyData = cryptoData.find((x) => (x.id === parseInt(currency)))  // Current currency data
    const BTCPrice = cryptoData.find((x) => (x.symbol === "BTC"))               // Current BTC quote in USD
    const ETHPrice = cryptoData.find((x) => (x.symbol === "ETH"))               // Current ETH quote in USD

    const currencyMetadataUrl = `${URLS.api}${ENDPOINTS.metadataById}?cryptos=${currency}`
    const cryptoUrl = `${URLS.api}${ENDPOINTS.allCryptos}`

    // Get cryptocurrency data and metadata from server
    React.useEffect(() => {
        fetch(cryptoUrl)
            .then((res) => res.json())
            .then((res) => setCryptoData(res))
            .then(() => {
                fetch(currencyMetadataUrl)
                    .then((res) => res.json())
                    .then((res) => setCurrencyMetadata(res[0]))
                })
            .catch(console.error)
    }, [cryptoUrl, currencyMetadataUrl])

    return (
        <main className="currency">
            {currencyMetadata && currencyData ? (
                <div className="currency--container">
                    {/* Currency Data */}
                    <div className="currency--data--container">
                        <div className="currency--data">
                            {/* Currency Basic Data */}
                            <div className="currency--data--basic">
                                <div className="currency--data--basic--title">
                                    <img src={currencyMetadata.logo} 
                                        alt="currency logo" 
                                        className="currency--logo" 
                                    />
                                    <div>
                                        {currencyMetadata.name}&nbsp;
                                    </div>
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
                                <div className="currency--data--basic--left-line">
                                    Tags:
                                </div>
                                <div className="currency--data--basic--left-line">
                                    {getTags(currencyMetadata)}
                                    {currencyData.tags.length > 4 ? <div>View All</div> : <div></div>}
                                </div>
                            </div>
                            {/* Currency Price Data */}
                            <div className="currency--data--price">
                                <div className="currency--data--price--right-line">
                                    {currencyData.name} Price ({currencyData.symbol})
                                </div>
                                <div className="currency--data--price--right-line">
                                    <div className="currency--data--price--value">
                                        ${addCommas(fixDecimals(currencyData.quote.USD.price))}
                                    </div>
                                    <div className={currencyData.quote.USD.percent_change_24h 
                                        >= 0 ? "currency--data--price--change greenbg" 
                                        : "currency--data--price--change redbg"}>
                                        {currencyData.quote.USD.percent_change_24h.toFixed(2)}%
                                    </div>
                                </div>
                                {currencyData.symbol !== "BTC" ? 
                                <div className="currency--data--price--right-line currency--data--price--ratio">
                                    {BTCRatio(currencyData.quote.USD.price, BTCPrice.quote.USD.price)} BTC
                                </div>
                                :
                                ""}
                                {currencyData.symbol !== "ETH" ? 
                                <div className="currency--data--price--right-line currency--data--price--ratio">
                                    {ETHRatio(currencyData.quote.USD.price, ETHPrice.quote.USD.price)} ETH
                                </div>
                                :
                                ""}
                            </div>
                        </div>
                        {/* Currency Metrics */}
                        <div className="currency--metrics--container">
                            <div className="currency--metrics">
                                <div className="currency--metrics--data">
                                    <div className="currency--metrics--data--outer-container">
                                        <div className="currency--metrics--data--text">
                                            Market Cap
                                        </div>
                                        <div className="currency--metrics--data--number">
                                            ${addCommas(fixDecimals(currencyData.quote.USD.market_cap))}
                                        </div>
                                        <div className={currencyData.quote.USD.percent_change_24h 
                                            >= 0 ? "green currency--metrics--data--number" 
                                            : "red currency--metrics--data--number"}
                                        >
                                            {currencyData.quote.USD.percent_change_24h.toFixed(2)}%
                                        </div>
                                    </div>
                                    <div className="currency--metrics--data--outer-container">
                                        <div className="currency--metrics--data--inner-container">
                                            <div className="currency--metrics--data--text-inline">
                                                24h Volume / Market Cap
                                            </div>
                                            <div className="currency--metrics--data--number-inline">
                                                {fixDecimals(currencyData.quote.USD.volume_24h 
                                                / currencyData.quote.USD.market_cap)}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="currency--metrics--data--border" />
                                <div className="currency--metrics--data">
                                    <div className="currency--metrics--data--outer-container">
                                        <div className="currency--metrics--data--text">
                                            Fully Dilluted Market Cap
                                        </div>
                                        <div className="currency--metrics--data--number">
                                            ${addCommas(fixDecimals(
                                                currencyData.quote.USD.fully_diluted_market_cap
                                            ))}
                                        </div>
                                        <div className={currencyData.quote.USD.percent_change_24h 
                                            >= 0 ? "green currency--metrics--data--number" 
                                            : "red currency--metrics--data--number"}
                                        >
                                            {currencyData.quote.USD.percent_change_24h.toFixed(2)}%
                                        </div>
                                    </div>
                                </div>
                                <div className="currency--metrics--data--border" />
                                <div className="currency--metrics--data">
                                    <div className="currency--metrics--data--outer-container">
                                        <div className="currency--metrics--data--text">
                                            Volume 24h
                                        </div>
                                        <div className="currency--metrics--data--number">
                                            ${addCommas(fixDecimals(currencyData.quote.USD.volume_24h))}
                                        </div>
                                        <div className={currencyData.quote.USD.volume_change_24h 
                                            >= 0 ? "green currency--metrics--data--number" 
                                            : "red currency--metrics--data--number"}
                                        >
                                            {currencyData.quote.USD.volume_change_24h.toFixed(2)}%
                                        </div>
                                    </div>
                                </div>
                                <div className="currency--metrics--data--border" />
                                <div className="currency--metrics--data">
                                    <div className="currency--metrics--data--outer-container">
                                        <div className="currency--metrics--data--text">
                                            Circulating Supply
                                        </div>
                                        <div className="currency--metrics--data--number">
                                            {`${addCommas(currencyData.circulating_supply.toFixed())} `}
                                            {currencyData.symbol}
                                        </div>
                                        <div className="currency--metrics--data--number">
                                            {/* Placeholder space for circulatin supply bar */}
                                            &nbsp;
                                        </div>
                                    </div>
                                    <div className="currency--metrics--data--outer-container">
                                        <div className="currency--metrics--data--inner-container">
                                            <div className="currency--metrics--data--text-inline">
                                                Max Supply
                                            </div>
                                            <div className="currency--metrics--data--number-inline">
                                                {addCommas(currencyData.max_supply.toFixed())}
                                            </div>
                                        </div>
                                        <div className="currency--metrics--data--inner-container">
                                            <div className="currency--metrics--data--text-inline">
                                                Total Supply
                                            </div>
                                            <div className="currency--metrics--data--number-inline">
                                                {addCommas(currencyData.total_supply.toFixed())}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="currency--metrics--border" />
                    </div>
                    {/* Currency Description */}
                    <div className="currency--description">
                        <div className="currency--description--title">
                            {currencyMetadata.symbol} Data
                        </div>
                        <div className="currency--description--body">
                            {currencyMetadata.description}
                        </div>
                    </div>
                </div>
            ) : (
                <div className="currency--container">Loading...</div>
            )}
        </main>
    )
}

export default Currency