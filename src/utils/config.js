/**
 * @file config.js
 * @author 0xChristopher
 * @brief This file handles variables that regularly occur throughout the website.
 */

// Base URL and API versions
let URLS = {}

if (process.env.NODE_ENV === "development")
{
    URLS = {
        api: "http://localhost:8000/api/v1"
    }
}
else
{
    URLS = {
        api: "http://54.210.51.248:8000/api/v1"
    }
}

// API Endpoints
const ENDPOINTS = {
    allCryptos: "/all/",
    cryptoCount: "/all/count/",
    cryptosByPage: "/pages/",
    metadataById: "/metadata/",
    cryptoById: "/cryptocurrencies/",
    registerUser: "/register/",
    loginUser: "/login/",
    cookies: "/cookies/"
}

export {
    URLS,
    ENDPOINTS
}