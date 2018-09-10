var dataList = [];
function addNote() {
  this.noteText = document.getElementById("noteText").value;
  dataList = window.localStorage.getItem("data");
  if(this.noteText != "") {
    dataList.push(this.noteText);
    document.getElementById("noteText").value = "";
    window.localStorage.setItem("data", dataList);
  } else {
    alert("Empty Text!");
  }
}
function listNotes() {
  let dataList2 = window.localStorage.getItem("data");
  let box = document.getElementById("box_body");
  let node = document.createElement("div");
  console.log(dataList2[1]);
  for(let i = 0; i < dataList.length; i++) {
    node.setAttribute("class", "item_outer");
    node.innerHTML = "<div class='item'><div class='circle_dot'></div><span>"+dataList2[i]+"</span></div>";
    box.append(node);
  }
}
