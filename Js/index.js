if(localStorage.length==0){
    var i=0;
}
else{
    i = localStorage.length;
}


let cancelBtn = document.getElementById("cancel");
let addBtn = document.getElementById("Add");
cancelBtn.addEventListener("click", ()=>{
    document.getElementsByClassName("makeNotes")[0].classList.remove("display")
})
let x =0;
let divNote = document.createElement("div")
addBtn.addEventListener("click", ()=>{
    if(x>0){
        document.getElementsByClassName("cont1")[0].removeChild(divNote)
    }
    divNote.innerHTML="";
    if(document.getElementById("headNote").value== ""){
        document.getElementsByClassName("cont1")[0].appendChild(divNote)
        x++;
        divNote.innerHTML = `<i class='fa fa-exclamation' style='font-size:20px; color:red;'></i>`
        divNote.innerHTML += `Please add Title to Notes.`
        divNote.style.color= "red"
    }
    else{
        addingNotes();
        document.getElementsByClassName("makeNotes")[0].classList.remove("display")
    }
})

// let btn = document.getElementById("menu")
// let arr = document.getElementsByClassName("nav-linker")
// let head = document.getElementsByClassName("heading")[0];
// btn.addEventListener("click", ()=>{
//     head.classList.toggle("expand")
//     btn.classList.toggle("fa-bars")
//     btn.classList.toggle("fa-close")
//     for (let i = 0; i < arr.length; i++) {
//         arr[i].classList.toggle("act")
//     }
// })
let addNote= document.getElementById("addnotes")
addNote.addEventListener("click", ()=>{
    document.getElementsByClassName("makeNotes")[0].classList.add("display")
    document.getElementById("headNote").value="";
})

function addingNotes(){
    let head = document.getElementById("headNote").value;
    localStorage.setItem(`${head}`, document.getElementById('result').innerHTML);
    i++;
    setTimeout(load(), 5000)
    console.log("added")
}
function load(){
    console.log("load");
    window.location.reload(true)
}