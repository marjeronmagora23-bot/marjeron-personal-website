alert("Script is working");
console.log("Script loaded");
import { ref, push, onValue } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-database.js";


// PETALS

const petals = document.getElementById("petals");

function createPetal() {

    if (!petals) return;

    const petal = document.createElement("div");

    petal.classList.add("petal");

    petal.style.left = Math.random() * window.innerWidth + "px";

    petal.style.animationDuration = (5 + Math.random() * 5) + "s";

    petal.style.opacity = Math.random();

    petal.style.transform = `scale(${0.5 + Math.random()})`;

    petals.appendChild(petal);

    setTimeout(() => {
        petal.remove();
    }, 10000);

}

setInterval(createPetal, 300);


// LIKE BUTTON

const likeBtn = document.getElementById("likeBtn");
const likeText = document.getElementById("likeText");

if (likeBtn) {

    let liked = false;

    likeBtn.onclick = function() {

        liked = !liked;

        if (liked) {
            likeText.textContent = "Liked";
            likeBtn.style.color = "red";
        } else {
            likeText.textContent = "Like";
            likeBtn.style.color = "black";
        }

    };

}


// SHARE BUTTON

const shareBtn = document.getElementById("shareBtn");

if (shareBtn) {

    shareBtn.onclick = function() {

        if (navigator.share) {

            navigator.share({
                title: "Yanniee Fan Website",
                text: "Check out this video!",
                url: window.location.href
            });

        } else {

            alert("Share is not supported on this browser");

        }

    };

}


// FIREBASE COMMENTS

#comments p {
    color: white;
    background: #111827;
    padding: 10px;
    border-radius: 10px;
    margin: 5px;
}