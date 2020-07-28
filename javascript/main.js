document.addEventListener("DOMContentLoaded", ()=> {
    // Handling Login and Links




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