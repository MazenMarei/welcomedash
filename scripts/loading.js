window.addEventListener("load" , async ()=> fadeOutEffect())
function fadeOutEffect() {
var fadeTarget = document.getElementsByClassName("loadingcontainer")[0];
var fadeEffect = setInterval(function () {
if (!fadeTarget.style.opacity) {
fadeTarget.style.opacity = 1;
}
if (fadeTarget.style.opacity > 0) {
fadeTarget.style.opacity -= 0.1;
} else {
clearInterval(fadeEffect);
fadeTarget.style.display = "none"
fadeInEffect()
}
}, 100);
}
function fadeInEffect() {
let el =  document.getElementsByClassName("Welcomecontainer")[0];
el.style.opacity = 0;
let time = 450
var last = +new Date();
el.style.display = "block"
var tick = function() {
el.style.opacity = +el.style.opacity + (new Date() - last) / time;
last = +new Date();

if (+el.style.opacity < 1) {
(window.requestAnimationFrame && requestAnimationFrame(tick)) || setTimeout(tick, 16);
}
};

tick();
}

