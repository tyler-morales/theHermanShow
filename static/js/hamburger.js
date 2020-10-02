const navButtons = [...document.querySelectorAll("button[aria-expanded]")];

    function toggleNav() {
        const expanded = this.getAttribute("aria-expanded") == "true" || false;
        this.setAttribute("aria-expanded", !expanded);
    }
    navButtons.map(button => {
        button.addEventListener("click", toggleNav);
    });

    //menu button
    // Look for .hamburger
    var hamburger = document.querySelector(".hamburger");
    // On click
    hamburger.addEventListener("click", function () {
        // Toggle class "is-active"
        hamburger.classList.toggle("is-active");
        // Do something else, like open/close menu
    });