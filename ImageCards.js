const Card = document.querySelectorAll(".Card");
const DisplayCard = document.getElementById("DisplayCard");
const DisplayCardContainer = document.getElementById("ImageTapped");
const AboutUsImg = document.getElementById("AboutUsImg");
const BackBtn = document.getElementById("Back");

BackBtn.addEventListener('click', function() { 
    DisplayCardContainer.classList.remove("Show"); 
});

AboutUsImg.addEventListener('click', function() { 
    DisplayCard.style.backgroundImage = `url(${AboutUsImg.src})`;

    DisplayCardContainer.classList.add("Show");
});

Card.forEach(card => {
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
    document.body.classList.remove("modal-open");
});

learnMoreBtn.addEventListener("click", (e) => {
    e.preventDefault();
    const activeCard = document.querySelector(".Dcard.active");

    if (!activeCard) return;

    const img = activeCard.dataset.bg;

    Header.style.backgroundImage = `url(${img})`;

    displayWrapper.classList.add("Show");
    document.body.classList.add("modal-open");
});

});