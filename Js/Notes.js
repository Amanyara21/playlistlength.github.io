function showNotes() {
    for (let i = 0; i < localStorage.length; i++) {
        var KeyName = window.localStorage.key(i);
        document.getElementById("presentNotes").innerHTML += `<div class="box"><div class="headings">${KeyName}</div>
        <button  id ="" class="${KeyName}  DelBtn" >Delete Note</button>
        <button id="${KeyName}"class="btn">Preview</button> </div>`
    }
}
if(localStorage.length==0){
    document.getElementById("presentNotes").innerHTML="You don't have any notes yet!";
}

let crossMark =  document.createElement("i")
crossMark.className ="fa fa-close"
function onClick() {
    let buttons = document.querySelectorAll('.btn');
    Array.from(buttons).forEach((btn) => {
        btn.addEventListener('click', () => {
            let Id = btn.id
            let table = localStorage.getItem(`${Id}`)
            document.getElementsByClassName("NotVisible")[0].classList.add("YesVisible")
            document.getElementById("previewNotes").innerHTML=`<div class="Noteheading">${Id}</div><br>
            ${table}`;
            document.getElementById("previewNotes").appendChild(crossMark);
        })
    })
}
crossMark.addEventListener("click",()=>{
    document.getElementsByClassName("NotVisible")[0].classList.remove("YesVisible")
})
showNotes();
onClick();

// Add notes
let addNote= document.getElementById("addnotes")
addNote.addEventListener("click", ()=>{
    document.getElementsByClassName("makeNotes")[0].classList.add("display")
    // console.log("clicked")
})


let addBtn = document.getElementById("Add");
let cancelBtn = document.getElementById("cancel");
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
        document.getElementById("presentNotes").innerHTML="";
        showNotes();
    }
})
function addingNotes(){
    let head = document.getElementById("headNote").value;
    localStorage.setItem(`${head}`, document.getElementById('contentNode').value);
    document.getElementById('contentNode').value="";
    document.getElementById('headNote').value="";
    window.location.reload(true);
    // console.log("added")
}
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
// Delete Note
function deleteNote(){
    let DelBtn = document.getElementsByClassName("DelBtn");
Array.from(DelBtn).forEach((btn) => {
    btn.addEventListener('click', () => {
        let classN= btn.className
        // console.log("Deleted")
        classN = classN.replace("  DelBtn", "")
        window.localStorage.removeItem(`${classN}`);

        document.getElementById("presentNotes").innerHTML="";
        window.location.reload(true);
        showNotes();
    })
})
}
deleteNote()
