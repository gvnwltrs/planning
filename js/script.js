"use strict";

// Task Metrics
let taskName = '';
let timeEstimate = 0;
let complexity = 0;  
let impact = 0;  
let deadline = 0;  
let taskQueue = []; 
let currentTaskSelect; 

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

let draggableElements = document.querySelectorAll('.draggable');
draggableElements.forEach(element => {
  element.setAttribute('draggable', true); 
  element.addEventListener('dragstart', handleDragStart); 
  element.addEventListener('dragend', handleDragEnd); 
});

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
  // TODO: mix these into task formation 
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

  // console.log(event.target.class);
  event.preventDefault();
  console.log(event);
  if (event.target.classList.contains('draggable')) {
    console.log('it is a ', event.target, '!');
    currentTaskSelect = event.target; 
  }

  var menuContainer = document.createElement('div');
  menuContainer.classList.add('context-menu-container');

  var menu = document.createElement("div");
  menu.classList.add("context-menu");

  var deleteItem = document.createElement("div");
  deleteItem.classList.add("context-menu-item");
  deleteItem.innerHTML = "Delete";
  deleteItem.addEventListener("click", handleDelete, true);

  menuContainer.appendChild(menu);
  menu.appendChild(deleteItem);
  document.body.appendChild(menuContainer);

  menuContainer.style.display = 'block';
  menuContainer.style.position = 'fixed';
  menuContainer.style.padding = '50px';
  menuContainer.style.alignItems = 'left'; 
  menuContainer.style.backgroundColor = 'lightgray';
  menuContainer.style.left = event.clientX + "px";
  menuContainer.style.top = event.clientY + "px";

  window.onclick = function(event) {
    console.log(event); 
    menuContainer.style.display = "none";
  }

}

function handleDelete() {

  this.parentElement.parentElement.remove();
  if (currentTaskSelect) {
    currentTaskSelect.remove(); 
  }
  currentTaskSelect = undefined; 

}



