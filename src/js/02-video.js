import Player from '@vimeo/player';
import throttle from 'lodash.throttle';

const LOCALSTORAGE_KEY_CURRENT_TIME_VIDEO = 'videoplayer-current-time';
const iframe = document.querySelector('#vimeo-player');
const player = new Player(iframe);

const savePlayTime = throttle(e => {
  try {
    localStorage.setItem(
      LOCALSTORAGE_KEY_CURRENT_TIME_VIDEO,
      JSON.stringify(e)
    );
  } catch (error) {
    console.error('Set state error:', error.stack);
  }
}, 1000);

player.on('timeupdate', savePlayTime);

if (localStorage.getItem(LOCALSTORAGE_KEY_CURRENT_TIME_VIDEO)) {
  try {
    const currentTimeInSeconds = JSON.parse(
      localStorage.getItem(LOCALSTORAGE_KEY_CURRENT_TIME_VIDEO)
    ).seconds;
    player.setCurrentTime(currentTimeInSeconds);
  } catch (error) {
    console.error('Get state error:', error.stack);
  }
}
