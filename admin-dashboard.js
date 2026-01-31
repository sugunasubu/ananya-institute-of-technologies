    /* ===== ADMIN SESSION ===== */
    const admin = JSON.parse(localStorage.getItem("currentAdmin"));
    if (!admin) location.href = "login.html";
    document.getElementById("adminName").innerText = admin.name;

    /* ===== DATA ===== */
    const students = JSON.parse(localStorage.getItem("students")) || {};
    const appliedNME = JSON.parse(localStorage.getItem("appliedNME")) || {};
    const appliedPartV = JSON.parse(localStorage.getItem("appliedPartV")) || {};

    /* ===== UNIQUE APPLICANTS (EMAIL BASED) ===== */
    const appliedEmails = new Set([
    ...Object.keys(appliedNME),
    ...Object.keys(appliedPartV)
    ]);

    /* ===== COUNTS ===== */
    const nmeCount = Object.keys(appliedNME).length;
    const partvCount = Object.keys(appliedPartV).length;

    document.getElementById("totalStudents").innerText = appliedEmails.size;
    document.getElementById("nmeCount").innerText = nmeCount;
    document.getElementById("partvCount").innerText = partvCount;
    document.getElementById("totalApplications").innerText = nmeCount + partvCount;

    /* ===== TABLE ===== */
    const tbody = document.getElementById("tableBody");
    tbody.innerHTML = "";

    appliedEmails.forEach(email => {
    // find student by email
    let studentData = null;
    let registerNo = "";

    for (let reg in students) {
        if (students[reg].email === email) {
        studentData = students[reg];
        registerNo = reg;
        break;
        }
    }

    if (!studentData) return;

    const nme = appliedNME[email] || "—";
    const partv = appliedPartV[email] || "—";

    const tr = document.createElement("tr");
    tr.innerHTML = `
        <td>${studentData.name}</td>
        <td>${registerNo}</td>
        <td>${nme !== "—" ? `<span class="badge badge-nme">${nme}</span>` : "—"}</td>
        <td>${partv !== "—" ? `<span class="badge badge-partv">${partv}</span>` : "—"}</td>
        <td>${nme?.date || partv?.date || "—"}</td>

    `;
    tbody.appendChild(tr);
    });

    /* ===== SEARCH ===== */
    function searchTable(value) {
    value = value.toLowerCase();
    [...tbody.rows].forEach(row => {
        row.style.display = row.innerText.toLowerCase().includes(value) ? "" : "none";
    });
    }

    /* ===== LOGOUT ===== */
    function logout() {
    localStorage.removeItem("currentAdmin");
    location.href = "login.html";
    }
