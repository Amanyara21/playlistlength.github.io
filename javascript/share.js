let sharebtn = document.querySelector(".fa-share-alt");
let title = window.location.title;
let url1 = window.location.href;

sharebtn.addEventListener("click", () => {
    if (navigator.share) {
        navigator.share({
            title: `${title}`,
            url: `${url1}`
        }).then(() => {

        })
            .catch(error=>{
               
            })
    }
})


let btn = document.getElementById("menu")
let arr = document.getElementsByClassName("nav-linker")
let head = document.getElementsByClassName("heading")[0];
let ul_show = document.getElementsByClassName("linking")[0];
let i =0;
btn.addEventListener("click", ()=>{
    head.classList.toggle("expand")
    btn.classList.toggle("fa-bars")
    btn.classList.toggle("fa-close")
    ul_show.classList.toggle("show")
    i++;
    if(i>1){
        ul_show.classList.toggle("hide")
    }
    for (let i = 0; i < arr.length; i++) {
        arr[i].classList.toggle("act")
    }
})