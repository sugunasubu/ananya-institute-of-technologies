/* ---------- STUDENT SESSION ---------- */
const student = JSON.parse(localStorage.getItem("currentStudent"));
if (!student) {
  window.location.href = "login.html";
}
document.getElementById("studentName").innerText = student.name;

/* ---------- INITIAL NME DATA ---------- */
const defaultNME = {
  AIML: { total: 7, available: 7 },
  "Computer Science": { total: 13, available: 13 },
  ECE: { total: 5, available: 5 },
  EEE: { total: 10, available: 10 },
  Mechanical: { total: 9, available: 9 }
};

/* ---------- LOAD FROM LOCAL STORAGE ---------- */
let nmeData = JSON.parse(localStorage.getItem("nmeData"));
if (!nmeData) {
  nmeData = structuredClone(defaultNME);
  localStorage.setItem("nmeData", JSON.stringify(nmeData));
}

let appliedNME = JSON.parse(localStorage.getItem("appliedNME")) || {};

/* ---------- RENDER UI ---------- */
const grid = document.getElementById("nmeGrid");

function render() {
  grid.innerHTML = "";

  for (let dept in nmeData) {
    const d = nmeData[dept];
    const percent = (d.available / d.total) * 100;

    const card = document.createElement("div");
    card.className = "card";

    card.innerHTML = `
      <h2>${dept}</h2>
      <div class="vacancy">
        <span>Vacancies</span>
        <strong>${d.available} / ${d.total}</strong>
      </div>
      <div class="bar">
        <div class="fill" style="width:${percent}%"></div>
      </div>
      <button 
        ${appliedNME[student.email] || d.available === 0 ? "disabled" : ""} 
        onclick="apply('${dept}')">
        ${appliedNME[student.email] ? "Already Applied" : "Submit Application"}
      </button>
    `;

    grid.appendChild(card);
  }
}

render();

/* ---------- APPLY FUNCTION ---------- */
function apply(dept) {
  if (appliedNME[student.email]) {
    alert("You have already applied for an NME.");
    return;
  }

  if (nmeData[dept].available > 0) {
    nmeData[dept].available--;
    appliedNME[student.email] = dept;

    localStorage.setItem("nmeData", JSON.stringify(nmeData));
    localStorage.setItem("appliedNME", JSON.stringify(appliedNME));

    alert(`Application submitted for ${dept}`);
    render();
  }
}

/* ---------- LOGOUT ---------- */
function logout() {
  localStorage.removeItem("currentStudent");
  window.location.href = "login.html";
}
appliedNME[student.email] = {
  department: dept,
  date: new Date().toLocaleString()
};
