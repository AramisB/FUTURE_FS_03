class TaskManager {
    constructor() {
        this.tasks = Storage.getTasks();
    }

    addTask(taskText, priority, category, dueDate) {
        const task = {
            id: Date.now(),
            text: taskText,
            completed: false,
            priority,
            category,
            dueDate,
            createdAt: new Date().toISOString()
        };

        this.tasks.push(task);
        this.saveTasks();
        return task;
    }

    deleteTask(taskId) {
        this.tasks = this.tasks.filter(task => task.id !== taskId);
        this.saveTasks();
    }

    toggleTaskComplete(taskId) {
        const task = this.tasks.find(task => task.id === taskId);
        if (task) {
            task.completed = !task.completed;
            this.saveTasks();
        }
    }

    editTask(taskId, newText) {
        const task = this.tasks.find(task => task.id === taskId);
        if (task) {
            task.text = newText;
            this.saveTasks();
        }
    }

    updateTaskPriority(taskId, newPriority) {
        const task = this.tasks.find(task => task.id === taskId);
        if (task) {
            task.priority = newPriority;
            this.saveTasks();
        }
    }

    filterTasks(priority = 'all', category = 'all') {
        return this.tasks.filter(task => {
            const priorityMatch = priority === 'all' || task.priority === priority;
            const categoryMatch = category === 'all' || task.category === category;
            return priorityMatch && categoryMatch;
        });
    }

    saveTasks() {
        Storage.saveTasks(this.tasks);
    }
}