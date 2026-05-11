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

//PRODUCTS
document.addEventListener("DOMContentLoaded", () => {

    const data = {
        weaving: {
            img: "images/Weaving1.jpg",
            headimg: "images/Weaving2.jpg",
            title: "Threads of Tradition",
            subtitle: "📍 Barangay Mabusao • Regador • San Jose, Ibajay, Aklan",
            text1: "Weaving in Ibajay is a cultural practice shaped by generations of craftsmanship and tradition. Using nito vines and abaca fibers, artisans create functional and decorative products that reflect skill, patience, and creativity",
            text2: "Rooted in local heritage, each woven piece highlights the community's connection to nature and sustainable living. The handcrafted works preserve traditional techniques while continuing to serve everyday use."
        },

        pottery: {
            img: "images/Pottery2.jpg",
            headimg: "images/Pottery1.jpg",
            title: "Nature To Craft",
            subtitle: "📍 Barangay Coloncolong, Ibajay, Aklan",
            text1: "From forest vines and plant fibers to hand-shaped clay, explore Ibajay’s rich tradition of nito, abaca, and pottery. Each creation embodies sustainability, heritage, and the skill of dedicated artisans.",
            text2: "Rooted in Ibajay’s close relationship with its natural environment, local artisans turn raw materials like forest vines, plant fibers, and clay into meaningful creations. From nito weaving and abaca processing to handmade pottery, these crafts reflect a lifestyle shaped by sustainability, creativity, and respect for the land that sustains the community."
        }
    };

    function updateContent(type) {

        const d = data[type];

        const img = document.getElementById("productImg");
        const headimg = document.getElementById("HeaderIMG");
        const title = document.getElementById("productTitle");
        const subtitle = document.getElementById("productSubTitle");
        const text1 = document.getElementById("productText1");
        const text2 = document.getElementById("productText2");

        if (!img || !title || !text1 || !text2) {
            console.warn("Missing HTML elements");
            return;
        }

        img.src = d.img;
        headimg.style.backgroundImage = `
            linear-gradient(rgba(0,0,0,0.6), rgba(0,0,0,0.6)),
            url(${d.headimg})
        `;
        title.textContent = d.title;
        subtitle.textContent = d.subtitle;
        text1.textContent = d.text1;
        text2.textContent = d.text2;
    }

    const weavingTab = document.querySelector('[data-tab="weaving"]');
    const potteryTab = document.querySelector('[data-tab="pottery"]');

    window.moveLeft = function () {

        const box = document.querySelector(".Weaving");

        box.classList.remove("slide-right");
        box.classList.add("slide-left");

        setTimeout(() => {
            updateContent("weaving");
        }, 300);

        potteryTab.classList.remove("active");
        weavingTab.classList.add("active");
    };

    window.moveRight = function () {

        const box = document.querySelector(".Weaving");

        box.classList.remove("slide-left");
        box.classList.add("slide-right");

        setTimeout(() => {
            updateContent("pottery");
        }, 300);

        weavingTab.classList.remove("active");
        potteryTab.classList.add("active");
    };

});

//FESTIVAL
const steps = document.querySelectorAll(".Step");
const image = document.querySelector(".FestivalImage");
const ftitle = document.getElementById("festTitle");

const data = [
    {
        img: "images/FStreetDancing.jpg",
    },
    {
        img: "images/FDrums.jpg",
    },
    {
        img: "images/FReligious.jpg",
    },
    {
        img: "images/FCommunity.jpg",
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

