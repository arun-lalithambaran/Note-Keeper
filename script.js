var dataList = [];
var dataString = "{{}}";
let k = 0;
let dataCount = 0;
function addNote() {
  this.noteText = document.getElementById("noteText").value;
  // dataList = window.localStorage.getItem("data");
  if(this.noteText != "") {
    // dataList.push(this.noteText);
    dataStringGenerator(this.noteText);
    // dataString = arrToJson(dataList);
    document.getElementById("noteText").value = "";
    window.localStorage.setItem("data", dataString);
    listNotes();
  } else {
    alert("Empty Text!");
  }
}
function listNotes() {
  dataString = window.localStorage.getItem("data");
  if(dataList2 != null) {
    let jsonData = JSON.parse(dataList2);
    console.log(jsonData);
    for( ; k < jsonData[0]; k++) {
      dataList.push(jsonData[1][k]);
      let box = document.getElementById("box_body");
      let node = document.createElement("div");
      node.setAttribute("class", "item_outer");
      node.innerHTML = "<div class='item'><div class='circle_dot'></div><span>"+jsonData[1][k]+"</span></div>";
      box.append(node);
    }
  }
}
function arrToJson(arrData) {
  let jsonData = '{"0" : ' + '"' + arrData.length +'"' + ', "1" : {';
  for(let i = 0; i < arrData.length; i++) {
    jsonData += '"'+i+'" : ' + '"'+arrData[i]+'"';
    if(i != arrData.length - 1) {
      jsonData += ", ";
    }
  }
  jsonData += "}}";
  // console.log(jsonData);
  return jsonData;
}
function dataStringGenerator(data) {

}
