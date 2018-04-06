(async () => {
    // if ('Notification' in window) {
    //     console.log('exists');
    // }


    const ask = document.querySelector('#ask');
    if (Notification.permission === 'default') {
        ask.addEventListener('click', async event => {
            const permission = await Notification.requestPermission();
            console.log(permission);
        });
    } else if (Notification.permission === 'denied') {
        // TODO: жалобная всплывашка с инструкцией
        ask.classList.add('hide');
    } else {
        ask.classList.add('hide');
    }

    const single = document.querySelector('#single');
    single.addEventListener('click', event => {
        const notification = new Notification('Hello', {
            tag: 'note',
            body: 'Hello from JSHello from JS',
            icon: '',
            requireInteraction: true,
            silent: false
        });

        notification.addEventListener('click', event => {
            console.log('click');
        });

        notification.addEventListener('show', event => {
           console.log('show');
        });

        notification.addEventListener('close', event => {
           console.log('close');
        });
    });

    const repeat = document.querySelector('#repeat');
    repeat.addEventListener('click', event => {
        setInterval(() => {
            const notification = new Notification('Hello', {
                tag: 'note',
                body: 'Hello from JSHello from JS',
                icon: '',
                image: '',
                requireInteraction: true,
                silent: false
            });
        }, 5000);


    });
})();