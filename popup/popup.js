const tasks = [];
const taskContainer = document.getElementById("task-container");
const addTaskBtn = document.getElementById("add-task-btn");
const startTimerBtn = document.getElementById("start-timer-btn");

const tasksValue = document.getElementById("tasks-value");

addTaskBtn.addEventListener("click", addTask);

function addTask() {
  const taskNum = tasks.length;
  tasks.push("");
  renderTask(taskNum);
}

function renderTask(taskNum) {
  const task = document.createElement("div");
  task.id = "task";
  const textInput = document.createElement("input");
  textInput.value = tasks[taskNum];
  textInput.type = "text";
  textInput.placeholder = "Enter a task...";

  textInput.addEventListener("change", () => {
    console.log(taskNum);
    tasks[taskNum] = textInput.value;
  });

  const deleteBtn = document.createElement("input");
  deleteBtn.type = "button";
  deleteBtn.value = "X";

  deleteBtn.addEventListener("click", () => {
    deleteTask(taskNum);
  });

  task.appendChild(textInput);
  task.appendChild(deleteBtn);
  taskContainer.appendChild(task);
}

function deleteTask(taskNum) {
  tasks.splice(taskNum, 1);
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
