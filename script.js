let dataList = [];
function addNote() {
  this.noteText = document.getElementById("noteText").value;
  dataList.push(this.noteText);
  let box = document.getElementById("box_body");
  let node = document.createElement("div");
  node.setAttribute("class", "item_outer");
  node.innerHTML = "<div class='item'><div class='circle_dot'></div><span>"+this.noteText+"</span></div>";
  console.log(box);
  box.append(node);
  document.getElementById("noteText").value = "";
}
function listNotes() {
  let box = document.getElementById("box_body");
  let node = document.createElement("div");
  node.setAttribute("class", "item_outer");
  node.innerHTML = "<div class='item'><div class='circle_dot'></div><span>This is a to do item.</span></div>";
  console.log(box);
  box.append(node);


  if(dataList.length > 0) {
    for(let i = 0; i < dataList.length; i++) {
      // box.innerHTML = "<div class='item_outer'><div class='item'><div class='circle_dot'></div><span>This is a to do item.</span></div></div>";
    }
  } else {
    console.log("No Elements");
  }
}
