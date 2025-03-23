import { postDatabaseData } from "../API/post.js";
import { updateDatabaseData } from "../API/put.js";

const modal = document.getElementById("modal");
const modalTitle = document.getElementById("modal-title");
const modalForm = document.getElementById("modal-form");
const formFields = document.getElementById("form-fields");
const cancelBtn = document.getElementById("cancel-btn");

modal.addEventListener("click", () => {
    modal.classList.add("hidden");
});

modal.querySelector("div").addEventListener("click", (e) => {
    e.stopPropagation();
});

function openModal(action, currentData = null, section, id) {
    modalTitle.textContent = action === "create" ? "Add New Item" : "Edit Item";
    formFields.innerHTML = "";

    if (action === "edit") {
        const item = currentData;
        Object.keys(item).forEach((key) => {
            formFields.innerHTML += `
                <div>
                    <label class="block text-gray-700">${key}</label>
                    <input type="text" name="${key}" value="${item[key]}" class="w-full border border-gray-300 rounded px-4 py-2">
                </div>`;
        });
    } else {
        Object.keys(currentData || {}).forEach((key) => {
            formFields.innerHTML += `
                <div>
                    <label class="block text-gray-700">${key}</label>
                    <input type="text" name="${key}" class="w-full border border-gray-300 rounded px-4 py-2">
                </div>`;
        });
    }

    modalForm.onsubmit = (e) => handleFormSubmit(e, action, section, id);
    modal.classList.remove("hidden");
    modal.classList.add("flex");
}

cancelBtn.addEventListener("click", () => {
    modal.classList.add("hidden");
});

async function handleFormSubmit(e, action, section, id) {
    e.preventDefault();
    const formData = Object.fromEntries(new FormData(modalForm));
    try {
        if (action === "create") {
            // return;
            await postDatabaseData(section, formData);
        } else {
            await updateDatabaseData(section, id, formData);
        }
        modal.classList.add("hidden");
        loadSectionData(section);
    } catch (error) {
        console.error("Failed to submit form:", error);
    }
}

window.openModal = openModal;
