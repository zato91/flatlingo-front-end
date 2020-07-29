document.addEventListener("DOMContentLoaded", ()=> {
    // Handling Login and Links
    const BASE_URL = "http://localhost:3000/";
    const User1_URL = `${BASE_URL}/users/1`;
    const DECK_URL = 'http://localhost:3000/decks/';
    const createButton =  document.querySelector('.button.create');

    // Fetching User Decks
    function fetchUserDeck(){
        fetch(User1_URL )
            .then(response => response.json())
            .then(user => user.decks.forEach(deck => { renderDeck(deck) }));

    }

    
    // Create Deck Div and render in web page
    function renderDeck(deck){
        const divDeckContainer = document.getElementById('deck-container');
       
        let divDeck = document.createElement('div');
        divDeck.classList += 'button buttonId';
        divDeck.dataset.id = deck.user_id;
        divDeck.innerText = deck.name;
        divDeckContainer.append(divDeck);
       
    }

    
    // Create new Deck
     function fetchCreateDeck(userInput){
        let id = document.querySelector('.buttonId').dataset.id
        id = parseInt(id, 10)
        

        const options = {
            method: "POST",
            headers: {
                "content-type": "application/json",
                "accept": "application/json",
            },
            body: JSON.stringify({
                name: userInput,
                user_id: id
            })           

         }
        
        fetch("http://localhost:3000/decks", options)
            .then(response => response.json())
            .then(deck => renderDeck(deck));
   
     }
    


    fetchUserDeck();

    // Handling card flipping
    const cardFronts = document.querySelectorAll(".flip-card-front");
    const cardBacks = document.querySelectorAll(".flip-card-back");
    

    cardFronts.forEach(FlipFunction)
    cardBacks.forEach(BackFlipFunction)

    // CREATE DECK MODAL ISH
    const createDeckButton = document.getElementById("create-deck-button");
    const createDeckModal = document.getElementById("create-deck-modal");
    const closeSpan = document.getElementsByClassName("close")[0];

    createDeckButton.addEventListener("click", (e)=>{
        createDeckModal.style.display = "block";

        const sumbitDeck = document.querySelector('.new-item-form')[1];

        sumbitDeck.addEventListener('click', (e)=>{
            // console.log(e)
        let userInput = document.querySelector('.new-item-form')[0].value;
        fetchCreateDeck(userInput);
            
        })

    })

    closeSpan.addEventListener("click", (e)=>{
        createDeckModal.style.display = "none";
    })
    document.addEventListener("click", (e)=>{
        if(e.target == createDeckModal){
            createDeckModal.style.display = "none";
        }
    })
})


// CardFlipFunctions
const FlipFunction = (cardFront) => {
    cardFront.addEventListener("click", (e) => {
        //e.target.parentElement.style.transform = "rotateY(180deg)";
        e.target.closest(".flip-card-inner").style.transform = "rotateY(180deg)";
    })
}
const BackFlipFunction = (cardBack) => {
    cardBack.addEventListener("click", (e) => {
        e.target.closest(".flip-card-inner").style.transform = "";
        
    })
}