(() => {
	const add = document.querySelector('#add');
	const collection = document.querySelector('.collection');
	const nameElement = document.querySelector('#name');
	let tasks = [];
	const globalTime = 2500;
	let isStart = false;
	let countStart = 0;
	let nextID = 1;
	idLi = 1;
	forlabel = 1;

	theBody = 'Это сервис Pomodorro';
	theIcon = 'http://bml-electronics.com/images/BML_E3_metallic_earphones.png';


	// if (localStorage.getItem('tasks')!= null){
	//     tasks = JSON.parse(localStorage.getItem('tasks'));
	//     tasks.forEach(elem => {
	//       addTask(elem);
	//     });
	// }



	function renderAllTasks() {
		collection.innerHTML = '';
		const data = servise.getAllTasks();
		console.log(data);

		data.forEach(elem => {
			renderTask(elem);
		});

	}

	renderAllTasks();

	add.addEventListener('click', event => {
		const value = nameElement.value.trim();
		const task = new Task(value);
		servise.saveTask(task);
		// servise.add(task); // сохраняем в массив
		// tasks.push(value);

		// addTask(value);
		renderTask(task); // рисуем
		nameElement.value = '';

		// localStorage.setItem('tasks', JSON.stringify(tasks));
		servise.saveData();
	});

	function myTimeOut(notification, time = 2500) {
		setTimeout(() => {
			notification.close();
		}, time)
	}

	function myNotification(theTitle, theBody, theIcon) {
		const options = {
			tag: 'note',
			body: theBody,
			icon: theIcon,
			silent: false
		}
		const notification = new Notification(theTitle, options);
		return notification;
	}

	if (Notification.permission === 'default') {
		Notification.requestPermission(permission => {
			// Если пользователь разрешил, то создаем уведомление
			if (permission === "granted") {
				myTimeOut(myNotification(`Спасибо, что разрешили посылать сообщения`, theBody, theIcon));
			}
		});
	} else if (Notification.permission === 'denied') {
		console.log('Notification.permission = denied')
	} else if (Notification.permission === 'granted') {
		// myNotification();
	};

	collection.addEventListener('click', event => {
		if (event.target.classList.contains('playTask')) {
			if (!servise.canStart()) {
				alert('Нельзя нажать');
				return
			} else {
				const play = event.target;

				console.log(isStart);
				const taskId = Number(play.getAttribute('data-task-id'));
				console.log(taskId);
				if (play.innerHTML === 'play_arrow') {
					
					servise.start(taskId);
					play.innerHTML = 'pause';
					setTimeout(() => {

						// let notification = new Notification(`Задача ${taskId} закончилась`)
						// myTimeOut(myNotification(
						// 	`Задача ${taskId} закончилась`,
						// 	'Приступайте к следующей или начните задачу заново',
						// 	theIcon));
						alert(`Задача ${taskId} закончилась`);
						servise.stop(taskId);
						renderAllTasks();
						play.innerHTML = 'play_arrow';
					}, globalTime);

				} else {
					play.innerHTML = 'play_arrow'
				}
				// console.log(countStart);

			}
			renderAllTasks();
		}

	});

	collection.addEventListener('click', (event) => {
		if (event.target.classList.contains('chekbox')) {
			const checkox = event.target;

			checkox.addEventListener('change', () => {
				const listItem = checkox.parentElement;
				listItem.classList.toggle('completed');
			});
		}
	});

	function renderTask(task) {
		const taskElement = document.createElement('li');
		taskElement.classList.add('collection-item');
		taskElement.setAttribute('draggable', 'true');
		// taskElement.setAttribute('data-task-id', nextID++);
		taskElement.innerHTML = ` 
		<p>${task.runCount}</p>
        <input id="${idLi++}" type="checkbox">      
        <label class="chekbox" for="${forlabel++}"><span>${task.name}</span></label>           
        <a href="#" class="remove-task secondary-content">        
        <i class="material-icons right red-text playTask" data-task-id="${task.id}">play-arrow</i>
        </a>
        `;
		collection.appendChild(taskElement);
	}


	let dragged = null;

	Array.from(document.querySelectorAll('.collection-item[draggable="true"]')).forEach(item => {
		// Всё вынесли в общие функции, чтобы для каждого элемента не создавать их каждый раз
		item.addEventListener('dragstart', dragStartHandler);
		item.addEventListener('dragend', dragEndHandler);
		item.addEventListener('dragenter', dragEnterHandler);
		item.addEventListener('dragleave', dragLeaveHandler);
		item.addEventListener('dragover', dragOverHandler);
		item.addEventListener('drop', dropHandler);
	});

	function dragStartHandler(event) {
		dragged = event.target;
		event.dataTransfer.setData('text/plain', ''); // FIXME: в Firefox нужно для Drag and Drop

		//dragged.style.backgroundColor = 'red';
		console.log(event.target.offsetHeight);
		// event.dataTransfer.setDragImage(
		//   event.target,
		//   0,
		//   0
		// );

		// // TODO: умножать на текущий Zoom
		event.dataTransfer.setDragImage(
			event.target,
			event.offsetX, // координата X мыши отностельно границ элемента
			event.target.offsetHeight / 2
		);

		// event.dataTransfer.setDragImage(
		//     preview,
		//     event.offsetX, // координата X мыши отностельно границ элемента
		//     event.target.offsetHeight / 2
		// );

		// const ghost = document.createElement('p');
		// document.body.appendChild(ghost);
		// ghost.style.width = '200px';
		// ghost.style.height = '50px';
		// ghost.style.backgroundColor = 'blue';
		// ghost.style.opacity = '1.0';
		// event.dataTransfer.setDragImage(
		//     ghost,
		//     event.offsetX, // координата X мыши отностельно границ элемента
		//     event.target.offsetHeight / 2
		// );
	}

	function dragEndHandler(event) {
		dragged = null;
	}

	function dragEnterHandler(event) {
		event.preventDefault(); // FIXME: из-за этого в Chrome скакал курсор
		dragged.classList.add('drag');
	}

	function dragLeaveHandler(event) {
		event.target.classList.remove('drop-after');
		event.target.classList.remove('drop-before');
	}

	function dragOverHandler(event) {
		event.preventDefault();
		if (event.offsetY > event.target.offsetHeight / 2) {
			event.target.classList.add('drop-after');
			event.target.classList.remove('drop-before');
		} else {
			event.target.classList.add('drop-before');
			event.target.classList.remove('drop-after');
		}
	}

	function dropHandler(event) {
		event.preventDefault();
		dragged.classList.remove('drag');
		if (event.target.classList.contains('drop-before')) {
			collection.insertBefore(
				dragged,
				event.target
			);
		} else {
			collection.insertBefore(
				dragged,
				event.target.nextSibling
			);
		}

		event.target.classList.remove('drop-after');
		event.target.classList.remove('drop-before');
	}

})();