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
