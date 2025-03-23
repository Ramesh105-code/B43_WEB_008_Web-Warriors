// Import the API function
import { getUserByEmail } from "../../Scripts/API/get.js";

// catch all the elements by id
const signinBtn = document.getElementById("signin-btn");
const emailInput = document.getElementById("email");
const passInput = document.getElementById("password");
const emailError = document.getElementById("email-error");

// add event listener for sign in button
signinBtn.addEventListener("click", async function () {
    const enteredEmail = emailInput.value;
    const enteredPass = passInput.value;

    try {
        // Get user from database
        const user = await getUserByEmail(enteredEmail);
        console.log(user);

        if (user && user[1].password === enteredPass) {
            // Set cookie with user info that expires in 24 hours
            const d = new Date();
            d.setTime(d.getTime() + 24 * 60 * 60 * 1000);
            document.cookie = `userInfo=${JSON.stringify(
                user[1]
            )}; expires=${d.toUTCString()}; path=/`;

            window.location.href = "index.html";
        } else {
            emailError.textContent = "Invalid Credentials. Please try again!";
        }
    } catch (error) {
        console.error("Login error:", error);
        emailError.textContent = "An error occurred. Please try again later.";
    }
});
