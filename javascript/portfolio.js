let btn = document.getElementById("menu")
let arr = document.getElementsByClassName("nav-linker")
let head = document.getElementsByClassName("heading")[0];

btn.addEventListener("click", ()=>{
    head.classList.toggle("expand")
    btn.classList.toggle("fa-bars")
    btn.classList.toggle("fa-close")
    for (let i = 0; i < arr.length; i++) {
        arr[i].classList.toggle("act")
    }
})