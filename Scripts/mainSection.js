import ImageCarasoulGenerator from "./Components/ImageCarasoulGenerator.js";

import price from "./price.js";

export function Offers(containerId, data) {
    let cardHtmlData = "";
    data.forEach((d) => {
        cardHtmlData += `
        <div class="swiper-slide">
            <div class="flex p-4 border border-gray-400 rounded-md">
                <div class="space-y-5">
                    <h3 class="font-bold text-xl">${d[1].title}</h3>
                    <p class="text-gray-500 ">${d[1].description} properties</p>            
                    <div class="bg-blue-600 text-white w-fit px-4 py-3 font-bold rounded-lg">${d[1].btnText}</div>
                </div>
                <img
                    src=${d[1].imgSrc}
                    alt=""
                    class="w-32 h-32 rounded-lg object-cover p-3 "
                />
            </div>
        </div>
        `;
    });

    const headingHtml = `
        <div class="my-4">
            <h1 class="text-3xl font-bold">Offers</h1>
            <p class="text-gray-500">
                Promotions, deals and special offers for you
            </p>
        </div>
    `;

    const breakpoints = {
        640: { slidesPerView: 2 },
        768: { slidesPerView: 2 },
        1024: { slidesPerView: 2 },
        1280: { slidesPerView: 2 },
        1536: { slidesPerView: 2 },
    };
    ImageCarasoulGenerator(containerId, cardHtmlData, headingHtml, breakpoints);
}

export function ExploreIndiaImageCarasoul(containerId, data) {
    let cardHtmlData = "";
    data.forEach((d) => {
        cardHtmlData += `
        <div class="swiper-slide">
            <img
                src=${d[1].imgSrc}
                alt=${d[1].location}
                 class="w-60 h-48 rounded-lg object-cover"
            />
            <h3 class="font-bold text-xl">${d[1].location}</h3>
            <p class="text-gray-500">${d[1].properties} properties</p>
        </div>
        `;
    });

    const headingHtml = `
        <div class="my-4">
            <h1 class="text-3xl font-bold">Explore India</h1>
            <p class="text-gray-500">
                These popular destinations have a lot to offer
            </p>
        </div>
    `;

    ImageCarasoulGenerator(containerId, cardHtmlData, headingHtml);
}

const userCookie = document.cookie
    .split("; ")
    .find((row) => row.startsWith("userInfo="));
export function BangalorePropertyImageCarasoul(containerId, data) {
    let cardHtmlData = "";
    data.forEach((d) => {
        cardHtmlData += `
        <a href="${
            userCookie ? `/property.html?type=${d[1].type}` : "/signin.html"
        }" class="swiper-slide">
            <img
                src=${d[1].imgSrc}
                alt=${d[1].location}
                 class="w-80 h-80 rounded-lg object-cover"
            />
            <h3 class="font-bold text-xl capitalize">${
                d[1].type.charAt(0).toUpperCase() + d[1].type.slice(1)
            }</h3>
            <p class="text-gray-500">${new Date().toLocaleDateString("en-US", {
                day: "numeric",
                month: "short",
            })} - ${new Date(
            Date.now() +
                (2 + Math.floor(Math.random() * 6)) * 24 * 60 * 60 * 1000
        ).toLocaleDateString("en-US", {
            day: "numeric",
            month: "short",
        })}, 2 adults</p>

            <p class="text-gray-500">${
                Math.floor(Math.random() * 1991) + 10
            } available</p>
        </a>
        `;
    });

    const headingHtml = `
        <div class="my-4">
            <h1 class="text-3xl font-bold">
                Browse by property type in Bangalore
            </h1>
        </div>
    `;

    const breakpoints = {
        640: { slidesPerView: 2 },
        768: { slidesPerView: 2 },
        1024: { slidesPerView: 4 },
        1280: { slidesPerView: 4 },
        1536: { slidesPerView: 4 },
    };

    ImageCarasoulGenerator(containerId, cardHtmlData, headingHtml, breakpoints);
}

export function TrendingDestinations(containerId, data) {
    let cardHtmlData = "";
    data.forEach((d, index) => {
        // Check for the last two images and make them grow
        const isLastRow = index >= data.length - 2;
        const flexClasses = isLastRow
            ? "flex-grow"
            : "flex-1 min-w-[50%] md:min-w-[30%]";

        cardHtmlData += `
          <div class="${flexClasses} relative">
            <h3 class="font-bold text-xl absolute text-white top-5 left-3 bg-black/50 px-2 rounded-md">${d[1].cityName}</h3>
            <img
              src="${d[1].imgSrc}"
              alt="${d[1].cityName}"
              class="w-full h-80 rounded-lg object-cover"
            />
          </div>
        `;
    });

    const headingHtml = `
        <div class="my-4">
            <h1 class="text-3xl font-bold">
                Trending destinations

            </h1>
            <p class="text-gray-500">
                Travellers searching for India also booked these
            </p>
        </div>
    `;

    let div = document.createElement("div");
    div.className = "flex gap-5 flex-wrap";
    div.innerHTML = cardHtmlData;

    let td = document.getElementById(containerId);
    td.innerHTML = headingHtml;
    td.appendChild(div);
}

