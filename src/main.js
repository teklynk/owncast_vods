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
        const activeThumbnail = document.querySelector(`img[data-id="${video}"]`);

        // Set the title of the video
        videoTitleElement.textContent = `${video}`;  // Set the title without the .mp4 extension

        // Set the video source and poster
        videoElement.src = `./videos/${video}.mp4`;
        videoElement.poster = `./thumbnails/${video}_thumbnail.png`;
        videoPlayer.classList.remove('d-none');

        if (activeThumbnail) {
            activeThumbnail.classList.add('active');
        }
    } else {
        console.error('No "vod" parameter found in the URL.');
        videoPlayer.classList.add('d-none');
    }
});