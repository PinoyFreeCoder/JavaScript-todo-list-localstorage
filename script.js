document.addEventListener("DOMContentLoaded", loadTasks);

document.getElementById("addTaskBtn").addEventListener("click", function () {
  const taskInput = document.getElementById("taskInput");
  const task = taskInput.value;
  if (task) {
    addTask(task);
    saveTask(task);
    taskInput.value = "";
  }
});

function addTask(task) {
  const taskList = document.getElementById("taskList");
  const li = document.createElement("li");
  li.textContent = task;

  const deleteBtn = document.createElement("button");
  deleteBtn.textContent = "Delete";
  deleteBtn.addEventListener("click", function () {
    taskList.removeChild(li);
    deleteTasks(task);
  });

  li.appendChild(deleteBtn);
  taskList.appendChild(li);

  li.addEventListener("click", function () {
    li.style.textDecoration =
      li.style.textDecoration === "line-through" ? "none" : "line-through";
    updateTaskStatus(task);
  });
}

function saveTask(task) {
  let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
  tasks.push({ task, completed: false });
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

function loadTasks() {
  let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
  tasks.forEach(function (taskObj) {
    addTask(taskObj.task);
    if (taskObj.completed) {
      const taskItems = document.querySelectorAll("li");
      taskItems[taskItems.length - 1].style.textDecoration = "line-through";
    }
  });
}

function deleteTasks(task) {
  let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
  tasks = tasks.filter((taskObj) => taskObj.task !== task);
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

function updateTaskStatus(task) {
  let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
  tasks = tasks.map((taskObj) => {
    if (taskObj.task === task) {
      taskObj.completed = !taskObj.completed;
    }
    return taskObj;
  });
  localStorage.setItem("tasks", JSON.stringify(tasks));
}
