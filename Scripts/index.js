import { getDatabaseData } from "./API/get.js";
import {
    BangalorePropertyImageCarasoul,
    DealsOfWeekend,
    ExploreIndiaImageCarasoul,
    Offers,
    QuickAndEasyTripPlanner,
    TopUniqueProperties,
    TrendingDestinations,
} from "./mainSection.js";

(async () => {
    Offers("offers", await getDatabaseData("offers"));
    ExploreIndiaImageCarasoul(
        "explore-india",
        await getDatabaseData("explore")
    );
    BangalorePropertyImageCarasoul(
        "property-banglore",
        await getDatabaseData("propertiesTypes")
    );

    TrendingDestinations(
        "trending-destination",
        await getDatabaseData("trendingDestinations")
    );
    QuickAndEasyTripPlanner(
        "quick-and-easy",
        await getDatabaseData("quickAndEasyTrip")
    );
    DealsOfWeekend(
        "deals-of-weekends",
        await getDatabaseData("dealsOfWeekend")
    );
    TopUniqueProperties(
        "top-uniqie-property",
        await getDatabaseData("topUniqueProperties")
    );
})();

document.querySelectorAll("#register-btn").forEach((b) => {
    b.addEventListener("click", function () {
        window.location.href = "register.html";
    });
});

document.querySelectorAll("#sign-in-btn").forEach((b) => {
    b.addEventListener("click", function () {
        window.location.href = "signin.html";
    });
});
