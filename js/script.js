"use strict";

// Task Metrics
let taskName = '';
let timeEstimate = 0;
let complexity = 0;  
let impact = 0;  
let deadline = 0;  
let taskQueue = []; 
let itemToRemove; 
//let menu; 
//let deleteItem; 
//let menu = document.createElement("div");
//let deleteItem = document.createElement("div");


// Get the modal
let taskModal = document.getElementById("taskModal");
let taskForm = document.getElementById('Form');
let taskInput = document.getElementById('taskName');
let loginRegisterModal = document.getElementById("loginRegisterModal");

// Get the button that opens the modal
let taskBtn = document.getElementById("taskBtn");
let createTask = document.getElementById("createTaskBtn");
let loginRegisterBtn = document.getElementById("loginRegisterBtn");

// Get the <span> element that closes the modal
let taskSpan = document.getElementsByClassName("close")[0];
let loginRegisterSpan = document.getElementsByClassName("close")[1];

//let draggableBox = document.getElementById('box'); 
//let draggableBox = document.getElementsByClassName('box')[0]; 
//let draggableBox2 = document.getElementsByClassName('box')[1]; 
let draggableElements = document.querySelectorAll('.draggable');
draggableElements.forEach(element => {
  element.setAttribute('draggable', true); 
  element.addEventListener('dragstart', handleDragStart); 
  element.addEventListener('dragend', handleDragEnd); 
});

//let droppableBox = document.getElementById('taskBoxDrop'); 
//let droppableBox2 = document.getElementById('timeBlockDrop'); 
let dropTargets = document.querySelectorAll('.drop-target');
dropTargets.forEach(target => {
  target.addEventListener('dragenter', handleDragEnter);
  target.addEventListener('dragover', handleDragOver);
  target.addEventListener('drop', handleDrop);
});


taskBtn.onclick = function() {
  taskModal.style.display = "block";
  taskInput.focus();
}

createTask.addEventListener('keypress', function(event) {
  event.preventDefault(); 
  console.log('I saw that!');
  if (event.code == 'Enter') {
    console.log('got it!!');
    //createTask.click();
  }
});

createTask.onclick = function(event) {
  event.preventDefault();

  // Parent Box
  let taskParent = document.getElementById("drop-target");

  taskName = document.getElementById("taskName").value;
 // timeEstimate = document.getElementById("timeEstimate").value;
 // complexity = document.getElementById("complexity").value;
 // impact = document.getElementById("impact").value;
 // deadline = document.getElementById("deadline").value;

 // console.log('timeEst value:', timeEstimate, '\n complexity: ', complexity,
 // '\nimpact:', impact, '\ndeadline', deadline);

  // Add to task queue
  //taskQueue.push({taskName,timeEstimate, complexity, impact, deadline});
  taskQueue.push({taskName});

  // TODO: build each task as element in dom with unique id (use part of the task name)
  let newTaskElement = document.createElement('div');
  newTaskElement.id = taskName;
  newTaskElement.innerHTML = taskName;
  newTaskElement.className = 'draggable'; 
  taskParent.appendChild(newTaskElement);

  createTaskBlock();

  console.log(taskQueue); 

  // TODO: calculate priority level
  //

  taskForm.reset();
  taskModal.style.display = 'none'; 
}

let createTaskBlock = function() {
  let draggableElements = document.querySelectorAll('.draggable');
  draggableElements.forEach(element => {
  element.setAttribute('draggable', true); 
  element.addEventListener('dragstart', handleDragStart); 
  element.addEventListener('dragend', handleDragEnd); 
});

}

let calculatePriorityLevel  = function() {
  // TODO: build system to calculate pri's  
}

loginRegisterBtn.onclick = function() {
  loginRegisterModal.style.display = "block";
}

// When the user clicks on <span> (x), close the modal
taskSpan.onclick = function(event) {
  taskModal.style.display = "none" ;

  console.log('pressing close button now');
}

loginRegisterSpan.onclick = function(event) {
  loginRegisterModal.style.display = "none";

  console.log('pressing close button now');
}

// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
  if (event.target == taskModal || event.target == loginRegisterModal) {
    taskModal.style.display = "none";
    loginRegisterModal.style.display = "none";
  }
}

function handleDragStart(event) {
  //console.log('result:', event.target.id);
  console.log('result:', event.target.id);
  event.dataTransfer.setData('text/plain', event.target.id);
}

function handleDragEnd(event) {

}

function handleDragEnter(event) {
  event.target.classList.add('drag-over');
}

function handleDragOver(event) {
  event.preventDefault();
}

function handleDrop(event) {
  event.preventDefault();
  let data = event.dataTransfer.getData('text/plain');
  this.appendChild(document.getElementById(data));
}

// Right-click Interaction Menu 
document.addEventListener("contextmenu", handleContextMenu);

function handleContextMenu(event) {
  console.log('got something!'); 
  event.preventDefault();

  var menu = document.createElement("div");
  menu.classList.add("context-menu");

  var deleteItem = document.createElement("div");
  deleteItem.classList.add("context-menu-item");
  deleteItem.innerHTML = "Delete";
  deleteItem.addEventListener("click", handleDelete);

  menu.appendChild(deleteItem);
  document.body.appendChild(menu);

  menu.style.display = 'block';
  menu.style.position = 'fixed';
  menu.style.padding = '25px';
  menu.style.s = 'left'; 
  menu.style.backgroundColor = 'lightgray';
  menu.style.left = event.clientX + "px";
  menu.style.top = event.clientY + "px";
}

function handleDelete() {

  console.log(this);

  // delete the element here
  //console.log('delete'); 

  this.parentElement.remove();
  //event.target.remove();
  itemToRemove.remove();
  //console.log(event.target);
  //document.body.removeChild(event.target.element); 
}



