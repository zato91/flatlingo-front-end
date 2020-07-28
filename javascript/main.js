document.addEventListener("DOMContentLoaded", ()=> {
    // Handling Login and Links




    // // Handling card flipping
    const cardFronts = document.querySelectorAll(".flip-card-front");
    const cardBacks = document.querySelectorAll(".flip-card-back");

    cardFronts.forEach(FlipFunction)
    cardBacks.forEach(BackFlipFunction)



        // document.addEventListener("click", (e) => {
        //     if (e.target.className == "flip-card-front"){
        //         e.target.parentElement";
        //     }
        //     else if (e.target.className == "flip-card-back"){
        //         e.target.parentElement.style.transform = ""
        //     }
        //     else {
        //         console.log(e.target)
        //     }
            
        // })
})

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