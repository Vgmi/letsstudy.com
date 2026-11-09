const state = JSON.parse(localStorage.getItem("letsStudyState") || "null") || {
  tasks: [
    { id: 1, title: "Plan the most important thing for today", priority: "high", done: false },
    { id: 2, title: "Review notes from yesterday", priority: "normal", done: false },
    { id: 3, title: "Take a proper screen break", priority: "low", done: true }
  ],
  logs: [],
  focusSeconds: 0,
  theme: "light"
};
let filter = "all";
let timer = null;
let remaining = 25 * 60;

const $ = (id) => document.getElementById(id);
function save() { localStorage.setItem("letsStudyState", JSON.stringify(state)); }
function renderTasks() {
  const visible = state.tasks.filter((task) => filter === "all" || (filter === "done" ? task.done : !task.done));
  $("taskList").innerHTML = visible.map((task) => `<div class="task ${task.done ? "done" : ""}" data-id="${task.id}">
    <button class="check" aria-label="${task.done ? "Mark incomplete" : "Mark complete"}">${task.done ? "✓" : ""}</button>
    <span class="task-title">${escapeHtml(task.title)}</span><span class="priority ${task.priority}">${task.priority}</span>
    <button class="delete-task" aria-label="Delete task">×</button></div>`).join("");
  $("emptyTasks").hidden = visible.length > 0;
  const completed = state.tasks.filter((task) => task.done).length;
  const percent = state.tasks.length ? Math.round((completed / state.tasks.length) * 100) : 0;
  $("progressValue").textContent = `${percent}%`; $("progressLabel").textContent = `${completed} of ${state.tasks.length} tasks complete`;
  $("progressBar").style.width = `${percent}%`; $("openCount").textContent = state.tasks.filter((task) => !task.done).length;
}
function renderLogs() {
  $("logList").innerHTML = state.logs.slice().reverse().map((log) => `<article class="log-entry"><strong>${escapeHtml(log.title)}</strong>${log.body ? `<p>${escapeHtml(log.body)}</p>` : ""}<time>${new Date(log.created).toLocaleString([], { dateStyle: "medium", timeStyle: "short" })}</time></article>`).join("");
}
function escapeHtml(value) { return value.replace(/[&<>"']/g, (char) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#039;" }[char])); }
function formatTime(seconds) { return `${String(Math.floor(seconds / 60)).padStart(2, "0")}:${String(seconds % 60).padStart(2, "0")}`; }
function updateTimer() { $("timerValue").textContent = formatTime(remaining); $("focusTotal").textContent = formatTime(state.focusSeconds); }

document.querySelectorAll(".filter").forEach((button) => button.addEventListener("click", () => {
  document.querySelectorAll(".filter").forEach((item) => item.classList.remove("active")); button.classList.add("active"); filter = button.dataset.filter; renderTasks();
}));
$("taskList").addEventListener("click", (event) => {
  const taskElement = event.target.closest(".task"); if (!taskElement) return;
  const task = state.tasks.find((item) => item.id === Number(taskElement.dataset.id));
  if (event.target.closest(".check")) task.done = !task.done;
  if (event.target.closest(".delete-task")) state.tasks = state.tasks.filter((item) => item.id !== task.id);
  save(); renderTasks();
});
$("quickAddButton").addEventListener("click", () => { $("taskDialog").showModal(); $("taskTitle").focus(); });
$("taskForm").addEventListener("submit", (event) => {
  event.preventDefault(); const title = $("taskTitle").value.trim(); if (!title) return;
  state.tasks.push({ id: Date.now(), title, priority: $("taskPriority").value, done: false }); save(); renderTasks(); $("taskDialog").close(); event.target.reset();
});
$("clearCompleted").addEventListener("click", () => { state.tasks = state.tasks.filter((task) => !task.done); save(); renderTasks(); });
$("logForm").addEventListener("submit", (event) => {
  event.preventDefault(); const title = $("logTitle").value.trim(); if (!title) return;
  state.logs.push({ title, body: $("logBody").value.trim(), created: new Date().toISOString() }); save(); renderLogs(); event.target.reset();
});
$("themeButton").addEventListener("click", () => { state.theme = state.theme === "dark" ? "light" : "dark"; document.body.classList.toggle("dark", state.theme === "dark"); save(); });
$("menuButton").addEventListener("click", () => document.querySelector(".sidebar").classList.toggle("open"));
$("timerButton").addEventListener("click", () => {
  if (timer) { clearInterval(timer); timer = null; $("timerButton").textContent = "Resume focus"; $("timerButton").classList.remove("running"); return; }
  $("timerButton").textContent = "Pause focus"; $("timerButton").classList.add("running");
  timer = setInterval(() => { if (remaining > 0) { remaining--; state.focusSeconds++; updateTimer(); save(); } else { clearInterval(timer); timer = null; $("timerButton").textContent = "Start focus"; } }, 1000);
});
$("focusButton").addEventListener("click", () => document.querySelector("#focus").scrollIntoView());
let deferredPrompt;
window.addEventListener("beforeinstallprompt", (event) => { event.preventDefault(); deferredPrompt = event; $("installButton").hidden = false; });
$("installButton").addEventListener("click", async () => { if (!deferredPrompt) return; deferredPrompt.prompt(); deferredPrompt = null; $("installButton").hidden = true; });
if ("serviceWorker" in navigator) navigator.serviceWorker.register("sw.js");
document.body.classList.toggle("dark", state.theme === "dark"); renderTasks(); renderLogs(); updateTimer();
