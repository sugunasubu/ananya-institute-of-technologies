function togglePassword(){
  const p=document.getElementById("password");
  p.type=p.type==="password"?"text":"password";
}

function createAdminAccount(){
  const name=document.getElementById("name").value.trim();
  const adminId=document.getElementById("adminId").value.trim();
  const email=document.getElementById("email").value.trim();
  const password=document.getElementById("password").value.trim();

  if(!name||!adminId||!email||!password){
    alert("All fields required");
    return;
  }

  let admins=JSON.parse(localStorage.getItem("admins"))||{};

  if(admins[adminId]){
    alert("Admin ID already exists");
    return;
  }

  admins[adminId]={name,email,password};
  localStorage.setItem("admins",JSON.stringify(admins));

  alert("Admin account created");

  window.location.href="login.html?type=admin";
}
