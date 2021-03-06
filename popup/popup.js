let tasks = [];

function updateTime() {
  const time = document.getElementById("time");
  chrome.storage.local.get(["timer", "timeOption"], (res) => {
    const minutes = `${res.timeOption - Math.ceil(res.timer / 60)}`.padStart(
      2,
      "0"
    );
    let seconds = "00";
    if (res.timer % 60 != 0) {
      seconds = `${60 - (res.timer % 60)}`.padStart(2, "0");
    }
    time.textContent = `${minutes}:${seconds}`;
  });
}

updateTime();
setInterval(updateTime, 1000);

const startTimerBtn = document.getElementById("start-timer-btn");
startTimerBtn.addEventListener("click", () => {
  chrome.storage.local.get(["isRunning"], (res) => {
    chrome.storage.local.set({ isRunning: !res.isRunning }, () => {
      startTimerBtn.textContent = !res.isRunning
        ? "Pause Timer"
        : "Start Timer";
    });
  });
});

const resetTimerBtn = document.getElementById("reset-timer-btn");
resetTimerBtn.addEventListener("click", () => {
  chrome.storage.local.set({ isRunning: false, timer: 0 }, () => {
    startTimerBtn.textContent = "Start Timer";
  });
});

chrome.storage.sync.get(["tasks"], (res) => {
  tasks = res.tasks ? res.tasks : [];
  renderTasks();
});

const taskContainer = document.getElementById("task-container");
const addTaskBtn = document.getElementById("add-task-btn");

addTaskBtn.addEventListener("click", addTask);

function saveTasks() {
  chrome.storage.sync.set({ tasks });
}

function addTask() {
  const taskNum = tasks.length;
  tasks.push("");
  renderTask(taskNum);
  saveTasks();
}

function renderTask(taskNum) {
  const task = document.createElement("div");
  task.id = "task";
  const textInput = document.createElement("input");
  textInput.value = tasks[taskNum];
  textInput.type = "text";
  textInput.placeholder = "Enter a task...";
  textInput.className = "text-input";

  textInput.addEventListener("change", () => {
    tasks[taskNum] = textInput.value;
    saveTasks();
  });

  const deleteBtn = document.createElement("input");
  deleteBtn.type = "button";
  deleteBtn.value = "X";
  deleteBtn.className = "delete-btn";

  deleteBtn.addEventListener("click", () => {
    deleteTask(taskNum);
  });

  task.appendChild(textInput);
  task.appendChild(deleteBtn);
  taskContainer.appendChild(task);
}

function deleteTask(taskNum) {
  tasks.splice(taskNum, 1);
  saveTasks();
  renderTasks();
}

function renderTasks() {
  while (taskContainer.firstChild) {
    taskContainer.removeChild(taskContainer.firstChild);
  }

  tasks.forEach((_task, taskNum) => {
    renderTask(taskNum);
  });
}
