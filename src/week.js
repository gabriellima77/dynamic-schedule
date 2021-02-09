import Day from './day';

const PRIORITYCOLORS = {
  Low: '#42ffca',
  Medium: '#7bff42',
  High: '#ffc942'
}

const today = new Date();

function makeDays(week) {
  const day = today.getDay();
  const date = today.getDate();
  const year = today.getFullYear();
  const month = today.getMonth();
  let dateDay = date - day;
  for(let i = 0; i < 7; i++){
    const newDate = new Date(year, month, dateDay);
    const newDay = new Day(newDate, week);
    week.days.push(newDay);
    dateDay++;
  }
}

function createTableHeader(week) {
  const tHead = document.createElement('thead');
  const tR = document.createElement('tr');
  const tHEmpity = document.createElement('th');

  tR.appendChild(tHEmpity);

  week.days.forEach((day) => {
    const tH = document.createElement('th');
    tH.textContent = day.dayTag.querySelector('h2').textContent;
    tR.appendChild(tH);
  });

  tHead.appendChild(tR);

  return tHead
}

function getHours(week) {
  const tasks = [];
  const hours = Array(24);
  week.days.forEach((day) => {
    tasks.push(day.tasks.filter((task) => (task.hasTask)));
  });
  tasks.forEach((taskList, index) => {
    taskList.forEach((task) => {
      if(!hours[task.time]) {
        hours[task.time] = Array(7);
        hours[task.time][index] = {title: task.name, priority: task.priority};
      }
      else hours[task.time][index] = {title: task.name, priority: task.priority};
    });
  });
  return hours;
}

function createTableBody(week) {
  const tBody = document.createElement('tbody');
  const hours = getHours(week);
  console.log(hours);
  hours.forEach((hour, index) => {
    if(hour) {
      const tR = document.createElement('tr');
      const timeTD = document.createElement('td');
      timeTD.textContent = (index > 9)? `${index}:00`: `0${index}:00`;
      tR.appendChild(timeTD);
      for(let i = 0; i < 7; i++) {
        const tD = document.createElement('td');
        if(hour[i]) {
          tD.textContent = hour[i].title;
          tD.style.backgroundColor = PRIORITYCOLORS[hour[i].priority];
        }
        tR.appendChild(tD);
      }
      tBody.appendChild(tR);
    }
  });
  return tBody;
}

function makeTable(week) {
  const box = document.createElement('div');
  const table = document.createElement('table');

  box.classList.add('box');


  table.appendChild(createTableHeader(week));
  table.appendChild(createTableBody(week));
  box.appendChild(table);
  return box;
}

class Week {
  constructor() {
    this.days = [];
    makeDays(this);
  }

  getDayByName(name) {
    const day = this.days.find((day) => {
      const date = day.date.toString().slice(0, 3);
      if(name.includes(date)) return day;
    });
    return day;
  }

  get getTable() {
    return makeTable(this);
  }
}

export default Week;