let currentLogin="student";

const email=document.getElementById("email");
const password=document.getElementById("password");
const emailLabel=document.getElementById("emailLabel");
const footerText=document.getElementById("footerText");
const studentTab=document.getElementById("studentTab");
const adminTab=document.getElementById("adminTab");

function switchLogin(type){
  currentLogin=type;
  studentTab.classList.remove("active");
  adminTab.classList.remove("active");

  if(type==="student"){
    studentTab.classList.add("active");
    emailLabel.innerText="Register Number / Email";
    footerText.innerHTML=`Don’t have a <b>student</b> account?
      <a href="signup.html">Sign up</a>`;
  }else{
    adminTab.classList.add("active");
    emailLabel.innerText="Admin ID";
    footerText.innerHTML=`Don’t have an <b>admin</b> account?
      <a href="admin-signup.html">Sign up</a>`;
  }
}

function togglePassword(){
  password.type=password.type==="password"?"text":"password";
}

function login(){
  const user=email.value.trim();
  const pass=password.value.trim();

  if(currentLogin==="student"){
    const students=JSON.parse(localStorage.getItem("students"))||{};
    for(let reg in students){
      const s=students[reg];
      if((reg===user || s.email===user) && s.password===pass){
        localStorage.setItem("currentStudent",JSON.stringify(s));
        window.location.href="student-dashboard.html";
        return;
      }
    }
    alert("Invalid student login");
  }
  else{
    const admins=JSON.parse(localStorage.getItem("admins"))||{};
    if(admins[user] && admins[user].password===pass){
      localStorage.setItem("currentAdmin",JSON.stringify(admins[user]));
      window.location.href="admin-dashboard.html";
      return;
    }
    alert("Invalid admin login");
  }
}

/* Auto open admin tab if redirected */
window.onload=()=>{
  const type=new URLSearchParams(location.search).get("type");
  if(type==="admin") switchLogin("admin");
};
