const FestiveCard = document.querySelectorAll(".Card");
const DisplayCard = document.getElementById("DisplayCard");
const DisplayCardContainer = document.getElementById("ImageTapped");

const BackBtn = document.getElementById("Back");

BackBtn.addEventListener('click', function() { 
    DisplayCardContainer.classList.remove("Show"); 
});

FestiveCard.forEach(card => {
    card.addEventListener('click', function() {
        const bg = window.getComputedStyle(card).backgroundImage;
        DisplayCard.style.backgroundImage = bg;

        DisplayCardContainer.classList.add("Show");
    });
});

document.addEventListener("DOMContentLoaded", () => {

const learnMoreBtn = document.getElementById("Button");
const displayWrapper = document.getElementById("DestinationTapped");
const Header = document.getElementById("DisplayCardBG");
const BackBtn = document.getElementById("DBack");

BackBtn.addEventListener('click', function() { 
    displayWrapper.classList.remove("Show"); 
});

learnMoreBtn.addEventListener("click", (e) => {
    e.preventDefault();

    const activeCard = document.querySelector(".Dcard.active");

    if (!activeCard) return;

    const img = activeCard.dataset.bg;

    Header.style.backgroundImage = `url(${img})`;

    displayWrapper.classList.add("Show");
});

});