/**
 * @file Login.js
 * @author 0xChristopher
 * @brief This file builds and returns the login component.
 */

/**
 * @brief The Login() function builds the login box.
 * @return Returns the login box to be added to the page
 */
function Login(props)
{
    const {
        onLoggedInChange
    } = props

    /**
     * @brief The onLogin() function accepts credentials entered by the user and attempts to log them 
     *      into the website.
     */
    function onLogin()
    {
        var emailAddress = document.getElementById("login-box--email-address--input").value
        var password = document.getElementById("login-box--password--input").value

        console.log(emailAddress + " " + password)
        // Submit credentials to server

        onLoggedInChange(true)
    }

    return (
        <div className="login-container" id="login-container">
            <section className="login-box">
                <div className="login-box--header-container">
                    <h1 className="login-box--header-container--header">Log In</h1>
                    <h1 className="login-box--header-container--header">Sign Up</h1>
                </div>
                <div className="login-box--input-container">
                    <div className="login-box--email-address">Email Address</div>
                    <input 
                        type="text"
                        className="login-box--email-address--input" 
                        id="login-box--email-address--input"
                        placeholder="Enter your email address..."
                        required
                    ></input>
                    <div className="login-box--password">Password</div>
                    <input 
                        type="text"
                        className="login-box--password--input" 
                        id="login-box--password--input"
                        placeholder="Enter your password..."
                        required
                    ></input>
                </div>
                <button className="login-box--login-button" onClick={onLogin}>Log In</button>
            </section>
        </div>
    )
}

export default Login