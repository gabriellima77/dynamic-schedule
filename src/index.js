import Week from './week';


(function(){
  let userPts = 0;
  const btns = document.querySelectorAll('.btn.day');
  const todayBtn = document.querySelector('.today');
  const weekBtn = document.querySelector('.week');
  const today = new Date();
  const week = new Week();
  const body = document.querySelector('body');
  const container = document.querySelector('.container');

  function start() {
    const myDay = week.days.find((day) => (day.date.getDay() === today.getDay()));
    container.appendChild(myDay.dayTag);
  }

  function cleanContainer() {
    const children = [...container.children];
    if(children) children.forEach((child) => container.removeChild(child));
  } 

  function getDay() {
    const name = this.textContent;
    const day = week.getDayByName(name);
    cleanContainer();
    container.appendChild(day.dayTag);
  }

  window.onresize = function removeEditBox () {
    const hasActiveBox = document.querySelector('.edit.active');
    const editBox = document.querySelector('.edit-box');
    if(!hasActiveBox) return;
    hasActiveBox.classList.remove('active');
    if(editBox) body.removeChild(editBox);
  };

  btns.forEach((btn) => btn.addEventListener('click', getDay));
  todayBtn.addEventListener('click', function todayEvent() {
    cleanContainer();
    start();
  });
  weekBtn.addEventListener('click', function weekEvent() {
    cleanContainer();
    container.appendChild(week.getTable);
  });
  start();
})()
