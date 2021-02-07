const PRIORITYOPTIONS = ['Low', 'Medium', 'High'];
const PRIORITYPTS = [5, 10, 30];
const body = document.querySelector('body');
const sideBar = document.querySelector('.side-bar');
const pointsTag = document.querySelector('.pts');

function removeEditBox() {
  const editBox = document.querySelector('.edit-box');
  if(editBox) body.removeChild(editBox);
}

function removeEvent(task) {
  const myH3 = task.taskTag.querySelector('h3');

  task.setName = '';
  task.setPriority = 'Low';
  task.isTask = false;

  myH3.textContent = '';
}

function removePara() {
  sideBar.removeChild(this);
}

function addPoints(task) {
  const myPara = document.createElement('p');
  const top = pointsTag.offsetTop;
  const height = pointsTag.offsetHeight;
  myPara.textContent = '+' + PRIORITYPTS[PRIORITYOPTIONS.indexOf(task.priority)] + 'pts';
  myPara.classList.add('points');
  myPara.style.top = top - height + 'px';
  myPara.addEventListener('animationend', removePara);
  sideBar.appendChild(myPara);
}

function removePoints(task) {
  const myPara = document.createElement('p');
  const top = pointsTag.offsetTop;
  const height = pointsTag.offsetHeight;
  myPara.textContent = -PRIORITYPTS[PRIORITYOPTIONS.indexOf(task.priority)] + 'pts';
  myPara.classList.value = 'points remove';
  myPara.style.top = top - height + 'px';
  myPara.addEventListener('animationend', removePara);
  sideBar.appendChild(myPara);
}

function checkEvent(task) {
  task.isChecked = this.checked;
  if(this.checked && task.isTask) addPoints(task);
  else if(task.isTask) removePoints(task);
}

function changeTask(task) {
  const parent = this.parentElement;
  const labels = [...parent.querySelectorAll('label')];
  const [title, priority] = labels.map((label) => label.firstElementChild.value);
  const editTag = task.taskTag.querySelector('.edit');
  const myH3 = task.taskTag.querySelector('h3');

  task.setName = title;
  task.setPriority = priority;
  task.isTask = true;

  myH3.textContent = title;
  
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
  const confirmBtn = document.createElement('div');

  title.classList.add('title-input');
  priority.classList.add('priority');
  confirmBtn.classList.add('confirm');

  priority.setAttribute('name', 'priority');

  confirmBtn.addEventListener('click', changeTask.bind(confirmBtn, task));

  titleLabel.textContent = 'Task Name:';
  priorityLabel.textContent = 'Priority:';
  confirmBtn.textContent = 'Confirm';

  titleLabel.appendChild(title);
  priorityLabel.appendChild(priority);
  PRIORITYOPTIONS.forEach((opt) => {
    const option = document.createElement('option');
    option.textContent = opt;
    option.value = opt;
    priority.appendChild(option);
  });

  title.value = (task.name)? task.name: '';
  priority.value = (task.priority)? task.priority: 'Low';

  this.appendChild(titleLabel);
  this.appendChild(priorityLabel);
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
  constructor(time) {
    this.time = time;
    this.isDaily = false;
    this.isChecked = false;
    this.taskTag = createTaskTag(this);
    this.isTask = false;
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