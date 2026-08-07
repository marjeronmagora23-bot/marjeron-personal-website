console.log("Script loaded");

import { ref, push, onValue } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-database.js";



   // CYBER PARTICLES

const particles = document.getElementById("particles");

function createParticle(){

    if(!particles) return;

    const particle = document.createElement("div");

    particle.className = "particle";

    particle.style.left = Math.random()*100 + "%";

    particle.style.animationDuration = (4 + Math.random()*5) + "s";

    particle.style.opacity = Math.random();

    particle.style.transform = `scale(${0.5 + Math.random()*2})`;

    particles.appendChild(particle);

    setTimeout(()=>{
        particle.remove();
    },9000);

}

setInterval(createParticle,120);


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
// CYBER CURSOR

const cursorGlow = document.getElementById("cursorGlow");

document.addEventListener("mousemove",(e)=>{

    if(!cursorGlow) return;

    cursorGlow.style.left = e.clientX + "px";
    cursorGlow.style.top = e.clientY + "px";

});
// LOADING SCREEN

window.addEventListener("load",()=>{

    setTimeout(()=>{

        const loading=document.getElementById("loading-screen");

        if(loading){

            loading.style.opacity="0";
            loading.style.transition="0.6s";

            setTimeout(()=>{
                loading.remove();
            },600);

        }

    },2500);

});
// SCROLL ANIMATION

const hiddenElements = document.querySelectorAll("section");

const observer = new IntersectionObserver((entries) => {

    entries.forEach((entry) => {

        if (entry.isIntersecting) {
            entry.target.classList.add("show");
        }

    });

});

hiddenElements.forEach((el) => {
    el.classList.add("hidden");
    observer.observe(el);
});
// DARK/LIGHT MODE

const themeToggle = document.getElementById("themeToggle");

if(themeToggle){

    themeToggle.onclick = ()=>{

        document.body.classList.toggle("light-mode");

        if(document.body.classList.contains("light-mode")){
            themeToggle.textContent="🌞";
        }else{
            themeToggle.textContent="🌙";
        }

    };

}
// SCROLL TO TOP

const topBtn = document.getElementById("topBtn");

window.addEventListener("scroll",()=>{

    if(window.scrollY>300){
        topBtn.style.display="block";
    }else{
        topBtn.style.display="none";
    }

});

topBtn.addEventListener("click",()=>{

    window.scrollTo({
        top:0,
        behavior:"smooth"
    });

});