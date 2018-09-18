var notes = [];
var savedNotes;
var noteCount = 0;
var box =  document.getElementById("box_body");;
var input = document.getElementById("noteText");
var saveBtn = document.getElementById("addNoteBtn");
// var timer = setInterval(refresh, 30000);
input.addEventListener("keyup", function(event) {
  if(event.keyCode == 13) {
    saveBtn.click();
  }
});
window.addEventListener("load", function() {
  listNotes();
  if(savedNotes != null) {
    for(let i = 0; i < savedNotes.length; i++) {
      notes.push(savedNotes[i]);
    }
  }
});

function addNotes() {
  let note = input.value;
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
  let node = document.createElement("div");
  var checkClass = "";
  if(note.status === true) checkClass = " green_dot";
  node.setAttribute("class", "item_outer"+checkClass);
  node.innerHTML = "<div class='item'><input type='hidden' value='"+noteId+"'><div onclick='statusToggle(this)' class='circle_dot'></div><span class='text'>"+note.noteText+"</span><div class='close_btn' onclick='removeNote(this)'><span>x</span></div></div>";
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
function statusToggle(note) {
  var id = note.parentNode.firstChild.value;
  console.log(id);
  if(notes[id].status === true) {
    notes[id].status = false;
  } else {
    notes[id].status = true;
  }
  localStorage.noteList = JSON.stringify(notes);
  refresh();
}
function filterNotes(mode) {
  if(savedNotes != null) {
    box.innerHTML = "";
    for(var i = 0; i < savedNotes.length; i++) {
      if(savedNotes[i].status === mode) {
        showNote(savedNotes[i], i);
      }
    }
    var fbtn = document.getElementsByClassName("tab")[1];
    if(mode) {
      fbtn.innerHTML = "Incompleted Tasks";
    } else {
      fbtn.innerHTML = "Completed Tasks";
    }
    mode = mode != true;
    var f = "filterNotes(" + mode + ")";
    fbtn.setAttribute("onclick", f);
  }
}
