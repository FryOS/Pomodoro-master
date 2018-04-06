class Task {
    constructor(id, name) {
        this.id = id;
        this.status = false;
        this.name = name;
        // this.performer = performer;
        // this.timeStart = Date.now();
        // this.spentTime = this.timeStart + 25;
    }

}

Task.maxID = 1;


class ServiseTask {
    constructor() {
        this.data = [];
        this.keyLocalStorage = 'tasks';
    }

    start(taskId) {

    }

    stop(taskId) {

    }

    pause(taskId) {

    }

    remove(task) {
        const index = this.data.indexOf(task);
        this.data.splice(index, 1);
    }

    add(task) {
        this.data.push(task);
    }

    update(taskId) {

    }

    getTask(task) {
        this.data.forEach(item => {
            return item;
        });
        return task;

    }

    getTaskById(id) {
        this.data.filter(item => {
            item.id === id;
        });
        return id;
    }

    getTaskByStatus(status) {
        this.data.filter(item => {
            item.status === name;
        });
        return status;

    }

    getNameOfTask() {
        const data = this.getData();
        const names = [];
        for (let i = 0; i < data.lenght; i++) {
            names.push(data[i].name);
        }
        console.log('getNameOfTask names: ', names);
        return names;
    }

    getData() {
        const json = window.localStorage.getItem(this.keyLocalStorage);
        const tasks = JSON.parse(json);
        tasks.forEach(item => {
            console.log(item);
        });
        console.log('getData мой JSON TASKS: ', json);
        return tasks;
    }

    saveData() {
        let json = JSON.stringify(this.data);
        window.localStorage.setItem(this.keyLocalStorage, json);
        console.log('JSON: ', json);
    }


    getAllTasks() {
        return this.data;
    }

}

const servise = new ServiseTask();
servise.keyLocalStorage = 'blaBla';
window.localStorage.setItem(servise.keyLocalStorage, null)

const task1 = new Task(Task.maxID++, 'JS');
const task2 = new Task(Task.maxID++, 'C++');
const task3 = new Task(Task.maxID++, 'C#');
const task4 = new Task(Task.maxID++, 'Groovy');
const task5 = new Task(Task.maxID++, 'Ruby');

servise.add(task1);
servise.add(task2);
servise.add(task3);
servise.add(task4);
servise.add(task5);

servise.saveData();
const myTasks = servise.getData();
console.log('myblaBla ', myTasks);




