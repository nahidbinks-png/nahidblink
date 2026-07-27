
// Smooth Scrolling and Interactive Alert on Load
document.addEventListener("DOMContentLoaded", function() {
    console.log("BLACKPINK Fan Hub Loaded Successfully!");

    // Interactive greeting alert on clicking the logo
    const logo = document.querySelector('.logo');
    logo.style.cursor = "pointer";
    logo.addEventListener('click', function() {
        alert("BLACKPINK in your area! 🖤💖");
    });
});
