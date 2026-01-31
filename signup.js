function togglePassword(){
  const pwd = document.getElementById('password');
  pwd.type = pwd.type === 'password' ? 'text' : 'password';
}

function createAccount(){
  const name = document.querySelector('input[placeholder="Enter your full name"]').value.trim();
  const regNo = document.querySelector('input[placeholder^="e.g"]').value.trim();
  const email = document.querySelector('input[type="email"]').value.trim();
  const password = document.getElementById('password').value.trim();

  if(!name || !regNo || !email || !password){
    alert("Please fill all fields");
    return;
  }

  let students = JSON.parse(localStorage.getItem("students")) || {};

  if(students[regNo]){
    alert("Register number already exists!");
    return;
  }

  students[regNo] = {
    name: name,
    email: email,
    password: password
  };

  localStorage.setItem("students", JSON.stringify(students));

  alert("Account created successfully!");

  // window.location.href = "login.html";
}
