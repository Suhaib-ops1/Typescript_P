var taskInput = document.getElementById("taskTitle");
var stateInput = document.getElementById("taskState");
var startDateInput = document.getElementById("startDate");
var endDateInput = document.getElementById("endDate");
var taskList = document.getElementById("taskList");
var tasks = JSON.parse(localStorage.getItem("tasks") || "[]");
function saveTasks() {
    localStorage.setItem("tasks", JSON.stringify(tasks));
}
function renderTasks() {
    taskList.innerHTML = "";
    for (var i = 0; i < tasks.length; i++) {
        var task = tasks[i];
        var taskElement = document.createElement("div");
        taskElement.classList.add("task");
        taskElement.innerHTML = "\n            <strong>".concat(task.title, "</strong>\n            <p>State: ").concat(task.states, " | Start: ").concat(task.startDate, " | End: ").concat(task.endDate, "</p>\n            <div class=\"task-actions\">\n                <button onclick=\"editTask(").concat(task.id, ")\">\u270F\uFE0F Edit</button>\n                <button onclick=\"deleteTask(").concat(task.id, ")\">\u274C Delete</button>\n            </div>\n        ");
        taskList.appendChild(taskElement);
    }
}
function addTask() {
    if (!taskInput.value.trim() || !stateInput.value || !startDateInput.value || !endDateInput.value) {
        alert("All fields are required!");
        return;
    }
    var newTask = {
        id: Date.now(),
        title: taskInput.value,
        states: stateInput.value,
        startDate: startDateInput.value,
        endDate: endDateInput.value
    };
    tasks.push(newTask);
    saveTasks();
    taskInput.value = "";
    stateInput.value = "Pending";
    startDateInput.value = "";
    endDateInput.value = "";
    renderTasks();
}
function editTask(id) {
    for (var i = 0; i < tasks.length; i++) {
        if (tasks[i].id === id) {
            taskInput.value = tasks[i].title;
            stateInput.value = tasks[i].states;
            startDateInput.value = tasks[i].startDate;
            endDateInput.value = tasks[i].endDate;
            tasks.splice(i, 1);
            saveTasks();
            renderTasks();
            return;
        }
    }
}
function deleteTask(id) {
    for (var i = 0; i < tasks.length; i++) {
        if (tasks[i].id === id) {
            tasks.splice(i, 1);
            saveTasks();
            renderTasks();
            return;
        }
    }
}
document.addEventListener("DOMContentLoaded", renderTasks);
