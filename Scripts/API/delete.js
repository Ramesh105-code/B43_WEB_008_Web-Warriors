export async function deleteDatabaseData(section, id) {
    try {
        const response = await fetch(
            `${window.apiBaseUrl}${section}/${id}.json`,
            {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json",
                },
            }
        );

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        return true;
    } catch (error) {
        console.error("Error deleting data:", error);
        throw error;
    }
}
