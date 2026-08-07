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
// VIDEO PLAYLIST

const videos = [
    "video.mp4",
    "video2.mp4",
    "video3.mp4",
    "video4.mp4",
    "video5.mp4"
];

let currentVideo = 0;

const videoPlayer = document.getElementById("mainVideo");
const source = videoPlayer ? videoPlayer.querySelector("source") : null;

const nextBtn = document.getElementById("nextVideo");
const prevBtn = document.getElementById("prevVideo");

function loadVideo(index) {
    if (!videoPlayer || !source) return;

    source.src = videos[index];
    videoPlayer.load();
}

if (nextBtn) {
    nextBtn.onclick = () => {
        currentVideo = (currentVideo + 1) % videos.length;
        loadVideo(currentVideo);
    };
}

if (prevBtn) {
    prevBtn.onclick = () => {
        currentVideo = (currentVideo - 1 + videos.length) % videos.length;
        loadVideo(currentVideo);
    };
}
// TYPING EFFECT

const typing = document.getElementById("typing");

const text = "💻 BSIT Student | Future Developer | Lover Boy 😎";

let i = 0;

function typeWriter() {

    if (!typing) return;

    if (i < text.length) {
        typing.innerHTML += text.charAt(i);
        i++;
        setTimeout(typeWriter, 70);
    }

}

typeWriter();

// =====================
// GALLERY IMAGE VIEWER
// =====================

const galleryImages = document.querySelectorAll(".gallery img");
const imageViewer = document.getElementById("imageViewer");
const viewerImage = document.getElementById("viewerImage");
const closeViewer = document.getElementById("closeViewer");

galleryImages.forEach(img => {

    img.addEventListener("click", () => {

        imageViewer.style.display = "flex";
viewerImage.src = img.src;

setTimeout(() => {
    viewerImage.style.transform = "scale(1)";
    viewerImage.style.opacity = "1";
}, 10);

    });

});

if (closeViewer) {

    closeViewer.addEventListener("click", () => {

        viewerImage.style.transform = "scale(0.8)";
viewerImage.style.opacity = "0";

setTimeout(() => {
    imageViewer.style.display = "none";
}, 250);

    });

}

if (imageViewer) {

    imageViewer.addEventListener("click", (e) => {

        if (e.target === imageViewer) {

            viewerImage.style.transform = "scale(0.8)";
viewerImage.style.opacity = "0";

setTimeout(() => {
    imageViewer.style.display = "none";
}, 250);

        }

    });

}