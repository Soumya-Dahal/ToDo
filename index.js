const inputTask = document.getElementById("input-task");
const addTask = document.getElementById("add-task");
const taskContainer = document.getElementById("task-container");
// Load tasks when the page loads
document.addEventListener('DOMContentLoaded', function() {
    const savedTasks = JSON.parse(localStorage.getItem('tasks')) || [];
    savedTasks.forEach(taskText => {
        createTaskElement(taskText);
    });
});

addTask.addEventListener("click", function() {
    if(inputTask.value === "") {
        alert("Enter a task.");
        return;
    }
    createTaskElement(inputTask.value);
    saveTasks();
    inputTask.value = "";
});

function createTaskElement(taskText) {
    let task = document.createElement('div');
    task.classList.add('task');

    let li = document.createElement('li');
    li.innerText = taskText;
    task.appendChild(li);

    let checkButton = document.createElement('button');
    checkButton.innerHTML = '<i class="fas fa-check"></i>';
    checkButton.classList.add('checkTask');
    task.appendChild(checkButton);

    let deleteButton = document.createElement('button');
    deleteButton.innerHTML = '<i class="fas fa-trash-can"></i>';
    deleteButton.classList.add('deleteTask');
    task.appendChild(deleteButton);

    taskContainer.appendChild(task);

    checkButton.addEventListener("click", function() {
        li.style.textDecoration = li.style.textDecoration === "line-through" ? "none" : "line-through";
        saveTasks();
    });

    deleteButton.addEventListener("click", function() {
        task.remove();
        saveTasks();
    });
}

function saveTasks() {
    const tasks = [];
    document.querySelectorAll('.task li').forEach(li => {
        tasks.push(li.innerText);
    });
    localStorage.setItem('tasks', JSON.stringify(tasks));
}
