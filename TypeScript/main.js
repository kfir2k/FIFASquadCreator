"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
console.log("test");
const headerSearchForm = document.querySelector("form");
const userSearch = document.querySelector("input");
const renderData = document.querySelector("#renderData");
headerSearchForm === null || headerSearchForm === void 0 ? void 0 : headerSearchForm.addEventListener("submit", (ev) => {
    ev.preventDefault();
    initRender();
    const nameOfPlayer = userSearch.value;
    userSearch.value = "";
    controller(nameOfPlayer);
    return;
});
//const apiKey: string = "1dfa96a8-50b2-40c6-b355-ed01cc5aed96";
//const headers: object = {
//	headers: {
//		'X-AUTH-TOKEN': apiKey
//	}
//}
function getPlayerByName(name) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            //const response = await fetch(`https://www.futbin.com/24/builderSearch?term={}&playerName=${name}&chem3=sub&chem0=sub&clubs=&leagues=&nations=&platform=ps4&builder_type=old&page=1`)
            const response = yield fetch(`https://www.fut.gg/api/fut/24/player-items/?name=${name}`);
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            const data = yield response.json();
            console.log(data); // Process the JSON data here
            return data;
        }
        catch (error) {
            console.error('There was a problem with your fetch operation:', error);
        }
    });
}
function tableDataCreator(string, rowName) {
    const td = document.createElement("td");
    td.innerText = string;
    rowName.appendChild(td);
}
function initRender() {
    if (renderData !== null && renderData !== undefined) {
        renderData.innerHTML = "";
    }
}
function renderTableOfArray(playersArray) {
    for (let i of playersArray) {
        const tableRow = document.createElement("tr");
        tableDataCreator(`${i.firstName} ${i.lastName}`, tableRow);
        tableDataCreator(`${i.overall}`, tableRow);
        tableDataCreator(`${i.rarityName}`, tableRow);
        const playerCard = document.createElement("img");
        const tdForImage = document.createElement("td");
        if (i.cardImageUrl) {
            playerCard.src = i.cardImageUrl;
            playerCard.classList.add("player-card");
        }
        else {
            console.error("Card image URL is undefined for player:", i);
        }
        tdForImage.appendChild(playerCard);
        tableRow.appendChild(tdForImage);
        tableRow.addEventListener("click", () => {
            console.log(i);
        });
        renderData === null || renderData === void 0 ? void 0 : renderData.appendChild(tableRow);
    }
}
function delay(milliseconds) {
    return new Promise(resolve => {
        setTimeout(resolve, milliseconds);
    });
}
function controller(nameOfPlayer) {
    return __awaiter(this, void 0, void 0, function* () {
        let playersArray = yield getPlayerByName(nameOfPlayer);
        if (playersArray === undefined) {
            console.log("Issue");
            return;
        }
        renderTableOfArray(playersArray.data);
    });
}
