import { fixDecimals } from "./utils"

/**
 * @file currencyUtil.js
 * @author 0xChristopher
 * @brief This file contains functions used in the Currency component.
 */

/**
 * @brief The getLinks() function gets particular links from the currency metadata objects for display
 *      on the page.
 * @dev This could be it's own small component.
 * @param metadata The metadata object reference
 * @return Returns a div containing the desired links
 */
function getLinks(metadata)
{
    const {
        website,
        explorer,
        community,
        source_code,
        technical_doc
    } = metadata.urls

    return (
        <div className="currency--data--basic--left-line">
            {website && <div className="currency--data--basic--link">
                {website[0]}
            </div>}
            {explorer && <div className="currency--data--basic--link">
                Explorers
            </div>}
            {community && <div className="currency--data--basic--link">
                Community
            </div>}
            {source_code && <div className="currency--data--basic--link">
                Source Code
            </div>}
            {technical_doc && <div className="currency--data--basic--link">
                Whitepaper
            </div>}
        </div>
    )
}

/**
 * @brief The getTags() function gets the first four tags of a currency object's tags array for display
 *      on the page, and provides a link to view all tags belonging to the object.
 * @dev This can be used to allow users to search for cryptocurrencies based on tags.
 * @param currencyData The currency object reference
 * @returns Returns an array of tag divs for display
 */
function getTags(currencyData)
{
    let displayTags = []

    // Check if tags exist
    if (currencyData.tags !== null)
    {
        // Get at most the first four tags
        for (var i = 0; i < 4 && i < currencyData.tags.length; i++)
        {
            displayTags.push(<div key={i} className="currency--data--basic--tag">
                {currencyData.tags[i]}
            </div>)
        }
    }

    return displayTags
}

/**
 * @brief The BTCRatio() function computes the ratio of a given currency to BTC.
 * @param currencyPrice Price of a given currency
 * @param BTCPrice Price of BTC
 * @returns Returns the currency : BTC ratio
 */
function BTCRatio(currencyPrice, BTCPrice)
{
    return fixDecimals(currencyPrice / BTCPrice)
}

/**
 * @brief The ETHRatio() function computes the ratio of a given currency to ETH.
 * @param currencyPrice Price of a given currency
 * @param ETHPrice Price of ETH
 * @returns Returns the currency : ETH ratio
 */
function ETHRatio(currencyPrice, ETHPrice)
{
    return fixDecimals(currencyPrice / ETHPrice)
}

export { getLinks, getTags, BTCRatio, ETHRatio }