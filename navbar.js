const DropDown = document.getElementById("DropDown");
const SideBar = document.getElementById("SideBar");
const Overlay = document.getElementById("Overlay");

const Close = document.getElementById("Close");
    
function closeSidebar() {
    SideBar.classList.remove('Show');
    Overlay.classList.remove('Show');
}

    DropDown.addEventListener('click', function() {
        SideBar.classList.add('Show');
        Overlay.classList.add('Show');
});

    Close.addEventListener('click', closeSidebar);

const currentPage = window.location.pathname.split("/").pop();
const links = document.querySelectorAll("nav a");
const mobilelinks = document.querySelectorAll(".Sidebar_Container a");

links.forEach(link => {
    if (link.getAttribute("href") === currentPage) {
        link.classList.add("Show");
    }
});

mobilelinks.forEach(link => {
    link.addEventListener("click", () => {
        closeSidebar();
    });
});

const SCROLL_THRESHOLD = 100;

const MHeader = document.getElementById("Mobile_Navbar");
const DHeader = document.getElementById("Navbar");

document.addEventListener('scroll', () => {
    const top = document.documentElement.scrollTop;
    if (top > SCROLL_THRESHOLD) {
        MHeader.classList.add("scrolling");
        DHeader.classList.add("scrolling");
    } else {
        MHeader.classList.remove("scrolling");
        DHeader.classList.remove("scrolling");
    }
})