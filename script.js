document.addEventListener("DOMContentLoaded", loadTasks);

// Seleciona elementos da interface
const taskInput = document.getElementById("taskInput");
const addTaskButton = document.getElementById("addTaskButton");
const taskList = document.getElementById("taskList");

// Adiciona evento ao botão de adicionar
addTaskButton.addEventListener("click", addTask);

function loadTasks() {
    const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
    tasks.forEach(task => addTaskToDOM(task.text, task.completed));
}

function saveTasks() {
    const tasks = [];
    document.querySelectorAll(".task-item").forEach(item => {
        tasks.push({
            text: item.querySelector(".task-text").textContent,
            completed: item.classList.contains("line-through")
        });
    });
    localStorage.setItem("tasks", JSON.stringify(tasks));
}

function addTask() {
    const taskText = taskInput.value.trim();
    if (taskText) {
        addTaskToDOM(taskText);
        saveTasks();
        taskInput.value = "";
    }
}

function addTaskToDOM(text, completed = false) {
    const taskItem = document.createElement("li");
    taskItem.classList.add("task-item", "flex", "justify-between", "items-center", "p-2", "border-b");

    if (completed) taskItem.classList.add("line-through");

    const taskText = document.createElement("span");
    taskText.classList.add("task-text", "flex-1", "cursor-pointer");
    taskText.textContent = text;

    taskText.addEventListener("click", () => {
        taskItem.classList.toggle("line-through");
        saveTasks();
    });

    const editButton = document.createElement("button");
    editButton.textContent = "Editar";
    editButton.classList.add("text-blue-500", "hover:text-blue-700", "mx-1");
    editButton.addEventListener("click", () => editTask(taskText));

    const deleteButton = document.createElement("button");
    deleteButton.textContent = "Excluir";
    deleteButton.classList.add("text-red-500", "hover:text-red-700", "mx-1");
    deleteButton.addEventListener("click", () => {
        taskItem.remove();
        saveTasks();
    });

    taskItem.append(taskText, editButton, deleteButton);
    taskList.appendChild(taskItem);
}

function editTask(taskText) {
    const newText = prompt("Editar tarefa:", taskText.textContent);
    if (newText !== null && newText.trim() !== "") {
        taskText.textContent = newText;
        saveTasks();
    }
}
