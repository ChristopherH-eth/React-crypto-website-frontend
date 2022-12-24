import React from "react"

/**
 * @file Cryptos.js
 * @author 0xChristopher
 * @brief This file is responsible for creating cryptocurrency modules for the 'top 100 cryptocurrencies'
 *      section using information acquired through the backend server/database.
 */

/**
 * @brief The addCommas() function adds commas to a number using regular expressions.
 * @return Returns the number as a string with commas where necessary
 */
function addCommas(x) 
{
    return x.toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",");
}

/**
 * @brief The fixDecimals() function sets the number of decimals a number should be rounded to.
 * @param x The number to be rounded
 * @returns Returns the number rounded to 'y' decimal places
 */
function fixDecimals(x)
{
    if (x > 2)
        return x.toFixed(2)
    else if (x > 0.00099)
        return x.toFixed(4)
    else
        return x.toFixed(9)
}

/**
 * @brief The Cryptos() function creates cryptocurrency modules to be displayed in the Main module.
 * @param props The properties passed into each cryptocurrency module
 * @return Returns the constructed module(s)
 */
function Cryptos(props)
{
    return (
        <section className="cryptos">
            <div className="cryptos--rank">{props.index}</div>
            <div className="cryptos--name">
                <img className="cryptos--name--logo" src={`${props.image}`} alt="logo" /> 
                {props.name} {props.symbol}
            </div>
            <div className="cryptos--price">${fixDecimals(props.quote.USD.price)}</div>
            <div className="cryptos--change">
                <div className={props.quote.USD.percent_change_1h >= 0 ? "green" : "red"}>
                    {props.quote.USD.percent_change_1h.toFixed(2)}%
                </div>
            </div>
            <div className="cryptos--change">
                <div className={props.quote.USD.percent_change_24h >= 0 ? "green" : "red"}>
                    {props.quote.USD.percent_change_24h.toFixed(2)}%
                </div>
            </div>
            <div className="cryptos--change">
                <div className={props.quote.USD.percent_change_7d >= 0 ? "green" : "red"}>
                    {props.quote.USD.percent_change_7d.toFixed(2)}%
                </div>
            </div>
            <div className="cryptos--market-cap">${`${addCommas(props.quote.USD.market_cap.toFixed())}`}</div>
            <div className="cryptos--volume">${`${addCommas(props.quote.USD.volume_24h.toFixed())}`}</div>
            <div className="cryptos--circ-supply">{`${addCommas(props.circulating_supply.toFixed())} `}
                {props.symbol}</div>
        </section>
    )
}

export default Cryptos