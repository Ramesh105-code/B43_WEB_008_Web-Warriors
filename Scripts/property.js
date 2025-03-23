// Function to get URL parameters
function getUrlParameter(name) {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get(name);
}

// Function to create property card
function createPropertyCard(property) {
    return `
        <div class="bg-white rounded-lg shadow-md overflow-hidden hover:scale-105 transition-all duration-300 cursor-pointer w-full border border-gray-200 lg:w-52 xl:w-52 2xl:w-60">
            <div class="aspect-w-16 aspect-h-9">
                <img src="${property.img}" alt="${property.name}" class="w-full h-48 object-cover rounded-md">
            </div>
            <div class="p-4">
                <h3 class="text-lg font-semibold mb-2">${property.name}</h3>
                <p class="text-gray-600 mb-2">${property.location}</p>
                <div class="flex justify-between items-center mb-2">
                    <span class="bg-blue-100 text-blue-800 px-2 py-1 rounded">Rating: ${property.rating}</span>
                    <span class="text-gray-600">${property.reviews} reviews</span>
                </div>
                <div class="flex justify-between items-center">
                    <span class="text-xl font-bold">₹${property.price}</span>
                    <span class="text-sm text-gray-500">per night</span>
                </div>
            </div>
        </div>
    `;
}

// Function to filter and display properties
async function displayProperties() {
    try {
        const response = await fetch("../Data/properties.json");
        const data = await response.json();
        const propertyContainer = document.getElementById("property-container");

        // Get all filter values
        const selectedTypes = Array.from(
            document.querySelectorAll(".property-type:checked")
        ).map((checkbox) => checkbox.value);
        const selectedRatings = Array.from(
            document.querySelectorAll(".rating-filter:checked")
        ).map((checkbox) => Number(checkbox.value));
        const selectedFacilities = Array.from(
            document.querySelectorAll(".facility-filter:checked")
        ).map((checkbox) => checkbox.value);
        const selectedBedTypes = Array.from(
            document.querySelectorAll(".bed-filter:checked")
        ).map((checkbox) => checkbox.value);
        const priceRange = document.getElementById("price-range").value;

        // Apply filters
        let filteredProperties = data.propertiesData;

        // Filter by type
        if (selectedTypes.length > 0) {
            filteredProperties = filteredProperties.filter((property) =>
                selectedTypes.includes(property.type)
            );
        }

        // Filter by rating
        if (selectedRatings.length > 0) {
            filteredProperties = filteredProperties.filter((property) =>
                selectedRatings.some((rating) => property.rating >= rating)
            );
        }

        // Filter by facilities
        if (selectedFacilities.length > 0) {
            filteredProperties = filteredProperties.filter((property) =>
                selectedFacilities.every(
                    (facility) => property.facilities[facility]
                )
            );
        }

        // Filter by bed type
        if (selectedBedTypes.length > 0) {
            filteredProperties = filteredProperties.filter((property) =>
                selectedBedTypes.includes(property.bed_preference)
            );
        }

        // Filter by price
        filteredProperties = filteredProperties.filter(
            (property) => property.price <= priceRange
        );

        // Update results count
        const resultsCount = document.getElementById("results-count");
        resultsCount.textContent = `${filteredProperties.length} ${
            filteredProperties.length === 1 ? "property" : "properties"
        } found`;

        // Display filtered properties
        propertyContainer.innerHTML = filteredProperties
            .map((property) => createPropertyCard(property))
            .join("");
    } catch (error) {
        console.error("Error loading properties:", error);
    }
}

// Initialize page
document.addEventListener("DOMContentLoaded", () => {
    // Set initial checkbox state based on URL parameter
    const typeFromUrl = getUrlParameter("type");
    if (typeFromUrl) {
        const checkbox = document.querySelector(
            `input[value="${typeFromUrl}"]`
        );
        if (checkbox) checkbox.checked = true;
    }

    // Add event listeners to all filters
    document
        .querySelectorAll(
            ".property-type, .rating-filter, .facility-filter, .bed-filter"
        )
        .forEach((checkbox) => {
            checkbox.addEventListener("change", displayProperties);
        });

    // Add event listener to price range
    const priceRange = document.getElementById("price-range");
    const priceMin = document.getElementById("price-min");
    const priceMax = document.getElementById("price-max");

    priceRange.addEventListener("input", (e) => {
        priceMax.textContent = `₹${Number(e.target.value).toLocaleString()}`;
        displayProperties();
    });

    // Initial display
    displayProperties();
});

const userCookie = document.cookie
    .split("; ")
    .find((row) => row.startsWith("userInfo="));

if (!userCookie) {
    window.location.href = "signin.html";
}
