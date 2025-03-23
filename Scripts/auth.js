const userCookie = document.cookie
    .split("; ")
    .find((row) => row.startsWith("userInfo="));

if (userCookie) {
    const userInfo = JSON.parse(userCookie.split("=")[1]);
    console.log("Logged in user:", userInfo);

    document
        .querySelectorAll("#register-btn, #sign-in-btn")
        .forEach((button) => {
            button.style.display = "none";
        });

    document.querySelectorAll("#user-account").forEach((userAccountBtn) => {
        if (userAccountBtn) {
            userAccountBtn.style.display = "block";

            const adminBtn = document.getElementById("admin-panel-btn");
            if (userInfo.admin === true) {
                adminBtn.classList.remove("hidden");
                adminBtn.addEventListener("click", () => {
                    window.location.href = "admin.html";
                });
            }

            // Create dropdown menu
            const dropdown = document.createElement("div");
            dropdown.className =
                "absolute w-48 bg-white rounded-md shadow-lg hidden p-2 text-xl font-semibold";
            dropdown.innerHTML = `
                <p class="text-center text-gray-500">${userInfo.name}</p>
                <a href="" class="block px-4 py-2 text-gray-800 hover:bg-gray-200 ">My Profile</a>
                <button id="logout-btn" class="w-full text-left px-4 py-2 text-gray-800 hover:bg-gray-200">Logout</button>
            `;
            userAccountBtn.parentElement.appendChild(dropdown);

            // Toggle dropdown on click
            userAccountBtn.addEventListener("click", (e) => {
                e.stopPropagation();
                dropdown.classList.toggle("hidden");
                let pos = userAccountBtn.getBoundingClientRect();

                let dPos = dropdown.getBoundingClientRect();

                dropdown.style.top = pos.bottom + "px";
                dropdown.style.left = pos.right - dPos.width + "px";
            });

            // Hide dropdown when clicking outside
            document.addEventListener("click", () => {
                dropdown.classList.add("hidden");
            });

            // Handle logout
            dropdown
                .querySelector("#logout-btn")
                .addEventListener("click", () => {
                    document.cookie =
                        "userInfo=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
                    window.location.href = "index.html";
                });
        }
    });
}
