import Day from './day';

(function(){
  let userPts = 0;
  const today = new Day();
  const body = document.querySelector('body');
  function start() {
    body.appendChild(today.dayTag);
  }
  start();
  window.onresize = function removeEditBox () {
    const hasActiveBox = document.querySelector('.edit.active');
    const editBox = document.querySelector('.edit-box');
    if(!hasActiveBox) return;
    hasActiveBox.classList.remove('active');
    if(editBox) body.removeChild(editBox);
  };

})()
