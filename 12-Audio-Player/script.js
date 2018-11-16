// get elements
const player = document.querySelector('.player');
const video = player.querySelector('.viewer');
const progress = player.querySelector('.progress');
const progressBar = player.querySelector('.progress__filled');
const toggle = player.querySelector('.toggle');
const skipButtons = player.querySelectorAll('[data-skip]');
const ranges = player.querySelectorAll('.player__slider');


// build functions
function togglePlay() {
    // there is no playing prop
    const method = video.paused ? 'play' : 'pause';
    video[method]();
}

function updateButton() {
    const icon = this.paused ? '►' : '❚ ❚';
    toggle.textContent = icon;
}

function skip() {
    const { skip } = this.dataset;
    video.currentTime += parseInt(skip)
}

function handleRangeUpdate() {
    // this.value = value selected
    // this.name = range's name
    video[this.name] = this.value
}

function handleProgress() {
    const percent = video.currentTime / video.duration * 100;
    progressBar.style.flexBasis = `${percent}%`;
}

function scrub(e) {
    const scrubTime = e.offsetX / progress.offsetWidth * video.duration;
    video.currentTime = scrubTime;
}

// hook up the event listener
video.addEventListener('click', togglePlay);
video.addEventListener('play', updateButton);
video.addEventListener('pause', updateButton);
video.addEventListener('timeupdate', handleProgress);
toggle.addEventListener('click', togglePlay);
skipButtons.forEach(btn => btn.addEventListener('click', skip));
ranges.forEach(rng => rng.addEventListener('change', handleRangeUpdate));


progress.addEventListener('click', scrub);
let mouseDown = false;
progress.addEventListener('mousedown', () => { mouseDown = true });
progress.addEventListener('mouseup', () => { mouseDown = false });
progress.addEventListener('mousemove', (e) => mouseDown && scrub(e));