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
const builderPageBtn = document.querySelector("#builderPageBtn");
const backToListBtn = document.querySelector("#backToListBtn");
const formation = document.querySelector("#formation");
const selectedPlayersArray = [];
console.log(backToListBtn);
builderPageBtn === null || builderPageBtn === void 0 ? void 0 : builderPageBtn.addEventListener("click", () => {
    const mainElement = document.querySelector("main");
    if (mainElement !== null && mainElement !== undefined) {
        mainElement.style.display = "none";
    }
    if (formation !== null && formation !== undefined) {
        formation.style.display = "block";
    }
});
backToListBtn === null || backToListBtn === void 0 ? void 0 : backToListBtn.addEventListener("click", () => {
    const mainElement = document.querySelector("main");
    if (mainElement !== null && mainElement !== undefined) {
        mainElement.style.display = "block";
    }
    if (formation !== null && formation !== undefined) {
        formation.style.display = "none";
    }
});
headerSearchForm === null || headerSearchForm === void 0 ? void 0 : headerSearchForm.addEventListener("submit", (ev) => {
    ev.preventDefault();
    initRender();
    const nameOfPlayer = userSearch.value;
    userSearch.value = "";
    controller(nameOfPlayer);
    return;
});
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
function createSelectedPlayerCard(playerCard) {
    const card = document.createElement("div");
    card.classList.add("choesen-player-card");
    const playerName = document.createElement("p");
    playerName.innerText = playerCard.fullName;
    const cardImage = document.createElement("img");
    card.appendChild(cardImage);
    card.appendChild(playerName);
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
            const chosenPlayer = {
                fullName: `${i.firstName} ${i.lastName}`,
                cardImageUrl: i.cardImageUrl
            };
            console.log(chosenPlayer);
            selectedPlayersArray.push(chosenPlayer);
            console.log(selectedPlayersArray);
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
