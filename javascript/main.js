document.addEventListener("DOMContentLoaded", ()=> {
    // Handling Login and Links
    const url = 'http://localhost:3000/users/1'

    function fetchUser(){
        fetch(url)
            .then(response => response.json())
            .then(user => user.decks.forEach(deck => { renderDeck(deck) }));

    }

    function renderDeck(deck){
        
        let divDeckContainer = document.getElementById('deck-container')

        let divDeck = document.createElement('div');
        divDeck.classList += 'button';
        divDeck.innerText = deck.name;
        divDeckContainer.append(divDeck);

    }




    fetchUser();
    // Handling card flipping


})