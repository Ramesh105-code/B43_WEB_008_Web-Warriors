export default function ImageCarasoulGenerator(
    containerId,
    cardHtmlData,
    headingHtml,
    breakpoints = {
        640: { slidesPerView: 2 },
        768: { slidesPerView: 3 },
        1024: { slidesPerView: 4 },
        1280: { slidesPerView: 5 },
        1536: { slidesPerView: 6 },
    }
) {
    const xx = `
    ${headingHtml}
    <div class="swiper">                
        <div class="swiper-wrapper">
            ${cardHtmlData}
        </div>
        <div
            class="swiper-btn-prev w-10 h-10 p-2 rounded-full flex justify-center items-center text-2xl absolute z-10 left-0 m-auto top-0 bottom-0 bg-white text-gray-700 hover:bg-gray-200"
        >
            <i class="ri-arrow-left-s-line"></i>
        </div>
        <div
            class="swiper-btn-next w-10 h-10 p-2 rounded-full flex justify-center items-center text-2xl absolute z-10 right-0 m-auto top-0 bottom-0 bg-white text-gray-700 hover:bg-gray-200"
        >
            <i class="ri-arrow-right-s-line"></i>
        </div>
    </div>
    `;
    document.querySelector(`#${containerId}`).innerHTML = xx;

    new Swiper(`#${containerId} .swiper`, {
        direction: "horizontal",
        slidesPerView: 1,
        spaceBetween: 10,
        slidesPerGroup: 1,
        centeredSlidesBounds: true,
        loop: false,
        loopFillGroupWithBlank: true,
        width: null,
        navigation: {
            nextEl: ".swiper-btn-next",
            prevEl: ".swiper-btn-prev",
        },
        breakpoints: breakpoints,
    });
}
