import { createUser } from "../../Scripts/API/post.js";

document
    .getElementById("continue-btn")
    .addEventListener("click", async function () {
        const name = document.getElementById("name").value;
        const email = document.getElementById("email").value;
        const password = document.getElementById("password").value;
        const emailError = document.getElementById("email-error");
        const emailSuccess = document.getElementById("email-success");

        emailError.textContent = "";
        emailSuccess.textContent = "";

        if (name && email && password) {
            const emailPattern =
                /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
            if (emailPattern.test(email)) {
                const userData = {
                    name: name,
                    email: email,
                    password: password,
                    admin: false,
                };

                let data = await createUser(userData);

                if (data.status === false) {
                    emailError.textContent = data.message;
                    // return;
                } else {
                    emailSuccess.textContent = "Registration Successful!";
                    await new Promise((resolve) => setTimeout(resolve, 1000));

                    window.location.href = "./signin.html";
                }
            } else {
                emailError.textContent = "Please enter a valid email address!";
            }
        } else {
            emailError.textContent = "Please fill all fields.";
        }
    });
