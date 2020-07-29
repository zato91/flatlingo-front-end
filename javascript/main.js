let currentUserId = 4
const baseURL = "http://localhost:3000/"
document.addEventListener("DOMContentLoaded", ()=> {
    // Handling card flipping
    const cardFronts = document.querySelectorAll(".flip-card-front");
    const cardBacks = document.querySelectorAll(".flip-card-back");
    

    cardFronts.forEach(FlipFunction)
    cardBacks.forEach(BackFlipFunction)

    // CREATE DECK MODAL ISH
    const createDeckButton = document.getElementById("create-deck-button");
    const createDeckModal = document.getElementById("create-deck-modal");
    const closeSpan = document.getElementsByClassName("close")[0];
    const newDeckForm = document.getElementById("new-deck-form");

    createDeckButton.addEventListener("click", (e)=>{
        createDeckModal.style.display = "block";
            
        })

    closeSpan.addEventListener("click", (e)=>{
        createDeckModal.style.display = "none";
    })
    document.addEventListener("click", (e)=>{
        if(e.target == createDeckModal){
            createDeckModal.style.display = "none";
            newDeckForm.reset()
        }
    })

    function renderDeck(deck){
        const divDeckContainer = document.getElementById('deck-container');
        let divDeck = document.createElement('div');
        divDeck.classList += 'button buttonId';
        divDeck.dataset.id = deck.id
        divDeck.dataset.user = deck.user_id
        divDeck.innerText = deck.name;
        divDeckContainer.append(divDeck);
    }

    newDeckForm.addEventListener("submit", (e)=>{
        e.preventDefault()
        // console.log(currentUserId)
        // console.dir(e.target.name.value)
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

    // LOGIN MODAL STUFF
    const loginButton = document.getElementById("login-button");
    const loginModal = document.getElementById("login-modal");
    const closeLoginSpan = document.getElementsByClassName("close")[1];
    const loginForm = document.getElementById("login-form");
    const welcomeP = document.getElementById("welcome")

    loginButton.addEventListener("click", (e)=>{
        loginModal.style.display = "block";
            
    })

    closeLoginSpan.addEventListener("click", (e)=>{
        loginModal.style.display = "none";
    })
    document.addEventListener("click", (e)=>{
        if(e.target == loginModal){
            loginModal.style.display = "none";
            loginForm.reset()
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
            loginModal.style.display = "none";
            loginForm.reset();
        })

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


