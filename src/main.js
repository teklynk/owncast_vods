import './assets/scss/styles.scss'
import 'bootstrap'

window.main = true;

window.addEventListener('scroll', function () {
    let topNav = document.querySelectorAll("#topNav");
    //Define height of Navbar or scroll threshold
    if (window.scrollY >= 40) {
        topNav[0].classList.add("nav-shadow");
    } else {
        topNav[0].classList.remove("nav-shadow");
    }
});