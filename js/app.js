class App {
    constructor() {
        this.taskManager = new TaskManager();
        this.initializeElements();
        this.attachEventListeners();
        this.loadTheme();
        this.renderTasks();
    }

    initializeElements() {
        this.taskForm = document.getElementById('taskForm');
        this.taskInput = document.getElementById('taskInput');
        this.taskList = document.getElementById('taskList');
        this.taskPriority = document.getElementById('taskPriority');
        this.taskCategory = document.getElementById('taskCategory');
        this.taskDueDate = document.getElementById('taskDueDate');
        this.filterPriority = document.getElementById('filterPriority');
        this.filterCategory = document.getElementById('filterCategory');
        this.themeToggle = document.getElementById('themeToggle');
    }

    attachEventListeners() {
        this.taskForm.addEventListener('submit', (e) => this.handleSubmit(e));
        this.filterPriority.addEventListener('change', () => this.renderTasks());
        this.filterCategory.addEventListener('change', () => this.renderTasks());
        this.themeToggle.addEventListener('click', () => this.toggleTheme());
    }

    handleSubmit(e) {
        e.preventDefault();
        const text = this.taskInput.value.trim();
        if (text) {
            const task = this.taskManager.addTask(
                text,
                this.taskPriority.value,
                this.taskCategory.value,
                this.taskDueDate.value
            );
            this.renderTask(task);
            this.taskInput.value = '';
        }
    }

    renderTasks() {
        const priority = this.filterPriority.value;
        const category = this.filterCategory.value;
        const filteredTasks = this.taskManager.filterTasks(priority, category);
        
        this.taskList.innerHTML = '';
        filteredTasks.forEach(task => this.renderTask(task));
    }

    renderTask(task) {
        const li = document.createElement('li');
        li.className = `task-item priority-${task.priority}`;
        if (task.completed) li.classList.add('task-completed');

        li.innerHTML = `
            <div class="task-content">
                <input type="checkbox" ${task.completed ? 'checked' : ''}>
                <span class="task-text">${task.text}</span>
                <span class="task-category">${task.category}</span>
                ${task.dueDate ? `<span class="task-due-date">${task.dueDate}</span>` : ''}
            </div>
            <div class="task-actions">
                <button class="edit-btn" aria-label="Edit task">
                    <i class="fas fa-edit"></i>
                </button>
                <button class="delete-btn" aria-label="Delete task">
                    <i class="fas fa-trash"></i>
                </button>
            </div>
        `;

        const checkbox = li.querySelector('input[type="checkbox"]');
        checkbox.addEventListener('change', () => {
            this.taskManager.toggleTaskComplete(task.id);
            li.classList.toggle('task-completed');
        });

        const editBtn = li.querySelector('.edit-btn');
        editBtn.addEventListener('click', () => this.editTask(task, li));

        const deleteBtn = li.querySelector('.delete-btn');
        deleteBtn.addEventListener('click', () => {
            this.taskManager.deleteTask(task.id);
            li.remove();
        });

        this.taskList.appendChild(li);
    }

    editTask(task, li) {
        const taskText = li.querySelector('.task-text');
        const currentText = taskText.textContent;
        const input = document.createElement('input');
        input.type = 'text';
        input.value = currentText;
        input.className = 'edit-input';

        const saveEdit = () => {
            const newText = input.value.trim();
            if (newText) {
                this.taskManager.editTask(task.id, newText);
                taskText.textContent = newText;
            }
            taskText.style.display = '';
            input.remove();
        };

        input.addEventListener('blur', saveEdit);
        input.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') saveEdit();
        });

        taskText.style.display = 'none';
        li.querySelector('.task-content').insertBefore(input, taskText);
        input.focus();
    }

    toggleTheme() {
        document.body.classList.toggle('dark-mode');
        const isDark = document.body.classList.contains('dark-mode');
        Storage.saveTheme(isDark ? 'dark' : 'light');
        this.themeToggle.innerHTML = isDark ? '<i class="fas fa-sun"></i>' : '<i class="fas fa-moon"></i>';
    }

    loadTheme() {
        const theme = Storage.getTheme();
        if (theme === 'dark') {
            document.body.classList.add('dark-mode');
            this.themeToggle.innerHTML = '<i class="fas fa-sun"></i>';
        }
    }
}

// Initialize the application
document.addEventListener('DOMContentLoaded', () => {
    new App();
}); 