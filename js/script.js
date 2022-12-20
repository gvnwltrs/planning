
// Task Metrics
let taskName = '';
let timeEstimate = 0;
let complexity = 0;  
let impact = 0;  
let deadline = 0;  
let taskQueue = []; 

// Get the modal
let taskModal = document.getElementById("taskModal");
let loginRegisterModal = document.getElementById("loginRegisterModal");

// Get the button that opens the modal
let taskBtn = document.getElementById("taskBtn");
let createTaskBtn = document.getElementById("createTaskBtn");
let loginRegisterBtn = document.getElementById("loginRegisterBtn");

// Get the <span> element that closes the modal
let taskSpan = document.getElementsByClassName("close")[0];
let loginRegisterSpan = document.getElementsByClassName("close")[1];
//var span = document.getElementsByClassName("close");

// When the user clicks the button, open the modal 
taskBtn.onclick = function() {
  taskModal.style.display = "block";
}

createTaskBtn.onclick = function() {
  taskName = document.getElementById("taskName").value;
  timeEstimate = document.getElementById("timeEstimate").value;
  complexity = document.getElementById("complexity").value;
  impact = document.getElementById("impact").value;
  deadline = document.getElementById("deadline").value;

  console.log('timeEst value:', timeEstimate, '\n complexity: ', complexity,
  '\nimpact:', impact, '\ndeadline', deadline);

  // Add to task queue
  taskQueue.push({taskName,timeEstimate, complexity, impact, deadline});

  console.log(taskQueue); 

  // TODO: calculate priority level
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
