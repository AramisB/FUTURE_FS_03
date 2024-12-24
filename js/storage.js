class Storage {
    static getTasks() {
        const tasks = localStorage.getItem('tasks');
        return tasks ? JSON.parse(tasks) : [];
    }

    static saveTasks(tasks) {
        localStorage.setItem('tasks', JSON.stringify(tasks));
    }

    static getTheme() {
        return localStorage.getItem('theme') || 'light';
    }

    static saveTheme(theme) {
        localStorage.setItem('theme', theme);
    }
} 