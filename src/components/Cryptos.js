import React from "react"

/**
 * @file Cryptos.js
 * @author 0xChristopher
 * @brief 
 */

function Cryptos(props)
{
    return (
        <section className="cryptos">
            <div className="cryptos--rank">{props.index}</div>
            <div className="cryptos--name">{props.name} {props.symbol}</div>
            <div className="cryptos--circ-supply">{props.circulatingSupply}</div>
        </section>
    )
}

export default Cryptos