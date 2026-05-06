const buttons = document.querySelectorAll("[data-carousel-button]")

buttons.forEach(button => {
    button.addEventListener("click", () => {
        const offset = button.dataset.carouselButton === "next" ? 1 : -1
        const slides = button.closest("[data-carousel]").querySelector("[data-slides]")

        const activeSlide = slides.querySelector("[data-active]")

        let newIndex = [...slides.children].indexOf(activeSlide) + offset

        if (newIndex < 0) newIndex = slides.children.length - 1  
        if (newIndex >= slides.children.length) newIndex = 0

        slides.children[newIndex].dataset.active = true
        delete activeSlide.dataset.active
    })
})

//Destinations Carousel

window.addEventListener("load", () => {
    centerOnIndex(0, false);
});

const bg = document.getElementById("DestBG");
const title = document.getElementById("InfoTitle");
const text = document.getElementById("InfoText");

const track = document.querySelector(".DTrack");
const carousel = document.querySelector(".DCarousel");

let cards = document.querySelectorAll(".Dcard");

const originalCards = [...cards];

originalCards.forEach(card => {
    const firstClone = card.cloneNode(true);
    const lastClone = card.cloneNode(true);

    track.appendChild(firstClone);
    track.insertBefore(lastClone, track.firstChild);
});

cards = document.querySelectorAll(".Dcard");

let isDragging = false;
let startX = 0;
let currentTranslate = 0;
let activeIndex = 0;

function setActive(index) {
    cards.forEach(c => c.classList.remove("active"));

    // mark ONLY the centered card
    if (cards[index]) {
        cards[index].classList.add("active");
    }

    const realIndex = index % originalCards.length;
    const realCard = originalCards[realIndex];

    bg.style.opacity = 0;

    setTimeout(() => {
        bg.style.backgroundImage = `url(${realCard.dataset.bg})`;
        bg.style.opacity = 1;
    }, 200);

    title.textContent = realCard.dataset.title;
    text.textContent = realCard.dataset.desc;

    activeIndex = index;
}

function centerOnIndex(index, animate = true) {
    const cardWidth = cards[0].offsetWidth + 20;

    const move =
        (carousel.offsetWidth / 2) -
        (index * cardWidth + cardWidth / 2);

    track.style.transition = animate ? "transform 0.4s ease" : "none";
    track.style.transform = `translateX(${move}px)`;

    currentTranslate = move;

    setActive(index);

    handleLoop(index);
}

function handleLoop(index) {
    const len = originalCards.length;

    // too far right (cloned start)
    if (index >= len * 2) {
        setTimeout(() => {
            track.style.transition = "none";
            centerOnIndex(index - len, false);
        }, 400);
    }

    // too far left (cloned end)
    if (index < len) {
        setTimeout(() => {
            track.style.transition = "none";
            centerOnIndex(index + len, false);
        }, 400);
    }
}

function getClosestIndex() {
    const center = carousel.getBoundingClientRect().width / 2;

    let closestIndex = 0;
    let closestDist = Infinity;

    cards.forEach((card, index) => {
        const rect = card.getBoundingClientRect();
        const cardCenter = rect.left + rect.width / 2;
        const dist = Math.abs(center - cardCenter);

        if (dist < closestDist) {
            closestDist = dist;
            closestIndex = index;
        }
    });

    return closestIndex;
}

/* CLICK */
cards.forEach((card, index) => {
    card.addEventListener("click", () => {
        centerOnIndex(index);
    });
});

/* INIT */
let offset = originalCards.length;

setActive(offset);
centerOnIndex(offset, false);

/* DRAG */
carousel.addEventListener("mousedown", startDrag);
carousel.addEventListener("mousemove", drag);
carousel.addEventListener("mouseup", endDrag);
carousel.addEventListener("mouseleave", endDrag);

carousel.addEventListener("touchstart", startDrag);
carousel.addEventListener("touchmove", drag);
carousel.addEventListener("touchend", endDrag);

function startDrag(e) {
    isDragging = true;
    startX = getX(e);

    track.style.transition = "none";
}

function drag(e) {
    if (!isDragging) return;

    const currentX = getX(e);
    const diff = currentX - startX;

    track.style.transition = "none";

    track.style.transform = `translateX(${currentTranslate + diff}px)`;
}

function endDrag() {
    if (!isDragging) return;
    isDragging = false;

    let closest = getClosestIndex();

    centerOnIndex(closest);
}

function getX(e) {
    return e.type.includes("mouse")
        ? e.pageX
        : e.touches[0].clientX;
}

//FESTIVAL
const steps = document.querySelectorAll(".Step");
const image = document.querySelector(".FestivalImage");
const ftitle = document.getElementById("festTitle");

const data = [
    {
        img: "ph1.jpg",
    },
    {
        img: "ph2.jpg",
    },
    {
        img: "ph3.jpg",
    },
    {
        img: "ph1.jpg",
    }
];

document.addEventListener("DOMContentLoaded", () => {

let findex = 0;
let interval;

function setActive(i) {
    findex = i;

    steps.forEach(s => s.classList.remove("active"));
    steps[i].classList.add("active");


    image.style.opacity = 0;

    setTimeout(() => {
        
        image.style.backgroundImage = `url(${data[i].img})`;

        image.style.opacity = 1;

        console.log("IMAGE:", data[i].img);
        console.log("STYLE:", image.style.backgroundImage);

    }, 250); 
}

steps.forEach(step => {
    step.addEventListener("click", () => {
        setActive(Number(step.dataset.index));
        resetAuto();
    });
});


function autoCycle() {
    interval = setInterval(() => {
        findex = (findex + 1) % data.length;
        setActive(findex);
    }, 5000);
}

function resetAuto() {
    clearInterval(interval);
    autoCycle();
}
    setActive(0);
    autoCycle();

});
console.log("steps:", steps);
console.log("step count:", steps.length);