export function QuickAndEasyTripPlanner(containerId, data) {
    let cardHtmlData = "";
    data.forEach((d) => {
        cardHtmlData += `
        <div class="swiper-slide">
            <img
                src=${d[1].imgSrc}
                alt=${d[1].city}
                 class="w-60 h-48 rounded-lg object-cover"
            />
            <h3 class="font-bold text-xl">${d[1].city}</h3>
        </div>
        `;
    });

    const headingHtml = `
        <div class="my-4">
            <h1 class="text-3xl font-bold">Quick and easy trip planner</h1>
            <p class="text-gray-500">
                Pick a vibe and explore the top destinations in India
            </p>
        </div>
    `;

    ImageCarasoulGenerator(containerId, cardHtmlData, headingHtml);
}

export function DealsOfWeekend(containerId, data) {
    let cardHtmlData = "";
    data.forEach((d) => {
        cardHtmlData += `
        <div class="swiper-slide">
            <img
                src=${d[1].imgSrc}
                alt=${d[1].location}
                 class="w-60 h-48 rounded-lg object-cover"
            />
            
            <div class="flex flex-col gap-2 w-60">
                <h3 class="font-bold text-xl truncate-2 line-clamp-2">${
                    d[1].title
                }</h3>
                <p class="text-gray-500">${d[1].location}</p>
                <div class= "flex gap-2 items-center">
                    <div class="text-xl text-white bg-blue-700 w-8 h-8 text-center rounded-md rounded-">${
                        d[1].rating
                    }</div>
                    <p class="text-gray-500">${d[1].reviews} reviews</p>
                </div>
                
                <div class="flex gap-2 items-center justify-end text-xl">
                    <div class="text-red-700 stroke-current line-through"> ${price(
                        d[1].discountedPrice
                    )}</div>
                    <div class="font-bold">${price(d[1].actualPrice)}</div>
                </div>            
            </div>
        </div>
        `;
    });

    const headingHtml = `
        <div class="my-4">
            <h1 class="text-3xl font-bold">Deals for the weekend</h1>
            <p class="text-gray-500">
                Save on stays for 27 December - 29 December
            </p>
        </div>
    `;

    const breakpoints = {
        640: { slidesPerView: 1 },
        768: { slidesPerView: 2 },
        1024: { slidesPerView: 3 },
        1280: { slidesPerView: 4 },
        1536: { slidesPerView: 4 },
    };
    ImageCarasoulGenerator(containerId, cardHtmlData, headingHtml, breakpoints);
}

export function TopUniqueProperties(containerId, data) {
    let cardHtmlData = "";
    data.forEach((d) => {
        cardHtmlData += `
        <div class="swiper-slide">
            <img
                src=${d[1].imgSrc}
                alt=${d[1].location}
                 class="w-60 h-48 rounded-lg object-cover"
            />
            <div class="flex flex-col gap-2 w-60 justify-between">
                <h3 class="font-bold text-xl truncate-2 line-clamp-2">${
                    d[1].title
                }</h3>
                <p class="text-gray-500">${d[1].location}</p>
                <div class= "flex gap-2 items-center">
                    <div class="text-xl text-white bg-blue-700 w-8 h-8 text-center rounded-md rounded-">${
                        d[1].rating
                    }</div>
                    <p class="text-gray-500">${d[1].reviews} reviews</p>
                </div>
                
                <div class="flex gap-2 items-center justify-end">
                    <p class="text-gray-500">Starting from <span class="text-xl font-bold text-black">${price(
                        d[1].price
                    )}</span></p>  
                </div>            
            </div>
        </div>
        `;
    });

    const headingHtml = `
        <div class="my-4">
            <h1 class="text-3xl font-bold">Stay at our top unique properties</h1>
            <p class="text-gray-500">
                From castles and villas to boats and igloos, we've got it all
            </p>
        </div>
    `;

    const breakpoints = {
        640: { slidesPerView: 1 },
        768: { slidesPerView: 2 },
        1024: { slidesPerView: 3 },
        1280: { slidesPerView: 4 },
        1536: { slidesPerView: 4 },
    };
    ImageCarasoulGenerator(containerId, cardHtmlData, headingHtml, breakpoints);
}
