const btn = document.querySelector(".scroll");

const page = document.querySelector(".letter");

btn.addEventListener("click", ()=>{

    page.classList.add("turn-page");

    setTimeout(()=>{

        window.location.href="intro.html";

    },1200);

});