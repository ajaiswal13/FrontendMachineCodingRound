const countdownTimer = () => {

    let hour = document.querySelector('.hour');
    let minutes = document.querySelector('.minutes');
    let seconds = document.querySelector('.seconds');

    let startBtn = document.querySelector('.start');
    let stopBtn = document.querySelector('.stop');
    let resetBtn = document.querySelector('.reset');
    let intervalValue;

    startBtn.addEventListener('click', () => {
        if (hour.value == 0 && minutes.value == 0 && seconds.value == 0) return;
        
        function startInterval() {
            startBtn.style.display = 'none';
            stopBtn.style.display = 'block';
            intervalValue = setInterval(() => {
                startTimer();
            },1000)
        }
        startInterval(); 
    })

    stopBtn.addEventListener('click', () => {
        stopInterval('pause');
    })

    resetBtn.addEventListener('click', () => {
        hour.value = '';
        minutes.value = '';
        seconds.value = '';
        stopInterval();
    })

    const stopInterval = (state) => {
        stopBtn.style.display = 'none';
        startBtn.style.display = 'block';
        startBtn.innerHTML = state === 'pause' ? 'Continue' : 'Start';
        clearInterval(intervalValue);
    }
    const startTimer = () => {
        if (seconds.value>60) {
            minutes.value++;
            seconds.value = parseInt(seconds.value) - 59;
        }
        if (minutes.value>60) {
            hour.value++;
            minutes.value = parseInt(minutes.value) - 60;
        }

        if (hour.value == 0 && minutes.value == 0 && seconds.value == 0) {
            hour.value = '';
            minutes.value = '';
            seconds.value = '';
            stopInterval();
        }else if (seconds.value != 0) {
            seconds.value = `${seconds.value< 10 ? '0' : '' }${seconds.value-1}`;
        } else if (minutes.value != 0 && seconds.value == 0) {
            seconds.value = 59;
            minutes.value = `${minutes.value<10 ? '0':'' }${minutes.value-1}`
        } else if (hour.value!=0 && minutes.value==0) {
            minutes.value = 60;
            hour.value =`${hour.value<10?'0':''}${hour.value-1}`
        }
    }
}

countdownTimer();