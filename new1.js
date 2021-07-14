console.log("this my notes app");
//if user add a note to local storge
showNotes()                           //to display all nodes when page opened
//for adding note on add note button click
let addBtn = document.getElementById("addBtn");
addBtn.addEventListener("click", function (e) {
    let addTxt = document.getElementById("addTxt");
    let addTitle = document.getElementById("addTitle");
    let notes = localStorage.getItem("notes");
    if (notes == null) {
        notesObj = [];
    }
    else {
        notesObj = JSON.parse(notes);
    }
    let myObj = {
        title: addTitle.value,
        text: addTxt.value
    }
    notesObj.push(myObj);                 //add notes(from textarea)
    localStorage.setItem("notes", JSON.stringify(notesObj));
    addTxt.value = "";        //after adding to make textarea and titleinput empty
    addTitle.value = "";
    showNotes();

});
// function to show notes
function showNotes() {
    let notes = localStorage.getItem("notes");
    if (notes == null) {
        notesObj = [];
    }
    else {
        notesObj = JSON.parse(notes);         
    }
    //to add new note card in app 
    let html = "";
    notesObj.forEach(function (element, index) {
        html += `
       <div class="noteCard my-2 mx-2 card" style="width: 18rem;">
       <div class="card-body">
         <h5 class="card-title" oninput="innerHtml=addTitle.value">${element.title}</h5>
         <p class="card-text">${element.text}</p>
         <button id="${index}" onclick="deleteNote(this.id)" class="btn btn-primary" >Delete Notes</button>
       </div>
     </div>
       `;

    });
    //when there is no note present.
    let notesElm = document.getElementById('notes');
    if (notesObj.length != 0) {
        notesElm.innerHTML = html;
    }
    else {
        notesElm.innerHTML = `Nothing to Show! Use "Add a Note" section above to add notes`;
    }
}

// function to delete notes
function deleteNote(index) {
    let notes = localStorage.getItem("notes");
    if (notes == null) {
        notesObj = [];
    }
    else {
        notesObj = JSON.parse(notes);
    }
    notesObj.splice(index, 1);
    localStorage.setItem("notes", JSON.stringify(notesObj));
    showNotes();
}
//for searching any note from search
let search = document.getElementById("searchTxt");
search.addEventListener('input', function () {
    let inputVal = search.value.toLowerCase();
    let noteCards = document.getElementsByClassName("noteCard");
    Array.from(noteCards).forEach(function (element) {
        let cardTxt = element.getElementsByTagName("p")[0].innerText;
    
        let cardTitle = element.getElementsByTagName("h5")[0].innerText;
        if (cardTxt.includes(inputVal) || (cardTitle.includes(inputVal))) {

            element.style.display = "block";

        } else {
            element.style.display = "none";
        }
    })

})
