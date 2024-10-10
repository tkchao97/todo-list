let tasks = [];
let completedTasks = [];

document.getElementById('add-task-btn').addEventListener('click', addTask);
generateTasks();

function getPriorityValue(priority) {
    switch (priority) {
        case 'high':
            return 1;
        case 'medium':
            return 2;
        case 'low':
            return 3;
        default:
            return 3; // Default to low if priority is unknown
    }
}

function generateTasks() {
    const taskList = document.getElementById('task-list');
    const taskContainer = document.querySelector('.container-2');
    taskList.innerHTML = '';

    if(tasks.length == 0) {
        taskContainer.style.display = 'none'; // Hide task container if no tasks
    } else {
        taskContainer.style.display = 'block'; // Show task container if tasks exist
    }

    tasks.sort((a, b) => getPriorityValue(a.priority) - getPriorityValue(b.priority));

    tasks.forEach((task, index) => {
        const li = document.createElement('li');
        li.className = task.completed ? 'completed' : '';
        li.classList.add(`priority-${task.priority}`);

        li.innerHTML = `
            <h3>${task.title}</h3>
            <p>${task.description}</p>
            <button class="edit-btn" onclick="editTask(${index})">Edit</button>
            <button class="delete-btn" onclick="deleteTask(${index})">Delete</button>
            <button class="complete-btn" onclick="completeTask(${index})">Complete</button>
        `;

        taskList.appendChild(li);
    });
}

function generateCompletedTasks() {
    const completedTaskList = document.getElementById('completed-task-list');
    const completedContainer = document.querySelector('.container-3');
    completedTaskList.innerHTML = '';

    if (completedTasks.length === 0) {
        completedContainer.style.display = 'none'; // Hide completed container if no tasks
    } else {
        completedContainer.style.display = 'block'; // Show completed container if tasks exist
    }

    // Generate the completed task list
    completedTasks.forEach((task, index) => {
        const li = document.createElement('li');
        li.className = 'completed';

        li.innerHTML = `
            <h3>${task.title}</h3>
            <p>${task.description}</p>
        `;

        completedTaskList.appendChild(li);
    });
}

function addTask() {
    const title = document.getElementById('task-title').value;
    const description = document.getElementById('task-description').value;
    const priority = document.getElementById('task-priority').value;

    if (title && description) {
        tasks.push({ title, description, priority, completed: false });
        generateTasks();
        clearInputs();
    } else {
        alert('Please fill in both the title and description.');
    }
}

function editTask(index) {
    const task = tasks[index];
    document.getElementById('task-title').value = task.title;
    document.getElementById('task-description').value = task.description;
    document.getElementById('task-priority').value = task.priority;

    // Remove the task from the list and re-render
    tasks.splice(index, 1);
    generateTasks();
    document.getElementById('input-container').scrollIntoView({
        behavior: 'smooth',
        block: 'center'
    });
}

function deleteTask(index) {
    tasks.splice(index, 1);
    generateTasks();
}

function completeTask(index) {
    const completedTask = tasks.splice(index, 1)[0]; 
    completedTasks.push(completedTask); 
    generateTasks();
    generateCompletedTasks(); 
}

function clearInputs() {
    document.getElementById('task-title').value = '';
    document.getElementById('task-description').value = '';
    document.getElementById('task-priority').value = 'low';
}




