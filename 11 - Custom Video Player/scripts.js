// Get on elements
const player = document.querySelector('.player');
const video = player.querySelector('.viewer');
const progress = player.querySelector('.progress');
const progressBar = player.querySelector('.progress__filled');

const toggle = player.querySelector('.toggle');
const skipButtons = player.querySelectorAll('[data-skip]');
const ranges = player.querySelectorAll('.player__slider');

// build out function

function togglePlay(){
    //video.paused >> video is pause or not 
    const method = video.paused? 'play' : 'pause';
     video[method]();
}

function updateButton(){
    const icon = video.paused ? '>' : '||';
    toggle.textContent = icon;
}

function skip(){
    console.log('skip');
    video.currentTime += parseFloat(this.dataset.skip);
}

function handleRangeUpdate(){
    video[this.name] = this.value;
}

function handleProgress(){
    const precent = (video.currentTime / video.duration) * 100;
    progressBar.style.flexBasis = `${precent}%`;
}

function scrub(e){
    const scrubTime = (e.offsetX / progress.offsetWidth) * video.duration;
    video.currentTime = scrubTime;
}
// add Event listenter

video.addEventListener('click',togglePlay);
video.addEventListener('click',updateButton);
video.addEventListener('timeupdate',handleProgress);

toggle.addEventListener('click',togglePlay);
toggle.addEventListener('click',updateButton);

skipButtons.forEach(button => button.addEventListener('click',skip));
ranges.forEach(range => range.addEventListener('click',handleRangeUpdate));

progress.addEventListener('click',scrub);

let mousedown = false;
progress.addEventListener('mousemove', () => mousedown&&scrub(e));
progress.addEventListener('mousedown',()=> mousedown = true);
progress.addEventListener('mouseup',()=> mousedown = false);
