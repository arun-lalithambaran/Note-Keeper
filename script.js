var notes = [];
var savedNotes;
var noteCount = 0;
var box;
// var timer = setInterval(refresh, 30000);
window.addEventListener("load", function() {
  listNotes();
  if(savedNotes != null) {
    for(let i = 0; i < savedNotes.length; i++) {
      notes.push(savedNotes[i]);
    }
  }
});

function addNotes() {
  let note = document.getElementById("noteText").value;
  document.getElementById("noteText").value = "";

  if(note != "") {
    notes.push(new ToDoNote(note));
    localStorage.noteList = JSON.stringify(notes);
    listNotes();
  } else {
    alert("Please Type Anything!");
  }
}

function listNotes() {
  if(localStorage.noteList != null) {
    savedNotes = JSON.parse(localStorage.noteList);
    for( ; noteCount < savedNotes.length; noteCount++) {
      if(savedNotes[noteCount].removed === false) {
        showNote(savedNotes[noteCount], noteCount);
      }
    }
  }
}

function ToDoNote(noteText) {
  this.noteText = noteText;
  this.status = false;
  this.removed = false;
}
function showNote(note, noteId) {
  box = document.getElementById("box_body");
  let node = document.createElement("div");
  node.setAttribute("class", "item_outer");
  node.innerHTML = "<div class='item'><input type='hidden' value='"+noteId+"'><div class='circle_dot'></div><span>"+note.noteText+"</span><div class='close_btn' value='hello' onclick='removeNote(this)'><span>x</span></div></div>";
  box.append(node);
}
function removeNote(note) {
  notes[note.parentNode.firstChild.value].removed = true;
  localStorage.noteList = JSON.stringify(notes);
  note.parentNode.style = "display: none";
  refresh();
}
function refresh() {
  for(var i = 0; i < notes.length; i++) {
    if(notes[i].removed === true) {
      notes.splice(i, 1);
      console.log("item removed");
    }
  }
  localStorage.noteList = JSON.stringify(notes);
  box.innerHTML = "";
  noteCount = 0;
  listNotes();
  console.log("Refreshed");
}
