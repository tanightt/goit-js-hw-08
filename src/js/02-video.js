import Player from '@vimeo/player';
import throttle from 'lodash.throttle';

const iframe = document.querySelector('iframe');
const player = new Player(iframe);
const STORAGE_KEY = "videoplayer-current-time";

const onPlay = function (data) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data)); 
};
player.on('timeupdate', throttle(onPlay, 1000));

const timeKey = JSON.parse(localStorage.getItem(STORAGE_KEY));
startTimeVideo();
function startTimeVideo() {
    if (timeKey === null) {
        return;
    } 
    player.setCurrentTime(timeKey['seconds']); 
}