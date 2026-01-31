/* ---------- STUDENT SESSION ---------- */
const student = JSON.parse(localStorage.getItem("currentStudent"));
if (!student) {
  window.location.href = "login.html";
}
document.getElementById("studentName").innerText = student.name;

/* ---------- DEFAULT PART V DATA ---------- */
const defaultPartV = {
  GCC: {
    total: 11,
    available: 11,
    desc: "Green Campus Club - Environmental sustainability initiatives"
  },
  NCC: {
    total: 13,
    available: 13,
    desc: "National Cadet Corps - Leadership and discipline training"
  },
  NIRF: {
    total: 16,
    available: 16,
    desc: "National Institutional Ranking Framework - Academic excellence"
  },
  NSS: {
    total: 4,
    available: 4,
    desc: "National Service Scheme - Social service and community development"
  }
};

/* ---------- LOAD LOCAL STORAGE ---------- */
let partVData = JSON.parse(localStorage.getItem("partVData"));
if (!partVData) {
  partVData = structuredClone(defaultPartV);
  localStorage.setItem("partVData", JSON.stringify(partVData));
}

let appliedPartV = JSON.parse(localStorage.getItem("appliedPartV")) || {};

/* ---------- RENDER ---------- */
const grid = document.getElementById("partvGrid");

function render() {
  grid.innerHTML = "";

  for (let club in partVData) {
    const c = partVData[club];
    const percent = (c.available / c.total) * 100;

    const card = document.createElement("div");
    card.className = "card";

    card.innerHTML = `
      <h2>${club}</h2>
      <p class="desc">${c.desc}</p>
      <div class="vacancy">
        <span>Vacancies</span>
        <strong>${c.available} / ${c.total}</strong>
      </div>
      <div class="bar">
        <div class="fill" style="width:${percent}%"></div>
      </div>
      <button 
        ${appliedPartV[student.email] || c.available === 0 ? "disabled" : ""} 
        onclick="apply('${club}')">
        ${appliedPartV[student.email] ? "Already Applied" : "Submit Application"}
      </button>
    `;

    grid.appendChild(card);
  }
}

render();

/* ---------- APPLY ---------- */
function apply(club) {
  if (appliedPartV[student.email]) {
    alert("You have already applied for a Part V activity.");
    return;
  }

  if (partVData[club].available > 0) {
    partVData[club].available--;
    appliedPartV[student.email] = club;

    localStorage.setItem("partVData", JSON.stringify(partVData));
    localStorage.setItem("appliedPartV", JSON.stringify(appliedPartV));

    alert(`Successfully applied for ${club}`);
    render();
  }
  
}

/* ---------- LOGOUT ---------- */
function logout() {
  localStorage.removeItem("currentStudent");
  window.location.href = "login.html";
}
