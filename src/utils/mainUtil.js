/**
 * @file mainUtil.js
 * @author 0xChristopher
 * @brief This file contains functions used in the Main component.
 */

/**
 * @brief The showDropdown() function toggles the 'show' class on a particular dropdown button
 */
function showLimitDropdown()
{
    document.getElementById("rowbtn--content").classList.toggle("show")
}

/**
 * @brief The changeDisplayLimit20() function sets the number of cryptocurrencies to be displayed
 *      on each page to 20, and resets the page number to 1 to avoid a blank page populating.
 */
function changeDisplayLimit20(page20, setDisplayLimit, setPageNumber)
{
    setDisplayLimit(page20)
    setPageNumber(1)
}

/**
 * @brief The changeDisplayLimit50() function sets the number of cryptocurrencies to be displayed
 *      on each page to 50, and resets the page number to 1 to avoid a blank page populating.
 */
function changeDisplayLimit50(page50, setDisplayLimit, setPageNumber)
{
    setDisplayLimit(page50)
    setPageNumber(1)
}

/**
 * @brief The changeDisplayLimit100() function sets the number of cryptocurrencies to be displayed
 *      on each page to 100, and resets the page number to 1 to avoid a blank page populating.
 */
function changeDisplayLimit100(page100, setDisplayLimit, setPageNumber)
{
    setDisplayLimit(page100)
    setPageNumber(1)
}

export { 
    showLimitDropdown, 
    changeDisplayLimit20, 
    changeDisplayLimit50, 
    changeDisplayLimit100 
}