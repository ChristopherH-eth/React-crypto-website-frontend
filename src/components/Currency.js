import { useParams } from "react-router-dom"

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

    return (
        <main>
            <h1>{currency}</h1>
        </main>
    )
}

export default Currency