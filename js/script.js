"use strict";

var sessionId = window.localStorage.getItem('sessionId');

// Task Metrics
let taskName = '';
let timeEstimate = 0;
let complexity = 0;  
let impact = 0;  
let deadline = 0;  
let taskQueue = []; 
let taskList = []; 
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

let dropTargets1 = document.querySelectorAll('.drop-target1');
dropTargets1.forEach(target => {
  target.addEventListener('dragenter', handleDragEnter);
  target.addEventListener('dragover', handleDragOver);
  target.addEventListener('drop', handleDrop);
});

let dropTargets2 = document.querySelectorAll('.drop-target2');
dropTargets2.forEach(target => {
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
  console.log(event); 
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

  // store each new task in users local storage
  let task = {
    id: taskName,
    innerHTML : taskName,
    className : 'draggable' 
  }
  taskList.push(task); 

  console.log('the elements I have right now are: ', taskList); 
  window.localStorage.clear();
  window.localStorage.setItem('sessionId', JSON.stringify(taskList));
  // window.localStorage.setItem('sessionId', '1234');
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

document.addEventListener('click', (event) => {
  if (typeof menuContainer != 'undefined')
    menuContainer.classList.remove('context-menu-container');
});


function handleDelete() {

  console.log('current task selected is: ', currentTaskSelect.id);
  // closes context menu
  this.parentElement.parentElement.remove();
  if (currentTaskSelect) {
    // removes the selected element 
    currentTaskSelect.remove(); 

    // remove the element's data from the list 
    let newTaskList = taskList.filter(function(obj) {
      return obj.id != currentTaskSelect.id;
    }); 

    console.log('task list was: ', taskList);
    console.log('new list is: ', newTaskList);

    // store the updated list in local storage 
    window.localStorage.setItem('sessionId', JSON.stringify(newTaskList));
  }
  currentTaskSelect = undefined; 

}

// TODO: refactor!!
// Set timeblock section to highlight current hour. When transitioning to next hour, set the previous 
// hour back to default.
let clock = function () {

  // get time 
  let currentTime = new Date().getHours(); 
  console.log('time now is: ', currentTime);
 
  // highlight current hour block  
  switch(currentTime) {
    case 5: 
      document.getElementsByClassName('row-20')[0].style.color = 'black';
      document.getElementsByClassName('row-1')[0].style.color = 'BlueViolet';
      break;
    case 6: 
      document.getElementsByClassName('row-1')[0].style.color = 'black';
      document.getElementsByClassName('row-2')[0].style.color = 'BlueViolet';
      break;
    case 7: 
      document.getElementsByClassName('row-2')[0].style.color = 'black';
      document.getElementsByClassName('row-3')[0].style.color = 'BlueViolet';
      break;
    case 8: 
      document.getElementsByClassName('row-3')[0].style.color = 'black';
      document.getElementsByClassName('row-4')[0].style.color = 'BlueViolet';
      break;
    case 9: 
      document.getElementsByClassName('row-4')[0].style.color = 'black';
      document.getElementsByClassName('row-5')[0].style.color = 'BlueViolet';
      break;
    case 10: 
      document.getElementsByClassName('row-5')[0].style.color = 'black';
      document.getElementsByClassName('row-6')[0].style.color = 'BlueViolet';
      break;
    case 11: 
      document.getElementsByClassName('row-6')[0].style.color = 'black';
      document.getElementsByClassName('row-7')[0].style.color = 'BlueViolet';
      break;
    case 12: 
      document.getElementsByClassName('row-7')[0].style.color = 'black';
      document.getElementsByClassName('row-8')[0].style.color = 'BlueViolet';
      break;
    case 13: 
      document.getElementsByClassName('row-8')[0].style.color = 'black';
      document.getElementsByClassName('row-9')[0].style.color = 'BlueViolet';
      break;
    case 14: 
      // document.getElementsByClassName('row-10')[0].style.color = 'BlueViolet';
      document.getElementsByClassName('row-9')[0].style.color = 'black';
      document.getElementsByClassName('row-10')[0].style.color = 'BlueViolet';
      break;
    case 15: 
      document.getElementsByClassName('row-10')[0].style.color = 'black';
      document.getElementsByClassName('row-11')[0].style.color = 'BlueViolet';
      break;
    case 16: 
      document.getElementsByClassName('row-11')[0].style.color = 'black';
      document.getElementsByClassName('row-12')[0].style.color = 'BlueViolet';
      break;
    case 17: 
      document.getElementsByClassName('row-12')[0].style.color = 'black';
      document.getElementsByClassName('row-13')[0].style.color = 'BlueViolet';
      break;
    case 18: 
      document.getElementsByClassName('row-13')[0].style.color = 'black';
      document.getElementsByClassName('row-14')[0].style.color = 'BlueViolet';
      break;
    case 19: 
      document.getElementsByClassName('row-14')[0].style.color = 'black';
      document.getElementsByClassName('row-15')[0].style.color = 'BlueViolet';
      break;
    case 20: 
      document.getElementsByClassName('row-15')[0].style.color = 'black';
      document.getElementsByClassName('row-16')[0].style.color = 'BlueViolet';
      break;
    case 21: 
      document.getElementsByClassName('row-16')[0].style.color = 'black';
      document.getElementsByClassName('row-17')[0].style.color = 'BlueViolet';
      break;
    case 22: 
      document.getElementsByClassName('row-17')[0].style.color = 'black';
      document.getElementsByClassName('row-18')[0].style.color = 'BlueViolet';
      break;
    case 23: 
      document.getElementsByClassName('row-18')[0].style.color = 'black';
      document.getElementsByClassName('row-19')[0].style.color = 'BlueViolet';
      break;
    case 0: 
      document.getElementsByClassName('row-19')[0].style.color = 'black';
      document.getElementsByClassName('row-20')[0].style.color = 'BlueViolet';
      break;
    default: 
      break;
  }
}

let restoreTasks = function () {
  let taskParent = document.getElementById("drop-target");
  let tasks = JSON.parse(sessionId); 
  console.log('restored tasks are: ', tasks); 
  console.log('restored tasks type: ', typeof tasks); 
  console.log('number of tasks: ', tasks.length); 


  // for (let task of Object.values(tasks)) {
  for (let task of tasks) {
    // retrieve stored tasks and put them back into the execution stack task queue
    task = {
      id: task.id,
      innerHTML : task.innerHTML,
      className : 'draggable' 
    }
    taskList.push(task); 

    // recreate the tasks 
    let newTaskElement = document.createElement('div');
    newTaskElement.id = task.id;
    newTaskElement.innerHTML = task.innerHTML;
    newTaskElement.className = 'draggable'; 
    taskParent.appendChild(newTaskElement);
    createTaskBlock(); 
    // console.log('element to be created: ', newTaskElement); 
  }

  // console.log('tasks are: ', tasks[0]); 
  // taskParent.appendChild(tasks[0]);

}

setInterval(clock, 1000);  

// let previousSession = browser.sessions.restore(sessionId); 
// console.log('stored sessionId is: ', sessionId); 
// console.log('stored sessionId is: ', 'test'); 

restoreTasks(); 




