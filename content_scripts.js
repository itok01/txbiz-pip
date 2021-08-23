
const pipIconURL = chrome.runtime.getURL('picture_in_picture_white_24dp.svg');

const getVideoPlayer = () => document.querySelector('#ulizahtml5-video-players_html5_api');

const getFullscreenButton = () => document.querySelector('#ulizahtml5-video-players > div.ulizahtml5-controller-area > div.vjs-control-bar > button.vjs-fullscreen-control.vjs-control.vjs-button.uliza-unfullscreen');

let isPipActive = false;

const createPipButton = () => {
    const pipButton = document.createElement('button');
    const pipButtonImg = document.createElement('img');
    const pipButtonTooltip = document.createElement('span');

    pipButton.appendChild(pipButtonImg);
    pipButton.appendChild(pipButtonTooltip);

    pipButton.classList.add("vjs-control");
    pipButton.classList.add("vjs-button");

    pipButtonImg.src = pipIconURL;

    pipButtonTooltip.textContent = 'Picture-in-Picture';
    pipButtonTooltip.style.position = 'absolute';
    pipButtonTooltip.style.color = '#fff';
    pipButtonTooltip.style.bottom = '25px';
    pipButtonTooltip.style.display = 'block';
    pipButtonTooltip.style.backgroundColor = 'rgba(0,0,0,0.5)';
    pipButtonTooltip.style.padding = '0.2em 0.5em';
    pipButtonTooltip.style.borderRadius = '0.3em';
    pipButtonTooltip.style.whiteSpace = 'nowrap';
    pipButtonTooltip.style.lineHeight = '1';
    pipButtonTooltip.style.visibility = 'hidden';
    pipButtonTooltip.style.opacity = '0';
    pipButtonTooltip.style.zIndex = '2';
    pipButtonTooltip.style.pointerEvents = 'none';

    pipButton.addEventListener('click', () => {
        if (isPipActive) {
            console.log(isPipActive);
            document.exitPictureInPicture();
            isPipActive = false;
        } else {
            console.log(isPipActive);
            getVideoPlayer().requestPictureInPicture();
            isPipActive = true;
        }
    });

    pipButton.addEventListener('mouseover', () => {
        pipButtonImg.style.filter = 'brightness(0.8)';
        pipButtonTooltip.style.visibility = '';
        pipButtonTooltip.style.opacity = '1';
    });

    pipButton.addEventListener('mouseleave', () => {
        pipButtonImg.style.filter = '';
        pipButtonTooltip.style.visibility = 'hidden';
        pipButtonTooltip.style.opacity = '0';
    });

    return pipButton;
};

const main = () => {
    const fullscreenButton = getFullscreenButton();
    const pipButton = createPipButton();

    fullscreenButton.after(pipButton);

    getVideoPlayer().classList.add('has-pip-button');
};

let jsInitChecktimer;
const jsLoaded = () => {
    if (getVideoPlayer() != null) {
        clearInterval(jsInitChecktimer);
        main();
    }
};

window.addEventListener('load', () => {
    jsInitChecktimer = setInterval(jsLoaded, 500);
});
