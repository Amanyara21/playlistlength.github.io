let sharebtn = document.querySelector(".fa-share-alt");
let title = window.document.title;
let url1 = window.document.href;
url1 = url1.replace("undefined", "");
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
