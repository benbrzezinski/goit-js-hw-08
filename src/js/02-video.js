import Player from '@vimeo/player';

const iframe = document.querySelector('#vimeo-player');
const player = new Player(iframe);
const LOCALSTORAGE_KEY = 'videoplayer-current-time';

const savePlayTime = e => {
  try {
    localStorage.setItem(LOCALSTORAGE_KEY, JSON.stringify(e));
  } catch (error) {
    console.error('Set state error:', error.stack);
  }
};

player.on('timeupdate', savePlayTime);

try {
  const currentTimeInSeconds = JSON.parse(
    localStorage.getItem(LOCALSTORAGE_KEY)
  ).seconds;
  player.setCurrentTime(currentTimeInSeconds);
} catch (error) {
  console.error('Get state error:', error.stack);
}
