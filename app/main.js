/*
* @description  : To-Do-App main script file
* @author       : Arun Lalithambaran
*/
  var notes   = getData();
  var box     =  document.getElementById("box_body");
  var input   = document.getElementById("noteText");
  var saveBtn = document.getElementById("addNoteBtn");
  var tabs = document.getElementsByClassName("tab");
  var filter  = localStorage.filterStat;
  
  if(filter === "true") filter = true; else if(filter === "false") filter = false; else filter = null;

  function ToDoNote(noteText) {
  this.noteText = noteText;
  this.status   = false;
  }

  //  Create and push to-do objects
  function addNotes() {
    let note    = input.value;
    input.value = "";

    if(note != "") {
      notes.push(new ToDoNote(note));
      saveData();
      if(filter != null) filterNotes(filter); else listNotes();
    } else {
      alert("Please Type Anything!");
    }
  }

  //  Retrive data from local storage
  function getData() {
    if(localStorage.getItem("to_do_data") != null) {
      return JSON.parse(localStorage.getItem("to_do_data"));
    } else {
      return [];
    }
  }

  //  Save data to local storage
  function saveData() {
    localStorage.setItem("to_do_data", JSON.stringify(notes));
  }

  //  Loops through note array
  function listNotes() {
    filter = null;
    tabs[1].setAttribute("class", "tab");
    tabs[0].setAttribute("class", "tab activeTab");
    box.innerHTML = "";
    notes = getData();
  if(notes.length > 0) {
    for(var i = 0; i < notes.length; i++) {
        showNote(notes[i], i);
    }
  }
}

//  Creates individual note elements and appends it to HTML page
function showNote(note, noteId) {
  let node = document.createElement("div");
  var checkClass = "";
  if(note.status === true) checkClass = " green_dot";
  node.setAttribute("class", "item_outer"+checkClass);
  node.innerHTML = "<div class='item'><div onclick='statusToggle("+noteId+")' class='circle_dot'></div><span class='text'>"+note.noteText+"</span><div class='close_btn' onclick='removeNote("+noteId+")'><span>x</span></div></div>";
  box.append(node);
}

function removeNote(i) {
  notes.splice(i, 1);
  saveData();
  if(filter != null) filterNotes(filter); else listNotes();
}

function statusToggle(i) {
  if(notes[i].status === true) {
    notes[i].status = false;
  } else {
    notes[i].status = true;
  }
  saveData();
  if(filter != null) filterNotes(filter); else listNotes();
}

function filterNotes(method) {
  filter = method;
  box.innerHTML = "";
  notes = getData();
  for(let i = 0; i < notes.length; i++) {
    if(notes[i].status == method) {
      showNote(notes[i], i);
    }
  }
  method = method != true;
  tabs[1].setAttribute("onclick", "filterNotes("+method+")");
  if(method == true) tabs[1].innerHTML = "Incompleted Tasks"; else tabs[1].innerHTML = "Completed Tasks";
  tabs[0].setAttribute("class", "tab");
  tabs[1].setAttribute("class", "tab activeTab");
}

if(filter != null) filterNotes(filter); else listNotes();

input.addEventListener("keyup", function(event) {
  if(event.keyCode == 13) {
    saveBtn.click();
  }
});

window.addEventListener("beforeunload", function() {
  localStorage.setItem("filterStat", filter);
});
