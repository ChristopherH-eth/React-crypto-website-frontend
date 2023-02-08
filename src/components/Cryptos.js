import React from "react"
import { addCommas, fixDecimals } from "../utils/utils";
import { Link } from "react-router-dom";

/**
 * @file Cryptos.js
 * @author 0xChristopher
 * @brief This file is responsible for creating cryptocurrency modules for the 'top 100 cryptocurrencies'
 *      section using information acquired through the backend server/database.
 */

/**
 * @brief The Cryptos() function creates cryptocurrency modules to be displayed in the Main module.
 * @param props The properties passed into each cryptocurrency module
 * @return Returns the constructed module(s)
 */
function Cryptos(props)
{
    // Set variables to prop values
    const {
        index,
        id,
        name,
        logo,
        symbol,
        circulating_supply,
        quote
    } = props

    return (
        <div>
            {props ? (
                <section className="cryptos">
                    <div className="cryptos--rank">{index}</div>
                    <div className="cryptos--name">
                        {logo ? <img className="cryptos--name--logo" src={`${logo}`} alt="logo" /> : ""}
                        <Link to={`/currencies/?currency=${id}`} className="link">{name}</Link>&nbsp;{symbol}
                    </div>
                    <div className="cryptos--price">${addCommas(fixDecimals(quote.USD.price))}</div>
                    <div className="cryptos--change">
                        <div className={quote.USD.percent_change_1h >= 0 ? "green" : "red"}>
                            {quote.USD.percent_change_1h.toFixed(2)}%
                        </div>
                    </div>
                    <div className="cryptos--change">
                        <div className={quote.USD.percent_change_24h >= 0 ? "green" : "red"}>
                            {quote.USD.percent_change_24h.toFixed(2)}%
                        </div>
                    </div>
                    <div className="cryptos--change">
                        <div className={quote.USD.percent_change_7d >= 0 ? "green" : "red"}>
                            {quote.USD.percent_change_7d.toFixed(2)}%
                        </div>
                    </div>
                    <div className="cryptos--market-cap">${`${addCommas(quote.USD.market_cap.toFixed())}`}</div>
                    <div className="cryptos--volume">${`${addCommas(quote.USD.volume_24h.toFixed())}`}</div>
                    <div className="cryptos--circ-supply">{`${addCommas(circulating_supply.toFixed())} `}
                        {symbol}</div>
                </section>
            ) : (
                <section className="cryptos">Loading...</section>
            )}
        </div>
    )
}

export default Cryptos