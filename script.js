// Students List
const students = [
  "49 - AADHITYA S", "50 - JEGANATHAN P M", "53 - MANIKANDAN N",
  "56 - MYTHILI G", "57 - NAVEEN K", "58 - NAVEEN R",
  "59 - PARAMESHWARAN S", "60 - PARTHASARATHI M", "62 - POOVIZHI G",
  "63 - PRAKASH M", "64 - PRASANTH R", "65 - PRIYADHARSHINI K",
  "66 - RAJESH S", "67 - RAJESHKANNA K", "68 - RAKESH R",
  "69 - RAMAN R", "70 - RANJITH M", "73 - SANJAY P",
  "74 - SANJAY V", "75 - SATHISHKUMAR P", "76 - SATHIYAPRIYA R",
  "77 - SELVARAJ S", "78 - SHYLAJA E", "79 - SOWMIYA S",
  "80 - SUBASH S", "81 - SUDHESI M", "82 - TAMILARASAN D",
  "83 - UMASARATHI R J", "84 - VIJAY S", "85 - VIKRAM M",
  "87 - PAVI S", "89 - SRIRAM S", "90 - SANTHOSH M",
  "93 - SEENIVASAN G", "94 - SHANMUGAVEL V", "95 - ARAVINTH S", "96 - DINESH S", "97 - KAVIPRASATH V"
];

let index = 0;
let present = [];
let absent = [];

// Elements
const dateEl = document.getElementById("date");
const studentNameEl = document.getElementById("student-name");
const startBtn = document.getElementById("start-btn");
const presentBtn = document.getElementById("present-btn");
const absentBtn = document.getElementById("absent-btn");
const reportSection = document.getElementById("report-section");
const reportOutput = document.getElementById("report-output");
const copyBtn = document.getElementById("copy-report");
const storeBtn = document.getElementById("store-report");
const storedReportsDiv = document.getElementById("stored-reports");
const searchDate = document.getElementById("search-date");

// Show current date & day
function updateDate() {
  const now = new Date();
  const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
  dateEl.textContent = now.toLocaleDateString("en-US", options);
}
updateDate();

// Start Attendance
startBtn.addEventListener("click", () => {
  index = 0;
  present = [];
  absent = [];
  startBtn.classList.add("hidden");
  presentBtn.classList.remove("hidden");
  absentBtn.classList.remove("hidden");
  showStudent();
});

function showStudent() {
  if (index < students.length) {
    studentNameEl.textContent = students[index];
  } else {
    endAttendance();
  }
}

// Mark Attendance
presentBtn.addEventListener("click", () => {
  present.push(students[index]);
  index++;
  showStudent();
});

absentBtn.addEventListener("click", () => {
  absent.push(students[index]);
  index++;
  showStudent();
});

// End Attendance
function endAttendance() {
  presentBtn.classList.add("hidden");
  absentBtn.classList.add("hidden");
  studentNameEl.textContent = "Attendance Completed ✅";
  generateReport();
}

// Generate Report
function generateReport() {
  reportSection.classList.remove("hidden");

  const presentList = present.map(s => `<li>${s}</li>`).join('');
  const absentList = absent.map(s => `<li>${s}</li>`).join('');

  const reportHTML = `
  <p><strong>Date:</strong> ${dateEl.textContent}</p>
  <p><strong>Class:</strong> III B.Sc. Computer Science</p>
  <h4>Present (${present.length}):</h4>
  <ol>${presentList}</ol>
  <h4>Absent (${absent.length}):</h4>
  <ol>${absentList}</ol>
  `;
  reportOutput.innerHTML = reportHTML;
}

// Copy Report
copyBtn.addEventListener("click", () => {
  navigator.clipboard.writeText(reportOutput.innerText);
  alert("Report copied to clipboard!");
});

// Store Report
storeBtn.addEventListener("click", () => {
  const now = new Date();
  const key = now.toISOString().split("T")[0];
  localStorage.setItem(key, reportOutput.innerHTML); // store HTML for ordered lists
  loadStoredReports();
});

// Load Stored Reports
function loadStoredReports() {
  storedReportsDiv.innerHTML = "";
  for (let i = 0; i < localStorage.length; i++) {
    const key = localStorage.key(i);
    const value = localStorage.getItem(key);

    const card = document.createElement("div");
    card.className = "report-card";

    card.innerHTML = `
      <div class="report-header">
        <strong>${key}</strong>
      </div>
      <div class="report-actions">
        <button onclick="viewReport('${key}')">View</button>
        <button onclick="copyStored('${key}')">Copy</button>
        <button onclick="deleteReport('${key}')">Delete</button>
      </div>
    `;
    storedReportsDiv.appendChild(card);
  }
}
loadStoredReports();

// View Report
function viewReport(key) {
  const content = localStorage.getItem(key);
  const newWin = window.open("", "_blank");
  newWin.document.write(`<html><head><title>Attendance Report - ${key}</title></head>
    <body>${content}</body></html>`);
  newWin.document.close();
}

// Copy Stored Report
function copyStored(key) {
  const content = localStorage.getItem(key);
  const tempEl = document.createElement("div");
  tempEl.innerHTML = content;
  navigator.clipboard.writeText(tempEl.innerText);
  alert("Stored report copied!");
}

// Delete Stored Report
function deleteReport(key) {
  localStorage.removeItem(key);
  loadStoredReports();
}
// Delete Stored Report with confirmation
function deleteReport(key) {
  const confirmDelete = confirm(`Are you sure you want to delete the report for ${key}?`);
  if (confirmDelete) {
    localStorage.removeItem(key);
    loadStoredReports();
    alert("Report deleted successfully!");
  }
}

// Search by Date
searchDate.addEventListener("change", () => {
  const key = searchDate.value;
  if (localStorage.getItem(key)) {
    viewReport(key);
  } else {
    alert("No report found for this date.");
  }
});
