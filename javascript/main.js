document.addEventListener("DOMContentLoaded", ()=> {
    // Handling Login and Links
    const url = 'http://localhost:3000/users/1';
    const createButton =  document.querySelector('.button.create');

    function fetchUser(){
        fetch(url)
            .then(response => response.json())
            .then(user => user.decks.forEach(deck => { renderDeck(deck) }));

    }

    function renderDeck(deck){
        const divDeckContainer = document.getElementById('deck-container')
        let divDeck = document.createElement('div');
        divDeck.classList += 'button';
        divDeck.innerText = deck.name;
        divDeckContainer.append(divDeck);



    }

    function deckCreation(){
        // const bottomContainer = document.getElementById('bottom-container');

        // let form = document.createElement('FORM');
        // bottomContainer.append(form);

        // let nameInput = document.createElement('INPUT');
        // nameInput.setAttribute("type", "text");
        // form.append(nameInput);

        // let submitCreate = document.createElement('input');
        // submitCreate.setAttribute("type", "submit");
        // form.append(submitCreate);
        // form.innerHTML =
        // `<input id="deckName" placeholder= "name...">
        // <input id=type="submit" value="Submit">`
        

        let deckValue = document.querySelector('#deckName').innerText

        

    }

    createButton.addEventListener('click', (e)=>{
        deckCreation();
      
    });
    
        // const options = {
        //     method: "PATCH",
        //     headers: {
        //         "content-type": "application/json",
        //         "accept": "application/json",
        //     },
        //     body: JSON.stringify({name, breed, sex})           

        // }


        // fetch(url, options)
        //     .then(response => response.json())
        //     .then(user => user.decks.forEach(deck => { renderDeck(deck) }));

    

    




    fetchUser();
    // Handling card flipping


})