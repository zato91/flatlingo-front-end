let currentUserId = 4
const baseURL = "http://localhost:3000/"
let currentDeck
document.addEventListener("DOMContentLoaded", ()=> {
    // ********************* CardFlipping ************************
    const cardFronts = document.querySelectorAll(".flip-card-front");
    const cardBacks = document.querySelectorAll(".flip-card-back");
    const cardContainer = document.querySelector(".card-container");
    const divDeckContainer = document.getElementById('deck-container');
    // Adds Flip functions to both back and front of cards
    cardFronts.forEach(FlipFunction)
    cardBacks.forEach(BackFlipFunction)

    // *******************CREATE DECK MODAL***********************
    const createDeckButton = document.getElementById("create-deck-button");
    const createDeckModal = document.getElementById("create-deck-modal");
    const closeSpan = document.getElementsByClassName("close")[0];
    const newDeckForm = document.getElementById("new-deck-form");

    createDeckButton.addEventListener("click", (e)=>{
        toggleModalDisplay(createDeckModal);        
    })

    closeSpan.addEventListener("click", (e)=>{
        toggleModalDisplay(createDeckModal);
    })

    document.addEventListener("click", (e)=>{
        if(e.target == createDeckModal){
            toggleModalDisplay(createDeckModal, newDeckForm);
        }
    })
    // ************************* NEW DECK CREATION AND RENDERING **********************

    function renderDeck(deck){
        let divDeck = document.createElement('div');
        divDeck.classList += 'button buttonId';
        divDeck.dataset.id = deck.id;
        divDeck.dataset.user = deck.user_id;
        divDeck.innerText = deck.name;

        divDeckContainer.append(divDeck);
        divDeck.addEventListener("click", (e) => {
            renderCards(deck)
            currentDeck = deck.id;
            deckOptions(divDeck);
        })
    }


    function  deckOptions(divDeck){
        // console.dir(divDeck)
        let array = divDeckContainer.children;
        for (let i=0; i < array.length; i++){
            array[i].style.display = "none";
        }
        divDeck.style.display = "inline-block";
        let buttonBack = document.createElement('div');
        buttonBack.className = "button";
        buttonBack.innerText = "All Decks";
        divDeckContainer.append(buttonBack);

        let deleteDeckButton = document.createElement('div');
        deleteDeckButton.className = "button";
        deleteDeckButton.innerText = "Delete Deck";
        divDeckContainer.append(deleteDeckButton);

        buttonBack.addEventListener("click", (e) => {
            for (let i=0; i < array.length; i++){
                array[i].style.display = "inline-block";
            }
            buttonBack.remove();
            deleteDeckButton.remove();
        })



        deleteDeckButton.addEventListener("click", (e) => {
            // delete the deck, delete the deck button(which is divDeck that we have access to here),delete the deleteDeck button and make all of the rest of the buttons visible
            deleteDeck(divDeck)
            deleteDeckButton.remove()
            buttonBack.remove()
            cardContainer.innerHTML = ""
        })
    }

    const toggleDeckContainerDisplay = (divDeck) => {
        let array = divDeckContainer.children;
        for (let i=0; i < array.length; i++){
            if (array[i].style.display === "none"){
                array[i].style.display = "inline-block";
            }
            else{
                array[i].style.display = "none";
            }
            
            if (divDeck) {
                divDeck.style.display = "inline-block"
            }
        }
    }

    const deleteDeck = (divDeck) => {
        let deckConfig = {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json"
            }
        }

        fetch(`${baseURL}decks/${divDeck.dataset.id}`, deckConfig)
        .then(resp => resp.json())
        .then(emptyObj => {
            divDeck.remove()
            toggleDeckContainerDisplay()
        })
    }

    // ************************** ADDS FETCH REQUEST TO CREATE NEW DECK ***************
    newDeckForm.addEventListener("submit", (e)=>{
        e.preventDefault()
        let deckObj = {
            "name": e.target.name.value,
            "user_id": currentUserId
        }
        let deckConfig = {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json"
            },
            body: JSON.stringify(deckObj)
        }
        fetch(`${baseURL}decks`, deckConfig)
        .then(resp => resp.json())
        .then(deck => { 
            renderDeck(deck)
            newDeckForm.reset()
            createDeckModal.style.display = "none";
        })
    })

    //****************************** LOGIN MODAL STUFF**************************************
    const loginButton = document.getElementById("login-button");
    const loginModal = document.getElementById("login-modal");
    const closeLoginSpan = document.getElementsByClassName("close")[1];
    const loginForm = document.getElementById("login-form");
    const welcomeP = document.getElementById("welcome");
    const newCardForm = document.getElementById("new-card-form");

    loginButton.addEventListener("click", (e)=>{
        toggleModalDisplay(loginModal);       
    })

    closeLoginSpan.addEventListener("click", (e)=>{
        toggleModalDisplay(loginModal);
    })

    document.addEventListener("click", (e)=>{
        if(e.target == loginModal){
            toggleModalDisplay(loginModal, loginForm);
        }
    })

    loginForm.addEventListener("submit", (e)=>{
        e.preventDefault();
        fetch(`${baseURL}/users/login/${e.target.username.value}`)
        .then(resp => resp.json())
        .then(user => {
            user.decks.forEach(deck => { renderDeck(deck) });
            currentUserId = user.id;
            loginButton.style.display = "none";
            welcomeP.style.display = "inline-block";
            welcomeP.innerHTML = `Hello ${user.username}!<br>What would you like to learn today?`;
            toggleModalDisplay(loginModal, loginForm);
        })
    })

    // ********************** Render Cards Functions **************************************
    const renderCards = (deck) => {
        fetch(`${baseURL}decks/${deck.id}`)
        .then(resp => resp.json())
        .then(deck => { 
            cardContainer.innerHTML = ""
            deck.cards.forEach(renderCard)
            renderNewCard();
        })
    }

    const renderCard = (card) => {
        const cardDiv = document.createElement("div");
        cardDiv.className = "flip-card";
        const cardInner = document.createElement("div");
        cardInner.className = "flip-card-inner";
        cardDiv.appendChild(cardInner);
        const cardFront = document.createElement("div");
        cardFront.className = "flip-card-front";
        cardFront.innerHTML = `<h1>${card.front_word}</h1>`;
        cardInner.appendChild(cardFront);
        const cardBack = document.createElement("div");
        cardBack.className = "flip-card-back";
        
        cardBack.innerHTML = `<div class="card-back-text"><h1>${card.front_word}</h1>
        <p>Definition: ${card.back_definition}</p>
        <p>Notes: ${card.back_notes}</p>
        </div>
        <div class="card-back-buttons">
        <div data-id="${card.id}" data-function= "delete" class="button card-back-button">Delete</div>
        <div data-id="${card.id}" data-function= "edit" class="button card-back-button">Edit</div>
        </div>`

        cardInner.appendChild(cardBack);
        cardContainer.prepend(cardDiv);
        FlipFunction(cardFront);
        BackFlipFunction(cardBack);
        cardDiv.scrollIntoView()
    }

    function renderNewCard(){
        let divNewCard= document.createElement('div');
        divNewCard.id = "new-card";
        divNewCard.className = "flip-card";
        divNewCard.innerHTML = `
            <div id="new-card-inner" class="flip-card-inner">
            <div id="new-card-front" class="flip-card-front">
                    <h1>Create New Card</h1>
            </div>
                <div id="new-card-back" class="flip-card-back">
                </div>
            </div>`;
        cardContainer.appendChild(divNewCard);
    
        const newCardFront = document.getElementById("new-card-front");
        const newCardModal = document.getElementById("new-card-modal");
        const closeNewCardSpan = document.getElementsByClassName("close")[2];
        const newCardInner = document.getElementById("new-card-inner");
        FlipFunction(newCardFront)
        newCardFront.addEventListener("click", (e)=>{
            toggleModalDisplay(newCardModal);        
        })
    
        closeNewCardSpan.addEventListener("click", (e)=>{
            toggleModalDisplay(newCardModal);
                newCardInner.style.transform = "" 
        })
        document.addEventListener("click", (e)=>{
            if(e.target == newCardModal){
                newCardModal.style.display = "none"
                newCardForm.reset(); 
                newCardInner.style.transform = ""
            }
        })
    

    }

    newCardForm.addEventListener('submit', (e)=> {
        e.preventDefault();
        createCard(e.target);
    })
    
    function createCard(form){
        let cardOb = {
            "front_word": form.word.value,
            "back_definition": form.definition.value,
            "back_notes": form.notes.value,
            "understanding": false,
            "understanding_num": 0,
            "deck_id": currentDeck
        }
    
        const option = {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json"
            },
            body: JSON.stringify(cardOb)
        } 
        
        fetch(`${baseURL}cards`, option)
        .then(resp => resp.json())
        .then(card => { 
            renderCard(card);
            form.reset()
        })
    }
