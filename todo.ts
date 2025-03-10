interface Task {
    id: number;
    title: string;
    states: string;
    startDate: string;
    endDate: string;
}

const taskInput = document.getElementById("taskTitle") as HTMLInputElement;
const stateInput = document.getElementById("taskState") as HTMLSelectElement;
const startDateInput = document.getElementById("startDate") as HTMLInputElement;
const endDateInput = document.getElementById("endDate") as HTMLInputElement;
const taskList = document.getElementById("taskList") as HTMLDivElement;

let tasks: Task[] = JSON.parse(localStorage.getItem("tasks") || "[]");

function saveTasks(): void {
    localStorage.setItem("tasks", JSON.stringify(tasks));
}

function renderTasks(): void {
    taskList.innerHTML = "";
    for (let i = 0; i < tasks.length; i++) {
        const task = tasks[i];
        const taskElement = document.createElement("div");
        taskElement.classList.add("task");
        taskElement.innerHTML = `
            <strong>${task.title}</strong>
            <p>State: ${task.states} | Start: ${task.startDate} | End: ${task.endDate}</p>
            <div class="task-actions">
                <button onclick="editTask(${task.id})">✏️ Edit</button>
                <button onclick="deleteTask(${task.id})">❌ Delete</button>
            </div>
        `;
        taskList.appendChild(taskElement);
    }
}

function addTask(): void {
    if (!taskInput.value.trim() || !stateInput.value || !startDateInput.value || !endDateInput.value) {
        alert("All fields are required!");
        return;
    }

    const newTask: Task = {
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

function editTask(id: number): void {
    for (let i = 0; i < tasks.length; i++) {
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

function deleteTask(id: number): void {
    for (let i = 0; i < tasks.length; i++) {
        if (tasks[i].id === id) {
            tasks.splice(i, 1);
            saveTasks();
            renderTasks();
            return;
        }
    }
}

document.addEventListener("DOMContentLoaded", renderTasks);
