// Load student data
const student = JSON.parse(localStorage.getItem("currentStudent"));

if(student){
  document.getElementById("studentName").innerText = student.name;
}else{
  window.location.href = "login.html";
}

// Navigation
function goNME(){
  window.location.href = "nme.html";
}

function goPartV(){
  window.location.href = "partv.html";
}

// Logout
function logout(){
  localStorage.removeItem("currentStudent");
  window.location.href = "login.html";
}
