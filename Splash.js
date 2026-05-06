let splash = document.getElementById('Splash');

    window.addEventListener('DOMContentLoaded', () => {
        //splashShown is key and checks if the item is there, true is the value, acts as boolean
    if (!sessionStorage.getItem("splashShown")) {
        sessionStorage.setItem("splashShown", "true"); 

        // Animate splash out
        setTimeout(() => {
            splash.style.left = "100%"; 
        }, 2300);

    } else {
        splash.style.opacity = "0";
        splash.style.display = "none";
    }
});