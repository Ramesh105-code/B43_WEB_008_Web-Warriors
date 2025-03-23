export default function activeBtnController(tabButtons) {
    this.activeBtn = tabButtons[0].dataset.section;
    this.tabButtons = tabButtons;
}

activeBtnController.prototype.update = function (section) {
    this.tabButtons.forEach((btn) => {
        if (btn.dataset.section === section) {
            btn.classList.remove("bg-white", "text-blue-600");
            btn.classList.add("bg-blue-600", "text-white");
        } else {
            btn.classList.remove("bg-blue-600", "text-white");
            btn.classList.add("bg-white", "text-blue-600");
        }
    });
};
