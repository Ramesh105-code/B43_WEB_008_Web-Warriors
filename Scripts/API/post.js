export async function postDatabaseData(section, data) {
    try {
        const response = await fetch(`${window.apiBaseUrl}${section}.json`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const result = await response.json();
        return result;
    } catch (error) {
        console.error("Error posting data:", error);
        throw error;
    }
}

export async function createUser(userData) {
    try {
        // First check if email already exists
        const response = await fetch(`${window.apiBaseUrl}/users.json`);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const users = await response.json();
        if (users) {
            const emailExists = Object.values(users).some(
                (user) => user.email === userData.email
            );
            if (emailExists) {
                return {
                    status: false,
                    message: "Email already exists",
                };
            }
        }

        // If email doesn't exist, create new user
        const createResponse = await fetch(`${window.apiBaseUrl}/users.json`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(userData),
        });

        if (!createResponse.ok) {
            return { status: false, message: "Registration failed" };
        }

        return { status: true };
    } catch (error) {
        throw error;
    }
}
