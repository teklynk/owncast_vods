import './assets/scss/styles.scss'
import 'bootstrap'

window.main = true;

// JavaScript to get the 'vod' parameter from the URL and set the video source and poster
document.addEventListener('DOMContentLoaded', function () {
    const urlParams = new URLSearchParams(window.location.search);
    const video = urlParams.get('v');
    const videoPlayer = document.getElementById('vod-player');

    if (video) {
        const videoElement = document.getElementById('vod-video');
        const videoTitleElement = document.getElementById('vod-title');

        // Set the title of the video
        videoTitleElement.textContent = `${video}`;  // Set the title without the .mp4 extension

        // Set the video source and poster
        videoElement.src = `./videos/${video}.mp4`;
        videoElement.poster = `./thumbnails/${video}_thumbnail.png`;
        videoPlayer.classList.add('d-block');
    } else {
        console.error('No "vod" parameter found in the URL.');
        videoPlayer.classList.add('d-none');
    }
    // sets active thumbnail image
    const params = new URLSearchParams(window.location.search);
    const videoParam = params.get('v');
    if (videoParam) {
        const activeThumbnail = document.querySelector(`img[data-id="${videoParam}"]`);
        if (activeThumbnail) {
            activeThumbnail.classList.add('active');
        }
    }
});