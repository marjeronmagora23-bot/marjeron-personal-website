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
                title: "Marjeron Personal Website",
                text: "Check out my website!",
                url: window.location.href
            });

        } else {

            alert("Share is not supported on this browser");

        }

    };

}


// FIREBASE COMMENTS

const postComment = document.getElementById("postComment");
const commentInput = document.getElementById("commentInput");
const comments = document.getElementById("comments");


if (postComment) {

    postComment.onclick = function() {

        const text = commentInput.value;

        if (text.trim() !== "") {

            push(ref(window.database, "comments"), {
                message: text
            });

            commentInput.value = "";

        }

    };

}


if (comments) {

    onValue(ref(window.database, "comments"), function(snapshot) {

        comments.innerHTML = "";

        snapshot.forEach(function(child) {

            const p = document.createElement("p");

            p.textContent = "💬 " + child.val().message;

            comments.appendChild(p);

        });

    });

}