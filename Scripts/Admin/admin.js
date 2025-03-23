import activeBtnController from "../activeButtonController.js";
import { deleteDatabaseData } from "../API/delete.js";
import { getDatabaseData } from "../API/get.js";
import { postDatabaseData } from "../API/post.js";

const contentContainer = document.getElementById("content-container");
let currentData = [];

const tabButtonsContainer = document.getElementById("tab-buttons-container");

const sectionsData = window.sectionsData;
Object.entries(sectionsData).forEach(([section, name]) => {
    const button = document.createElement("button");
    button.classList.add("tab-btn", "admin-panel-btn");
    button.dataset.section = section;
    button.textContent = name;
    tabButtonsContainer.appendChild(button);
});

const tabButtons = document.querySelectorAll(".tab-btn");

const activeBtnCtrl = new activeBtnController(tabButtons);
activeBtnCtrl.update("offers");

tabButtons.forEach((button) => {
    button.addEventListener("click", () => {
        const section = button.dataset.section;

        activeBtnCtrl.update(section);
        loadSectionData(section);
    });
});

async function loadSectionData(section) {
    try {
        currentData = await getDatabaseData(section);
        renderTable(section, currentData);
    } catch (error) {
        console.error("Failed to fetch data:", error);
        contentContainer.innerHTML = `<p class="text-red-500">Failed to load data.</p>`;
    }
}
loadSectionData("offers");

function renderTable(section, data) {
    let html = `<div class="flex justify-between mb-4">
                    <h2 class="text-2xl font-bold">${sectionsData[
                        section
                    ].toUpperCase()}</h2>
                    <div class="space-x-2">
                        <button class="bg-blue-500 text-white px-4 py-2 rounded" onclick="handleBulkUpload('${section}')">
                            <i class="ri-upload-2-line"></i> Bulk Upload
                        </button>
                        <button class="bg-green-500 text-white px-4 py-2 rounded" onclick="handleAddNewBtn('${section}')">Add New</button>
                    </div>
                </div>`;
    if (data.length === 0) {
        html += `<p class="text-center text-gray-600">No data available.</p>`;
    } else {
        html += `
            <table class="table-auto w-full border-collapse border border-gray-300">
                <thead>
                    <tr class="bg-gray-200">
                        ${Object.keys(data[0][1])
                            .map(
                                (key) =>
                                    `<th class="border border-gray-300 px-4 py-2 w-fit">${key}</th>`
                            )
                            .join("")}
                        <th class="border border-gray-300 px-4 py-2">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    ${data
                        .map(
                            (item, index) =>
                                `
                                <tr>
                                    ${Object.keys(item[1])
                                        .map(
                                            (key) =>
                                                `<td class="border border-gray-300 px-4 py-2">${
                                                    key == "imgSrc"
                                                        ? `<img src=${item[1][key]} alt="" class="w-24"></img>`
                                                        : key == "facilities"
                                                        ? Object.entries(
                                                              item[1][key]
                                                          )
                                                              .map(
                                                                  ([
                                                                      facility,
                                                                      value,
                                                                  ]) =>
                                                                      `${facility}: ${
                                                                          value
                                                                              ? "✓"
                                                                              : "✗"
                                                                      }\n`
                                                              )
                                                              .join(", ")
                                                        : item[1][key]
                                                }</td>`
                                        )
                                        .join("")}
                                    <td class="border border-gray-300 px-4 py-2 text-center">
                                        <div class="inline-flex space-x-2">
                                            <button class="bg-yellow-500 hover:bg-yellow-600 text-white px-4 py-2 rounded" onclick="handleEditButton('${section}', '${
                                    item[0]
                                }')">
                                                <i class="ri-pencil-line"></i>
                                            </button>
                                            <button class="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded"
                                            onclick="handleDeleteButton('${section}', '${
                                    item[0]
                                }')"><i class="ri-delete-bin-6-line"></i></button>
                                        </div>
                                    </td>
                                </tr>
                            `
                        )
                        .join("")}
                </tbody>
            </table>`;
    }
    contentContainer.innerHTML = html;
}

function handleEditButton(section, id) {
    const dataEntry = currentData.find(([entryId]) => entryId === id);
    if (dataEntry) {
        openModal("edit", dataEntry[1], section, id);
    }
}

function handleAddNewBtn(section) {
    openModal("create", currentData[0][1], section);
}

async function handleDeleteButton(section, id) {
    if (confirm("Are you sure you want to delete this item?")) {
        try {
            await deleteDatabaseData(section, id);
            loadSectionData(section);
        } catch (error) {
            console.error("Failed to delete item:", error);
        }
    }
}

async function handleBulkUpload(section) {
    const input = document.createElement("input");
    input.type = "file";
    input.accept = ".json";

    input.onchange = async (e) => {
        const file = e.target.files[0];
        if (file) {
            try {
                const reader = new FileReader();
                reader.onload = async (event) => {
                    try {
                        const jsonData = JSON.parse(event.target.result);

                        if (!Array.isArray(jsonData)) {
                            throw new Error(
                                "Uploaded file must contain an array of items"
                            );
                        }

                        const uploadPromises = jsonData.map((item) =>
                            postDatabaseData(section, item)
                        );

                        await Promise.all(uploadPromises);
                        await loadSectionData(section);
                        alert("Bulk upload completed successfully!");
                    } catch (error) {
                        alert("Error processing JSON file: " + error.message);
                    }
                };
                reader.readAsText(file);
            } catch (error) {
                alert("Error reading file: " + error.message);
            }
        }
    };

    input.click();
}

const userCookie = document.cookie
    .split("; ")
    .find((row) => row.startsWith("userInfo="));

if (!userCookie) {
    window.location.href = "index.html";
} else {
    const userInfo = JSON.parse(decodeURIComponent(userCookie.split("=")[1]));
    if (!userInfo.admin) {
        window.location.href = "index.html";
    }
}

window.handleAddNewBtn = handleAddNewBtn;
window.handleEditButton = handleEditButton;
window.handleDeleteButton = handleDeleteButton;
window.loadSectionData = loadSectionData;
window.handleBulkUpload = handleBulkUpload;
