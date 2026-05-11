const bg = document.getElementById("DestBG");
const title = document.getElementById("InfoTitle");
const text = document.getElementById("InfoText");

const track = document.querySelector(".DTrack");
const carousel = document.querySelector(".DCarousel");

const CardTappedName = document.getElementById("DestinationCardName");
const CardTappedLabel = document.getElementById("DestinationCardLabel");
const CardTappedDesc = document.getElementById("CardDescription");
const CardLocation = document.getElementById("BrgyText");
const CardDistance = document.getElementById("DistanceText");

let cards = document.querySelectorAll(".Dcard");

const originalCards = [...cards];
const originals = [...cards];
let activeIndex = originalCards.length;

[...originals].reverse().forEach(card => {
    const clone = card.cloneNode(true);
    track.insertBefore(clone, track.firstChild);
});

originals.forEach(card => {
    const clone = card.cloneNode(true);
    track.appendChild(clone);
});

cards = document.querySelectorAll(".Dcard");

let isDragging = false;
let startX = 0;
let currentTranslate = 0;

const mapsBtn = document.querySelector(".DirectionsBtn");
let currentDestination = "";

function setActive(index) {
    cards.forEach((c, i) => {
        c.classList.remove("active");
        const dist = Math.abs(i - index);
        c.style.setProperty("--depth", dist <= 2 ? dist : 3);
    });

    if (cards[index]) {
        cards[index].classList.add("active");
    }

    const N = originalCards.length;
    const realIndex = ((index % N) + N) % N;
    const realCard = originalCards[realIndex];

    if (!realCard) return;

    bg.style.opacity = 0;

    setTimeout(() => {
        bg.style.backgroundImage = `url(${realCard.dataset.bg})`;
        bg.style.opacity = 1;
    }, 200);

    title.textContent = realCard.dataset.title;
    text.textContent = realCard.dataset.desc;

    CardTappedName.textContent = realCard.dataset.title;
    CardTappedLabel.textContent = realCard.dataset.label;
    CardTappedDesc.textContent = realCard.dataset.carddesc;
    CardLocation.textContent = realCard.dataset.brgy;
    CardDistance.textContent = realCard.dataset.distance;

    activeIndex = index;

    if (mapsBtn) {
        mapsBtn.href = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(realCard.dataset.title)}`;
        mapsBtn.target = "_blank";
    }
}

mapsBtn.addEventListener("click", (e) => {
    const destination = CardTappedName.textContent;

    if (!destination) return;

    window.open(
        `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(destination)}`,
        "_blank"
    );

    console.log("Maps button href:", mapsBtn.href);
});

function centerOnIndex(index, animate = true) {
    const cardWidth = cards[0].offsetWidth + 20;

    const move =
        (carousel.offsetWidth / 2) -
        (index * cardWidth + cardWidth / 2);

    track.style.transition = animate
        ? "transform 0.4s ease"
        : "none";

    track.style.transform = `translateX(${move}px)`;

    currentTranslate = move;

    setActive(index);
}

function handleLoop() {
    const len = originalCards.length;

    if (activeIndex >= len * 2) {
        activeIndex -= len;

        track.style.transition = "none";
        centerOnIndex(activeIndex, false);
    }

    if (activeIndex < len) {
        activeIndex += len;

        track.style.transition = "none";
        centerOnIndex(activeIndex, false);
    }
}

track.addEventListener("transitionend", () => {
    handleLoop();
});

function getClosestIndex() {
    const carouselRect = carousel.getBoundingClientRect();
    const center = carouselRect.left + carouselRect.width / 2;

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