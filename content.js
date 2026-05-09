//NAVBAR
const navbars = document.querySelectorAll(".static");

window.addEventListener("scroll", () => {
    navbars.forEach(navbar => {
        if (window.scrollY > 40) {
            navbar.classList.add("scrolled");
        } else {
            navbar.classList.remove("scrolled");
        }
    });
});

//LOADING SCREEN
window.addEventListener("load", () => {
    const loader = document.getElementById("loader");

    setTimeout(() => {
        loader.classList.add("hidden");
    }, 900); 
});

//HOMEPAGE
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

const scrolldown = document.getElementById("ScrollDownBtn");

console.log("Scroll button:", scrolldown);

scrolldown?.addEventListener("click", () => {
    console.log("clicked");
    document.getElementById("Destinations")
        ?.scrollIntoView({ behavior: "smooth" });
});


const logobtn = document.getElementById("logodesk");
const mlogobtn = document.getElementById("logo");

logobtn?.addEventListener("click", () => {
    document.getElementById("Home")
        ?.scrollIntoView({ behavior: "smooth" });
});

mlogobtn?.addEventListener("click", () => {
    document.getElementById("Home")
        ?.scrollIntoView({ behavior: "smooth" });
});

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

//ABOUT US
document.addEventListener("DOMContentLoaded", () => {

    const tabs = document.querySelectorAll(".tab");
    const contents = document.querySelectorAll(".tab-content");

    function setActiveTab(tab) {
        const target = tab.dataset.tab;

        tabs.forEach(t => t.classList.remove("active"));
        contents.forEach(c => c.classList.remove("active"));

        tab.classList.add("active");

        const activeContent = document.getElementById(target);
        if (activeContent) {
            activeContent.classList.add("active");
        }
    }

    tabs.forEach(tab => {
        tab.addEventListener("click", () => {
            setActiveTab(tab);
        });
    });

    if (tabs.length > 0) {
        setActiveTab(tabs[0]);
    }

});

//RENDERING
const reveals = document.querySelectorAll(".reveal");

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {

        if (entry.isIntersecting) {
            entry.target.classList.add("show");
        }

    });
}, {
    threshold: 0.25
});

reveals.forEach(el => observer.observe(el));