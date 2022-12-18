
// Get the modal
var modal = document.getElementById("taskModal");
var modal2 = document.getElementById("loginRegisterModal");

// Get the button that opens the modal
var btn = document.getElementById("taskBtn");
var btn2 = document.getElementById("loginRegisterBtn");

// Get the <span> element that closes the modal
var span = document.getElementsByClassName("close")[0];
var span2 = document.getElementsByClassName("close")[1];
//var span = document.getElementsByClassName("close");

// When the user clicks the button, open the modal 
btn.onclick = function() {
  modal.style.display = "block";
}

btn2.onclick = function() {
  modal2.style.display = "block";
}

// When the user clicks on <span> (x), close the modal
span.onclick = function(event) {
  modal.style.display = "none" ;

  console.log('pressing close button now');
}

span2.onclick = function(event) {
  modal2.style.display = "none";

  console.log('pressing close button now');
}

// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
  if (event.target == modal || event.target == modal2) {
    modal.style.display = "none";
    modal2.style.display = "none";
  }
}
