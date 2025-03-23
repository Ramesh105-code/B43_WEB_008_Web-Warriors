export async function getDatabaseData(endpoint) {
    try {
        const response = await fetch(`${window.apiBaseUrl}/${endpoint}`);

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        // console.log(response);


        const rawData = await response.json();
    

        // Reorder the data entries with consistent property order
        const data = Object.entries(rawData).map(([key, value]) => {
            // Create ordered object based on keys present in the data
            const orderedValue = {};
            // First add these keys if they exist
            if ("imgSrc" in value) orderedValue.imgSrc = value.imgSrc;
            if ("img" in value) orderedValue.img = value.img;
            if ("name" in value) orderedValue.name = value.name;
            if ("title" in value) orderedValue.title = value.title;
            if ("description" in value)
                orderedValue.description = value.description;
            if ("location" in value) orderedValue.location = value.location;
            if ("availablity" in value)
                orderedValue.availablity = value.availablity;

            // Add remaining keys in their original order
            Object.keys(value).forEach((k) => {
                if (!(k in orderedValue)) {
                    orderedValue[k] = value[k];
                }
            });

            return [key, orderedValue];
        });

        return data;
    } catch (error) {
        console.error("Error fetching data:", error);
        throw error;
    }
}

export async function getUserByEmail(email) {
    const users = await getDatabaseData("/users");
    return users.find((user) => user[1].email === email);
}
