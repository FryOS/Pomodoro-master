// if (event.target.classList.contains('playTask')) {
//     const play = event.target;
//     console.log(play);
//
//     if (Notification.permission === 'default') {
//         const permission = await Notification.requestPermission();
//         console.log(permission);
//
//     } else if (Notification.permission === 'denied') {
//         // TODO: жалобная всплывашка с инструкцией
//         // play.classList.add('hide');
//         console.log('Вы не разрешили');
//     } else {
//         // play.classList.add('hide');
//         console.log('Разрешили');
//         play.innerHTML = 'pause';
//         play.addEventListener('click', event => {
//             setTimeout(() => {
//                 const notification = new Notification('Hello', {
//                     tag: 'note',
//                     body: 'Задача запустилась',
//                     icon: '',
//                     image: '',
//                     requireInteraction: true,
//                     silent: true
//                 });
//                 console.log('задача началась')
//             }, 2000);
//
//
//         });
//
//     }
//
// }


function myTimeOut(notification) {
    setTimeout(()=>{
        notification.close();
    }, 2500)
}

function myNotification(){
    let notification = new Notification('Спасибо, что разрешили посылать сообщения', {
        tag: 'note',
        body: 'Pomodorro',
    });
}