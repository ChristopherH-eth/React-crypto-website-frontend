/**
 * @file appUtil.js
 * @author 0xChristopher
 * @brief This file contains functions used in the App component.
 */

/**
 * @brief The selectWindow() function closes menus and popups if the user clicks outside of it.
 */
const selectWindow = window.onclick = function(event) 
{
    // Dropdown menus
    if (!event.target.matches(".dropbutton")) 
    {
        const dropdowns = document.getElementsByClassName("dropbutton--content")

        for (let i = 0; i < dropdowns.length; i++) 
        {
            let openDropdown = dropdowns[i]

            if (openDropdown.classList.contains("show"))
                openDropdown.classList.remove("show")
        }
    }

    // Login popup and page mask
    if (event.target.matches("#login-page-mask") || event.target.matches(".login-container")) 
    {
        const pageMask = document.getElementsByClassName("login-page-mask")
        const loginHeaders = document.getElementsByClassName("login-box--header-container--header")
        const loginBox = document.getElementsByClassName("login-container")

        for (let i = 0; i < pageMask.length; i++) 
        {
            let openPageMask = pageMask[i]

            if (openPageMask.classList.contains("show"))
                openPageMask.classList.remove("show")
        }

        for (let i = 0; i < loginHeaders.length; i++) 
        {
            let selectedHeaders = loginHeaders[i]

            if (selectedHeaders.classList.contains("header--selected"))
                selectedHeaders.classList.remove("header--selected")
        }

        for (let i = 0; i < loginBox.length; i++) 
        {
            let openLoginBox = loginBox[i]

            if (openLoginBox.classList.contains("show"))
                openLoginBox.classList.remove("show")
        }

        // Clear input fields if they still contain text
        document.getElementById("login-box--email-address--input").value = ""
        document.getElementById("login-box--password--input").value = ""
    }
}

export { selectWindow }