/**
 * @file config.js
 * @author 0xChristopher
 * @brief This file handles variables that regularly occur throughout the website.
 */

// Base URL and API versions
const URLS = {
    api: "http://localhost:8000/api/v1"
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