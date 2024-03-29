import { useRouteError } from "react-router-dom"

/**
 * @file ErrorPage.js
 * @author 0xChristopher
 * @brief This file is responsible for the ErrorPage module of the cryptocurrency website.
 */

function ErrorPage()
{
    const error = useRouteError()

    return (
        <div className="error-page">
            <h1>404 Error</h1>
            <p>An unexpected error has occurred.</p>
            <p>
                <i>{error.statusText || error.message}</i>
            </p>
        </div>
    )
}

export default ErrorPage