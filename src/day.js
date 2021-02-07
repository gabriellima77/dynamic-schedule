import Task from './task';

const DAYS = [
  'Sunday',
  'Monday',
  'Tuesday',
  'Wednesday',
  'Thursday',
  'Friday',
  'Saturday'
];
const body = document.querySelector('body');

function removeEditBox() {
  const hasActiveBox = document.querySelector('.edit.active');
  const editBox = document.querySelector('.edit-box');
  if(!hasActiveBox) return;
  hasActiveBox.classList.remove('active');
  if(editBox) body.removeChild(editBox);
}

function createDayTag(date) {
  const day = document.createElement('section');
  const dateBox = document.createElement('div');
  const myH2 = document.createElement('h2');
  const myPara = document.createElement('p');
  const schedule = document.createElement('div');

  day.classList.add('card');
  dateBox.classList.add('date-box');
  myH2.classList.add('day');
  myPara.classList.add('date');
  schedule.classList.add('schedule');

  myH2.textContent = DAYS[date.getDay()];
  myPara.textContent = date.toLocaleDateString("en-US");

  schedule.addEventListener('scroll', removeEditBox);

  dateBox.appendChild(myH2);
  dateBox.appendChild(myPara);

  day.appendChild(dateBox);
  day.appendChild(schedule);
  
  return day;
}

function  createTasks(day) {
  for(let i = 0; i < day.Hours; i++) {
    let newTask = new Task(i);
    const schedule = day.dayTag.querySelector('.schedule');
    schedule.appendChild(newTask.taskTag);
    day.tasks[i] = newTask;
  }
}

class Day {
  constructor(date) {
    this.Hours = 24;
    this.tasks = [];
    this.date = (date)? new Date(date): new Date();
    this.day = this.date.getDate();
    this.dayTag = createDayTag(this.date);
    createTasks(this);
  }
}

export default Day