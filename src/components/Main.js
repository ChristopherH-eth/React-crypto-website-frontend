import React from "react"
import { useOutletContext } from "react-router-dom"
import { 
    showLimitDropdown, 
    changeDisplayLimit20, 
    changeDisplayLimit50, 
    changeDisplayLimit100 
} from "../utils/mainUtil"
import Cryptos from "./Cryptos"
import Pagination from "./Pagination"

/**
 * @file Main.js
 * @author 0xChristopher
 * @brief This file is responsible for the Main module of the cryptocurrency website.
 */

const limitDropdown = () => showLimitDropdown()                     // Toggle page limit dropdown menu

/**
 * @brief The Main() function builds the module, which consists of the module itself, as well as separate
 *      Crypto submodules. When there are changes to the Crypto submodules (such as changes in supply, price,
 *      etc.) the page will re-render to reflect those changes.
 * @return Returns the constructed Main module
 */
function Main()
{
    // Set variables to context values
    const [
        cryptoData, 
        displayLimit, 
        setDisplayLimit, 
        pageNumber, 
        setPageNumber, 
        cryptoCount
    ] = useOutletContext()

    const page20 = 20                                               // Page limit of 20 items
    const page50 = 50                                               // Page limit of 50 items
    const page100 = 100                                             // Page limit of 100 items
    const pageLimit = Math.floor(cryptoCount / displayLimit)        // Limit pagination

    // Component functions stored in mainUtil
    const displayLimit20 = () => changeDisplayLimit20(page20, setDisplayLimit, setPageNumber)
    const displayLimit50 = () => changeDisplayLimit50(page50, setDisplayLimit, setPageNumber)
    const displayLimit100 = () => changeDisplayLimit100(page100, setDisplayLimit, setPageNumber)

    // Map fetched cryptocurrency data
    const cryptocurrencies = cryptoData.map((crypto) => {
        return <Cryptos 
            key={crypto.id}
            index={crypto.cmc_rank}
            {...crypto}
        />
    })

    // Create Pagination based on our cryptocurrency data
    const pages = <Pagination 
        totalCount={cryptoCount}
        pageSize={displayLimit}
        pageNumber={pageNumber}
        maxPages={pageLimit}
        onPageChange={(page) => setPageNumber(page)}
    />

    return (
        <main>
            <section className="cryptocurrencies">
                {/* Filter & Display Selectors */}
                <section className="cryptocurrencies--options">
                    <h1 className="cryptocurrencies--options--text">
                        Top Cryptocurrencies By Market Cap
                    </h1>
                    <div className="cryptocurrencies--options--caption">
                        Placeholder Text
                    </div>
                    <div className="cryptocurrencies--options--content">
                        <div className="dropbutton--container">
                            <button className="dropbutton" 
                                id="rowbtn" 
                                onClick={limitDropdown}>{displayLimit} Rows</button>
                            <div className="dropbutton--content" id="rowbtn--content">
                                <div 
                                    className="dropbutton--content--row" 
                                    onClick={displayLimit20}
                                >20</div>
                                <div 
                                    className="dropbutton--content--row"
                                    onClick={displayLimit50}
                                >50</div>
                                <div 
                                    className="dropbutton--content--row"
                                    onClick={displayLimit100}
                                >100</div>
                            </div>
                        </div>
                    </div>
                </section>
                {/* Cryptocurrency Column Headers */}
                <section className="cryptocurrencies--column-headers">
                    <div className="cryptocurrencies--column-headers--rank">
                        #
                    </div>
                    <div className="cryptocurrencies--column-headers--name">
                        Name
                    </div>
                    <div className="cryptocurrencies--column-headers--price">
                        Price
                    </div>
                    <div className="cryptocurrencies--column-headers--change">
                        1h %
                    </div>
                    <div className="cryptocurrencies--column-headers--change">
                        24h %
                    </div>
                    <div className="cryptocurrencies--column-headers--change">
                        7d %
                    </div>
                    <div className="cryptocurrencies--column-headers--market-cap">
                        Market Cap
                    </div>
                    <div className="cryptocurrencies--column-headers--volume">
                        Volume (24h)
                    </div>
                    <div className="cryptocurrencies--column-headers--circ-supply">
                        Circulating Supply
                    </div>
                </section>
                {/* Cryptocurrency Object Array */}
                {cryptocurrencies}
                {/* Paginator */}
                <section className="cryptocurrencies--page-selector">
                    {pages}
                </section>
            </section>
        </main>
    )
}

export default Main