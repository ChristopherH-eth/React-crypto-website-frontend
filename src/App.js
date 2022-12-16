import Header from "./components/Header"
import Main from "./components/Main"
import Footer from "./components/Footer"

/**
 * @file App.js
 * @author 0xChristopher
 * @brief This file simply imports the main components of the page and returns them as the main 'App'
 *      component.
 */

/**
 * @brief The App() function builds the webpage with necessary components.
 * @returns Returns the webpage to be rendered
 */
function App()
{
    return (
        <div>
            <Header />
            <Main />
            <Footer />
        </div>
    )
}

export default App