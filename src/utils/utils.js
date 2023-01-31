/**
 * @file utils.js
 * @author 0xChristopher
 * @brief This file is responsible for general purpose functions that can be used accross the entire web
 *      application, such as string and number manipulation.
 */

/**
 * @brief The addCommas() function adds commas to a number using regular expressions.
 * @return Returns the number as a string with commas where necessary
 */
function addCommas(x) 
{
    return x.toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",");
}

/**
 * @brief The fixDecimals() function sets the number of decimals a number should be rounded to.
 * @param x The number to be rounded
 * @returns Returns the number rounded to 'y' decimal places
 */
function fixDecimals(x)
{
    if (x > 2)
        return x.toFixed(2)
    else if (x > 0.00099)
        return x.toFixed(4)
    else
        return x.toFixed(9)
}

export { addCommas, fixDecimals }