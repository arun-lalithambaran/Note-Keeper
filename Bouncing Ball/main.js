var input = document.getElementById("taskInput");
window.addEventListener("load", display());
input.addEventListener("keyup", function(event) {
  if(event.keyCode === 13) {
    createTask(input.value);
    input.value = "";
  }
});
function Task(taskText) {
  this.text = taskText;
  this.status = false;
}
function createTask(taskText) {
  var taskList;
  if(localStorage.taskList != null) {
    taskList = retrive();
  } else {
    taskList = new Array();
  }
  taskList.push(new Task(taskText));
  store(taskList);
}
function store(taskList) {
  localStorage.setItem("taskList", JSON.stringify(taskList));
  display();
}
function retrive() {
  return JSON.parse(localStorage.getItem("taskList"));
}
function display(taskList = retrive()) {
  var ul = document.getElementById("taskList");
  ul.innerHTML = "";
  if(taskList != null) {
    console.log(taskList);
    for(var i = 0; i < taskList.length; i++) {
      taskNode(taskList[i], i);
    }
  }
  function taskNode(task, id) {
    var li = document.createElement("li");
    if(task.status === true) {
      li.setAttribute("class", "checked");
    }
    // li.setAttribute("onclick", "toggleComplete("+id+")");
    li.innerHTML = "<span onclick='toggleComplete("+id+")'>"+task.text+"</span><span class='remove' onclick='remove("+id+")'>remove</span>";
    ul.append(li);
  }
}
function toggleComplete(id) {
  var taskList = retrive();
  if(taskList[id].status === false) {
    taskList[id].status = true;
  } else {
    taskList[id].status = false;
  }
  store(taskList);
}
function remove(id) {
  var taskList = retrive();
  taskList.splice(id, 1);
  store(taskList);
}
