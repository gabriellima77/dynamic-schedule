const PRIORITYOPTIONS = ['Low', 'Medium', 'High'];
const PRIORITYPTS = [5, 10, 30];
const body = document.querySelector('body');
const sideBar = document.querySelector('.side-bar');
const pointsTag = document.querySelector('.pts');

let userPts = 0;

function removeEditBox() {
  const editBox = document.querySelector('.edit-box');
  if(editBox) body.removeChild(editBox);
}

function removeEvent(task) {
  const myH3 = task.taskTag.querySelector('h3');
  const week = task.weekReference;
  if(task.isDaily) {
    week.days.forEach((day) => {
      day.tasks[task.time].setName = '';
      day.tasks[task.time].setPriority = 'Low';
      day.tasks[task.time].hasTask = false;
      day.tasks[task.time].isDaily = false;
      day.tasks[task.time].isChecked = false;
    });
  }
  task.setName = '';
  task.setPriority = 'Low';
  task.hasTask = false;
  task.isChecked = false;


  myH3.textContent = '';
}

function removePara() {
  sideBar.removeChild(this);
}

function addPoints(task) {
  const myPara = document.createElement('p');
  const ptsTag = sideBar.querySelector('.pts');
  const top = pointsTag.offsetTop;
  const height = pointsTag.offsetHeight;
  const points = PRIORITYPTS[PRIORITYOPTIONS.indexOf(task.priority)];
  userPts += points;
  ptsTag.textContent = userPts + 'pts';
  myPara.textContent = '+' + points + 'pts';
  myPara.classList.add('points');
  myPara.style.top = top - height + 'px';
  myPara.addEventListener('animationend', removePara);
  sideBar.appendChild(myPara);
}

function removePoints(task) {
  const myPara = document.createElement('p');
  const ptsTag = sideBar.querySelector('.pts');
  const top = pointsTag.offsetTop;
  const height = pointsTag.offsetHeight;
  const points = PRIORITYPTS[PRIORITYOPTIONS.indexOf(task.priority)];
  userPts -= points;
  ptsTag.textContent = userPts + 'pts';
  myPara.textContent = -points + 'pts';
  myPara.classList.value = 'points remove';
  myPara.style.top = top - height + 'px';
  myPara.addEventListener('animationend', removePara);
  sideBar.appendChild(myPara);
}

function checkEvent(task) {
  task.isChecked = this.checked;
  if(this.checked && task.hasTask) addPoints(task);
  else if(task.hasTask) removePoints(task);
}

function putTaskWeek(task) {
  const week = task.weekReference;
  week.days.forEach((day) => {
    const h3 = day.tasks[task.time].taskTag.querySelector('h3');
    h3.textContent = task.name;

    day.tasks[task.time].setName = task.name;
    day.tasks[task.time].setPriority = task.priority;
    day.tasks[task.time].hasTask = true;
    day.tasks[task.time].isDaily = true;
  });
}

function changeTask(task) {
  const parent = this.parentElement;
  const labels = [...parent.querySelectorAll('label')];
  const [title, priority] = labels.map((label) => label.firstElementChild.value);
  const isDaily = document.querySelector('.daily');
  const editTag = task.taskTag.querySelector('.edit');
  const myH3 = task.taskTag.querySelector('h3');

  task.setName = title;
  task.setPriority = priority;
  task.hasTask = true;

  myH3.textContent = title;
  
  if(isDaily.checked) {
    putTaskWeek(task);
    task.isDaily = true;
  }
  editTag.classList.remove('active');
  removeEditBox();
}

function createEditForm(editSpan) {
  editSpan.classList.add('active');
  const editBox = document.createElement('div');
  const editRect = editSpan.getBoundingClientRect();
  const editBoxHeight = window.innerHeight * 37 / 100;
  const editBoxWidth = window.innerWidth * 25 / 100;
  const {top, left} = editRect;

  editBox.classList.add('edit-box');

  editBox.style.top = top - editBoxHeight / 2 + 'px';
  editBox.style.left = left - editBoxWidth + 'px';

  return editBox;
}

function putInputs(task) {
  const titleLabel = document.createElement('label');
  const title = document.createElement('input');
  const priorityLabel = document.createElement('label');
  const priority = document.createElement('select');
  const dailyLabel = document.createElement('label');
  const dailyCheck = document.createElement('input');
  const confirmBtn = document.createElement('div');

  title.classList.add('title-input');
  priority.classList.add('priority');
  dailyCheck.classList.add('daily');
  confirmBtn.classList.add('confirm');

  priority.setAttribute('name', 'priority');
  dailyCheck.setAttribute('type', 'checkbox');

  confirmBtn.addEventListener('click', changeTask.bind(confirmBtn, task));

  titleLabel.textContent = 'Task Name:';
  priorityLabel.textContent = 'Priority:';
  dailyLabel.textContent = 'Is a Daily activity?';
  confirmBtn.textContent = 'Confirm';

  titleLabel.appendChild(title);
  priorityLabel.appendChild(priority);
  dailyLabel.appendChild(dailyCheck);
  PRIORITYOPTIONS.forEach((opt) => {
    const option = document.createElement('option');
    option.textContent = opt;
    option.value = opt;
    priority.appendChild(option);
  });

  title.value = (task.name)? task.name: '';
  priority.value = (task.priority)? task.priority: 'Low';
  dailyCheck.checked = task.isDaily;

  console.log(task.isDaily);

  this.appendChild(titleLabel);
  this.appendChild(priorityLabel);
  this.appendChild(dailyLabel);
  this.appendChild(confirmBtn);
}

function editEvent(task) {
  removeEditBox();
  if(this.classList.contains('active')) {
    const active = document.querySelectorAll('.edit.active');
    active.forEach((span) => span.classList.remove('active'));
    return;
  }
  const editBox = createEditForm(this);
  editBox.addEventListener('animationend', putInputs.bind(editBox, task));
  body.appendChild(editBox);
}

function  createTaskTag(task) {
  const hour = document.createElement('div');
  const myPara = document.createElement('p');
  const myh3 = document.createElement('h3');
  const myBox = document.createElement('div');
  const editSpan = document.createElement('span');
  const removeSpan = document.createElement('span');
  const myCheck = document.createElement('input');

  myCheck.setAttribute('type', 'checkbox');

  myPara.textContent = (task.time < 10)?`0${task.time}:00`: `${task.time}:00`;

  hour.classList.add('hour');
  myPara.classList.add('time');
  myh3.classList.add('task-title');
  myBox.classList.add('tool-box');
  editSpan.classList.value = 'far fa-edit edit';
  removeSpan.classList.value = 'fas fa-times remove';
  myCheck.classList.add('isDone');

  myCheck.value = task.isChecked;

  editSpan.addEventListener('click', editEvent.bind(editSpan, task));
  removeSpan.addEventListener('click', removeEvent.bind(removeEvent, task));
  myCheck.addEventListener('change', checkEvent.bind(myCheck, task));

  myBox.appendChild(editSpan);
  myBox.appendChild(removeSpan);
  myBox.appendChild(myCheck);

  hour.appendChild(myPara);
  hour.appendChild(myh3);
  hour.appendChild(myBox);

  return hour;
}

class Task {
  constructor(time, week) {
    this.time = time;
    this.isDaily = false;
    this.isChecked = false;
    this.taskTag = createTaskTag(this);
    this.hasTask = false;
    this.weekReference = week;
    this.priority = 'Low';
  }
  
  set setName(name) {
    this.name = name;
  }

  set setPriority(priority) {
    this.priority = priority;
  }

}

export default Task