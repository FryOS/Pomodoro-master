class Task {
	constructor(name) {
		this.id = Task.getNewId();
		this.status = false;
		this.name = name;
		this.runCount = 0;
		// this.performer = performer;
		// this.timeStart = Date.now();
		// this.spentTime = this.timeStart + 25;
	}


}

Task.maxID = 1;
Task.getNewId = function () {
	return Task.maxID++;
}


class ServiseTask {
	constructor() {
		this.data = [];
		this.keyLocalStorage = 'tasks';
	}

	start(taskId) {
		const task = this.getTaskById(taskId);
		task.runCount++;
		task.status = true;
		this.saveTask(task);
	}

	stop(taskId) {
		const task = this.getTaskById(taskId);
		// task.runCount; останавливаем задачу
		task.status = false;
		this.saveTask(task);
	}

	pause(taskId) {
		const task = this.getTaskById(taskId);
		// task.runCount++; ставим на паузу задачу
		task.status = true;
		this.saveTask(task);
	}

	canStart() {
		const array = this.getData();
		for (let i = 0; i < array.length; i++) {
			const element = array[i];
			if (element.status) {
				return false;
			}
		}
		return true;
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
		const array = this.getData();
		for (let i = 0; i < array.length; i++) {
			const element = array[i];
			if (element.id === id) {
				return element;
			}
		}

		// const array = this.getData().filter(item => {
		// 	item.id === id;
		// });
		// console.log(array);
		// return array[0];
	}

	getTaskByStatus(status) {
		this.data.filter(item => {
			item.status === status;
		});
		return status;

	}

	getNameOfTask() {
		const names = [];
		const data = this.getData();
		if (data) {

			const item = data.forEach(item => {
				names.push(item.name)
			})
		}
		return names;
	}

	getData() {
		const json = window.localStorage.getItem(this.keyLocalStorage);
		if (json) {
			return JSON.parse(json);
		} else {
			return [];
		}
	}

	saveData() {

		let json = JSON.stringify(this.data);
		window.localStorage.setItem(this.keyLocalStorage, json);
	}

	saveTask(task) {
		this.data = this.getData();
		let origin = null;
		for (let i = 0; i < this.data.length; i++) {
			const element = this.data[i];
			if (element.id === task.id) {
				origin = element;
				break;
			}
		}



		// const array = this.data.filter(item => {
		// 	item.id === task.id;
		// });
		// const origin = array[0];
		if (origin) {
			origin.status = task.status;
			origin.name = task.name;
			origin.runCount = task.runCount;
		} else {
			this.data.push(task);
		}
		this.saveData();
	}


	getAllTasks() {
		return this.getData();
	}

}

const servise = new ServiseTask();


// const task1 = new Task(Task.maxID++, 'JS');
// const task2 = new Task(Task.maxID++, 'C++');
// const task3 = new Task(Task.maxID++, 'C#');
// const task4 = new Task(Task.maxID++, 'Groovy');
// const task5 = new Task(Task.maxID++, 'Ruby');

// servise.add(task1);
// servise.add(task2);
// servise.add(task3);
// servise.add(task4);
// servise.add(task5);

// const v = servise.saveData(task1);