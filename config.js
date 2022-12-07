import * as dotenv from "dotenv"

/**
 * @file config.js
 * @author 0xChristopher
 * @brief 
 */

dotenv.config()

const LOCAL_URL = process.env.LOCAL_URL

export { LOCAL_URL }