const schedule = document.querySelector('.schedule');
const body = document.querySelector('body');
const HOURSDAY = 24;

function removeEditBox() {
  const editBox = document.querySelector('.edit-box');
  if(editBox) body.removeChild(editBox);
}

function editEvent() {
  removeEditBox();
  if(this.classList.contains('active')) {
    this.classList.remove('active');
    return;
  }
  this.classList.add('active');
  const editBox = document.createElement('div');
  const editRect = this.getBoundingClientRect();
  const editBoxHeight = window.innerHeight * 22 / 100;
  const editBoxWidth = window.innerWidth * 15 / 100;
  const {top, left} = editRect;

  editBox.classList.add('edit-box');

  editBox.style.top = top - editBoxHeight / 2 + 'px';
  editBox.style.left = left - editBoxWidth + 'px';

  body.appendChild(editBox);
}

function createSchedule () {
  for(let i = 0; i < HOURSDAY; i++) {
    const myDiv = document.createElement('div');

    const myPara = document.createElement('p');
    const myBox = document.createElement('div');

    const editSpan = document.createElement('span');
    const removeSpan = document.createElement('span');
    const myCheck = document.createElement('input');

    myCheck.setAttribute('type', 'checkbox');

    myDiv.classList.add('hour');
    myPara.classList.add('time');
    myBox.classList.add('tool-box');
    editSpan.classList.value = 'far fa-edit edit';
    removeSpan.classList.value = 'fas fa-times remove';
    myCheck.classList.add('isDone');

    myPara.textContent = (i < 10)?`0${i}:00`: `${i}:00`;

    editSpan.addEventListener('click', editEvent);

    myBox.appendChild(editSpan);
    myBox.appendChild(removeSpan);
    myBox.appendChild(myCheck);

    myDiv.appendChild(myPara);
    myDiv.appendChild(myBox);
    
    schedule.appendChild(myDiv);
  }
}

createSchedule();
schedule.addEventListener('scroll', () =>{
  const hasActiveBox = document.querySelector('.edit.active');
  if(!hasActiveBox) return;
  hasActiveBox.classList.remove('active');
  removeEditBox();
});
window.onresize = () => removeEditBox();
