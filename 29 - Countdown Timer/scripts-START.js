let countdown;
const timeDisplay = document.querySelector('.display__time-left');
const endTime = document.querySelector('.display__end-time');
const buttons = document.querySelectorAll(`[data-time]`);


function timer(seconds){

    //clear all existing timers
    clearInterval(countdown);

    const now = Date.now();
    const then = now + seconds * 1000;

    displayTimeLeft(seconds);
    displayEndTime(then);

    countdown = setInterval(() => {
        const secondLeft = Math.round((then - Date.now())/ 1000);

        if(secondLeft < 0){
            clearInterval(countdown);
            return;
        }

        displayTimeLeft(secondLeft);
    },1000);
}


function displayTimeLeft(seconds){
    const minutes = Math.floor(seconds / 60);
    const remainderSeconds = seconds % 60;
    const display = `${minutes}:${remainderSeconds < 10? '0'+remainderSeconds:remainderSeconds}`;
    document.title = display;
    timeDisplay.textContent = display;
}

function displayEndTime(timestamp){
    const end = new Date(timestamp);
    const hour = end.getHours();
    const minutes = end.getMinutes();

    endTime.textContent = `Be back at ${hour}:${minutes}`;

}
function startTimers(){

    const seconds = parseInt(this.dataset.time);
    timer(seconds);
}



buttons.forEach(button => button.addEventListener('click',startTimers));
document.customForm.addEventListener('submit',function(e){
    e.preventDefault();
    const mins = this.minutes.value;
    timer(mins*60);
    this.reset();
});