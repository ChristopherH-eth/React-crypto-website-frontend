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
        api: "http://100.25.157.35:8000/api/v1"
    }
}

// API Endpoints
const ENDPOINTS = {
    cryptoCount: "/all/count/",
    cryptosByPage: "/pages/",
    registerUser: "/register/",
    loginUser: "/login/",
    cookies: "/cookies/"
}

export {
    URLS,
    ENDPOINTS
}