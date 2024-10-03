const taskInput = document.getElementById('task-input');
const addTaskBtn = document.getElementById('task-button');
const taskList = document.getElementById('task-list');

function getTasks() {
    const tasks = localStorage.getItem('tasks');
    return tasks ? JSON.parse(tasks) : [];
}

function saveTasks(tasks) {
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

function displayTasks() {
    taskList.innerHTML = '';
    const tasks = getTasks();
    
    tasks.forEach((task, index) => {
        const li = document.createElement('li');
        li.textContent = task.text;
        
        if (task.completed) {
            li.classList.add('completed');
        }

        const iconDiv = document.createElement('div');
        iconDiv.classList.add('icons');

        const completeBtn = document.createElement('button');
        completeBtn.innerHTML = '<i class="bi bi-check"></i>';
        completeBtn.addEventListener('click', () => {
          tasks[index].completed = !tasks[index].completed;
          saveTasks(tasks);
          displayTasks();
        });

        const deleteBtn = document.createElement('button');
        deleteBtn.innerHTML = '<i class="bi bi-trash-fill"></i>';
        deleteBtn.addEventListener('click', () => {
          tasks.splice(index, 1);
          saveTasks(tasks);
          displayTasks();
        });

        iconDiv.appendChild(completeBtn);
        iconDiv.appendChild(deleteBtn);
        li.appendChild(iconDiv);
        taskList.appendChild(li);
    });
}

function addTask() {
    const taskText = taskInput.value.trim();

    if (taskText !== "") {
        const tasks = getTasks();
        tasks.push({ text: taskText, completed: false });
        saveTasks(tasks);
        displayTasks();
        taskInput.value = "";
    }
}

addTaskBtn.addEventListener('click', addTask);
taskInput.addEventListener('keypress', (event) => {
    if (event.key === 'Enter') {
        addTask();
    }
});

document.addEventListener('DOMContentLoaded', displayTasks);
