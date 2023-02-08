import React from "react"
import ReactDOM from "react-dom/client"
import { createBrowserRouter, RouterProvider } from "react-router-dom"
import "./styles.css"
import App from "./App"
import Main from "./components/Main"
import Currency from "./components/Currency"
import ErrorPage from "./components/ErrorPage"

/**
 * @file index.js
 * @author 0xChristopher
 * @brief This file is simply responsible for rendering the application.
 */

const router = createBrowserRouter([
    {
        path: "/",
        element: <App />,
        errorElement: <ErrorPage />,
        children: [
            {
                path: "/",
                element: <Main />
            },
            {
                path: "currencies/",
                element: <Currency />
            }
        ]
    }
])

const root = ReactDOM.createRoot(document.getElementById("root"))

root.render(
    <React.StrictMode>
        <RouterProvider router = {router} />
    </React.StrictMode>
)
