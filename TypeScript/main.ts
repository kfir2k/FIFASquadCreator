console.log("test");

const headerSearchForm = document.querySelector("form")
const userSearch = document.querySelector("input") as HTMLInputElement
const renderData = document.querySelector("#renderData")
const builderPageBtn = document.querySelector("#builderPageBtn") as HTMLElement
const backToListBtn = document.querySelector("#backToListBtn") as HTMLElement
const formation = document.querySelector("#formation") as HTMLElement
const selectedPlayersArray:Array<chosenCard> = []



console.log(backToListBtn);


builderPageBtn?.addEventListener("click", () => {
	const mainElement = document.querySelector("main");
	if (mainElement !== null && mainElement !== undefined) {
		mainElement.style.display = "none";
	}
	if (formation !== null && formation !== undefined) {
		formation.style.display = "block";
	}
})


backToListBtn?.addEventListener("click", () => {
	const mainElement = document.querySelector("main");
	if (mainElement !== null && mainElement !== undefined) {
		mainElement.style.display = "block";
	}

	if (formation !== null && formation !== undefined) {
		formation.style.display = "none";
	}

})





headerSearchForm?.addEventListener("submit",(ev) => {
	ev.preventDefault()
	initRender()
	const nameOfPlayer = userSearch.value
	
	userSearch.value = ""
	controller(nameOfPlayer)
	return

})

















async function getPlayerByName(name: string) {

	try {
		//const response = await fetch(`https://www.futbin.com/24/builderSearch?term={}&playerName=${name}&chem3=sub&chem0=sub&clubs=&leagues=&nations=&platform=ps4&builder_type=old&page=1`)
		const response = await fetch(`https://www.fut.gg/api/fut/24/player-items/?name=${name}`)
		if (!response.ok) {
			throw new Error('Network response was not ok');
		}

		const data = await response.json();
		console.log(data); // Process the JSON data here

		return data


	} catch (error) {
		console.error('There was a problem with your fetch operation:', error);
	}

	

}



interface playerProperties {
	
	firstName?: string;
	lastName?: string;
	overall?: number;
	cardImageUrl?: string;
	rarityImageUrl?: string;
	rarityName?: string;

	// Define other properties you expect here
}


interface chosenCard{
	fullName?: string;
	cardImageUrl?: string;

}


function createSelectedPlayerCard(playerCard:chosenCard) {

	const card = document.createElement("div")
	card.classList.add("choesen-player-card")	
	const playerName = document.createElement("p")
	playerName.innerText = playerCard.fullName
	const cardImage = document.createElement("img")


	
	card.appendChild(cardImage)
	card.appendChild(playerName)
}





function tableDataCreator(string: string, rowName:HTMLTableRowElement) {
	
	const td = document.createElement("td")
	td.innerText = string;
	rowName.appendChild(td)

}


function initRender(){
	if (renderData !== null && renderData !== undefined) {
		renderData.innerHTML = ""
	} 
}





function renderTableOfArray(playersArray: Array<playerProperties>) {
	
	for (let i of playersArray) {
		
		
		const tableRow = document.createElement("tr");
		tableDataCreator(`${i.firstName} ${i.lastName}`, tableRow)
		tableDataCreator(`${i.overall}`, tableRow)
		tableDataCreator(`${i.rarityName}`,tableRow)
		const playerCard = document.createElement("img") as HTMLImageElement;
		const tdForImage = document.createElement("td");

		if (i.cardImageUrl) {
			playerCard.src = i.cardImageUrl;
			playerCard.classList.add("player-card")


		} else {
			console.error("Card image URL is undefined for player:", i);
		}
		tdForImage.appendChild(playerCard)
		tableRow.appendChild(tdForImage)
		

		

		tableRow.addEventListener("click", () => {
			
			const chosenPlayer:chosenCard = {
				fullName: `${i.firstName} ${i.lastName}`,
				cardImageUrl: i.cardImageUrl

			}
			console.log(chosenPlayer);
			selectedPlayersArray.push(chosenPlayer)
			console.log(selectedPlayersArray);
			
			
		})



		renderData?.appendChild(tableRow)
		
	}












}

function delay(milliseconds: number): Promise<PromiseConstructor> {
	return new Promise(resolve => {
		setTimeout(resolve, milliseconds);
	});
}


async function controller(nameOfPlayer: string) {

	let playersArray = await getPlayerByName(nameOfPlayer)
	if (playersArray === undefined) {
		console.log("Issue");
		return
	}

	renderTableOfArray(playersArray.data)


}