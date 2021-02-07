import Day from './day';

const today = new Date();

function makeDays(week) {
  const day = today.getDay();
  const date = today.getDate();
  const year = today.getFullYear();
  const month = today.getMonth();
  let dateDay = date - day;
  for(let i = 0; i < 7; i++){
    const newDate = new Date(year, month, dateDay);
    const newDay = new Day(newDate);
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

function createTableBody(week) {
  const tBody = document.createElement('tbody');
  const tasks = [];
  const hours = Array(24);
  week.days.forEach((day) => {
    tasks.push(day.tasks.filter((task) => (task.isTask)));
  });
  tasks.forEach((taskList) => {
    taskList.forEach((task) => {
      if(!hours[task.time]) hours[task.time] = [{title: task.name, priority: task.priority}];
      else hours[task.time].push({title: task.name, priority: task.priority});
    });
  });
  console.log(hours);
  return tBody;
}

function makeTable(week) {
  const table = document.createElement('table');
  table.appendChild(createTableHeader(week));
  createTableBody(week);
  return table;
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