// ********************END OF DOM CONTENT LOADED**************************
})



//***************************Modal Display Stuff********************/
const toggleModalDisplay = (modal, form) => {
    if (modal.style.display === "block"){
        modal.style.display = "none";
    }
    else {
        modal.style.display = "block"
    }
    if (form){
        form.reset()
    }
}

// **********************CardFlipFunctions************************
const FlipFunction = (cardFront) => {
    cardFront.addEventListener("click", (e) => {
        //e.target.parentElement.style.transform = "rotateY(180deg)";
        e.target.closest(".flip-card-inner").style.transform = "rotateY(180deg)";
    })
}
const BackFlipFunction = (cardBack) => {
    cardBack.addEventListener("click", (e) => {
        if (e.target.dataset.function === "delete"){
            deleteCard(e.target)
        }
        else if (e.target.dataset.function === "edit"){
            editCardModalHandler(e.target)
        }
        else{
        e.target.closest(".flip-card-inner").style.transform = "";
        }
    })
}

const deleteCard = (button) => {
    let result = confirm("Are you sure you want to delete this card?")
    if(result){
        const configDelete = {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json"
            }
        } 
        
        fetch(`${baseURL}cards/${button.dataset.id}`, configDelete)
        .then(resp => resp.json())
        .then(emptyObj => { 
            console.log("You did it, you crazy son of a bitch, you did it!")
            button.closest(".flip-card").remove()
        })
    }
}