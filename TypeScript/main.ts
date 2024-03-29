

const headerSearchForm = document.querySelector("form")
const userSearch = document.querySelector("input") as HTMLInputElement
const renderData = document.querySelector("#renderData")
const builderPageBtn = document.querySelector("#builderPageBtn") as HTMLElement
const backToListBtn = document.querySelector("#backToListBtn") as HTMLElement
const formation = document.querySelector("#formation") as HTMLElement
const selectedPlayersArray: Array<chosenCard> = []
const drawarOfPlayer = document.getElementById("allChosenCards")
const PlayerSelectedCounter = document.getElementById("PlayerSelectedCounter")
let selectedCard: HTMLElement















const dragStart = (e:any) => {

}
const dragover = (e: any) => {

	
	e.preventDefault();
	//e.stopPropagation()
}

const drop = (e:any) => {


	if (e.target.classList.contains('positions')) {
		selectedCard.classList.remove("choesen-player-card")
		selectedCard.classList.add("miniPlayerForBuilder")
		e.target.prepend(selectedCard)
	} else {
		selectedCard.classList.remove("miniPlayerForBuilder")
		selectedCard.classList.add("choesen-player-card")
		drawarOfPlayer?.appendChild(selectedCard)
	}
	
}



const positions: NodeList = document.querySelectorAll(".positions");
positions.forEach((element) => {
	(element as HTMLElement).style.width = "150px";
	(element as HTMLElement).style.height = "150px";
});


positions.forEach((element) => {
	element.addEventListener("dragstart", dragStart)
	element.addEventListener("dragover", dragover)
	element.addEventListener("drop", drop)
})


drawarOfPlayer?.addEventListener("dragstart", dragStart)
drawarOfPlayer?.addEventListener("dragover", dragover)
drawarOfPlayer?.addEventListener("drop", drop)






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
	PlayerSelectedCounter!.innerText = (`${selectedPlayersArray.length}`) as string
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
}


interface chosenCard{
	fullName?: string;
	cardImageUrl?: string;

}


function createSelectedPlayerCard(playerCard: chosenCard):HTMLDivElement {

	const card = document.createElement("div")
	card.classList.add("choesen-player-card")	
	const playerName = document.createElement("p")
	playerName.innerText = playerCard.fullName!
	const cardImage = document.createElement("img")
	cardImage.src = playerCard.cardImageUrl!
	const deleteBtn = document.createElement("div")
	deleteBtn.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" width="15px" height="15px" viewBox="0 0 448 512"><!--!Font Awesome Free 6.5.1 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2024 Fonticons, Inc.--><path d="M135.2 17.7L128 32H32C14.3 32 0 46.3 0 64S14.3 96 32 96H416c17.7 0 32-14.3 32-32s-14.3-32-32-32H320l-7.2-14.3C307.4 6.8 296.3 0 284.2 0H163.8c-12.1 0-23.2 6.8-28.6 17.7zM416 128H32L53.2 467c1.6 25.3 22.6 45 47.9 45H346.9c25.3 0 46.3-19.7 47.9-45L416 128z"/></svg>'
	deleteBtn.classList.add("xSymbolForDeleteCard")
	deleteBtn.addEventListener("click", () => {
		const indexToDelete:number = selectedPlayersArray.findIndex((player) =>player === playerCard)
		selectedPlayersArray.splice(indexToDelete, 1)
		card.remove()
		
		
	})

	card.setAttribute("draggable","true")
	card.addEventListener("dragstart", (ev) => {

		
		//ev.stopPropagation();
		selectedCard = card
	})

	

	card.appendChild(deleteBtn)
	card.appendChild(cardImage)
	card.appendChild(playerName)


	return card
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
		

			if(selectedPlayersArray.find((player: chosenCard) =>
				player.fullName === chosenPlayer.fullName && player.cardImageUrl === chosenPlayer.cardImageUrl)) {
				
				alert("Already Chosen Same Rarity Of This Player")
				return
				
				}
			
			
			selectedPlayersArray.push(chosenPlayer)
			PlayerSelectedCounter!.innerText = (`${selectedPlayersArray.length}`) as string
			document.getElementById("allChosenCards")?.appendChild(createSelectedPlayerCard(chosenPlayer))
			
			
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
		return
	}

	renderTableOfArray(playersArray.data)


}