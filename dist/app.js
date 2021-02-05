/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/day.js":
/*!********************!*\
  !*** ./src/day.js ***!
  \********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var _task__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./task */ \"./src/task.js\");\n\n\nconst DAYS = [\n  'Sunday',\n  'Monday',\n  'Tuesday',\n  'Wednesday',\n  'Thursday',\n  'Friday',\n  'Saturday'\n];\nconst body = document.querySelector('body');\n\nfunction removeEditBox() {\n  const hasActiveBox = document.querySelector('.edit.active');\n  const editBox = document.querySelector('.edit-box');\n  if(!hasActiveBox) return;\n  hasActiveBox.classList.remove('active');\n  if(editBox) body.removeChild(editBox);\n}\n\nfunction createDayTag(date) {\n  const day = document.createElement('section');\n  const dateBox = document.createElement('div');\n  const myH2 = document.createElement('h2');\n  const myPara = document.createElement('p');\n  const schedule = document.createElement('div');\n\n  day.classList.add('card');\n  dateBox.classList.add('date-box');\n  myH2.classList.add('day');\n  myPara.classList.add('date');\n  schedule.classList.add('schedule');\n\n  myH2.textContent = DAYS[date.getDate()];\n  myPara.textContent = date.toLocaleDateString(\"en-US\");\n\n  schedule.addEventListener('scroll', removeEditBox);\n\n  dateBox.appendChild(myH2);\n  dateBox.appendChild(myPara);\n\n  day.appendChild(dateBox);\n  day.appendChild(schedule);\n  \n  return day;\n}\n\nclass Day {\n  constructor(date) {\n    this.Hours = 24;\n    this.tasks = [];\n    this.date = (date)? new Date(date): new Date();\n    this.day = this.date.getDate();\n    this.dayTag = createDayTag(this.date);\n    this.getTasks();\n  }\n\n  getTasks() {\n    for(let i = 0; i < this.Hours; i++) {\n      let newTask = new _task__WEBPACK_IMPORTED_MODULE_0__.default(i);\n      const schedule = this.dayTag.querySelector('.schedule');\n      schedule.appendChild(newTask.taskTag);\n      this.tasks[i] = newTask;\n    }\n  }\n}\n\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Day);\n\n//# sourceURL=webpack://dynamic-schedule/./src/day.js?");

/***/ }),

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _day__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./day */ \"./src/day.js\");\n\n\n(function(){\n  let userPts = 0;\n  const today = new _day__WEBPACK_IMPORTED_MODULE_0__.default();\n  const body = document.querySelector('body');\n  function start() {\n    body.appendChild(today.dayTag);\n  }\n  start();\n  window.onresize = function removeEditBox () {\n    const hasActiveBox = document.querySelector('.edit.active');\n    const editBox = document.querySelector('.edit-box');\n    if(!hasActiveBox) return;\n    hasActiveBox.classList.remove('active');\n    if(editBox) body.removeChild(editBox);\n  };\n\n})()\n\n\n//# sourceURL=webpack://dynamic-schedule/./src/index.js?");

/***/ }),

/***/ "./src/task.js":
/*!*********************!*\
  !*** ./src/task.js ***!
  \*********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\nconst PRIORITYOPTIONS = ['Low', 'Medium', 'High'];\nconst PRIORITYPTS = [5, 10, 30];\nconst body = document.querySelector('body');\n\nfunction removeEditBox() {\n  const editBox = document.querySelector('.edit-box');\n  if(editBox) body.removeChild(editBox);\n}\n\nfunction removeEvent(task) {\n  const myH3 = task.taskTag.querySelector('h3');\n\n  task.setName = '';\n  task.setPriority = '';\n\n  myH3.textContent = '';\n}\n\nfunction removePara() {\n  body.removeChild(this);\n}\n\nfunction addPoints(task) {\n  const myPara = document.createElement('p');\n  myPara.textContent = PRIORITYPTS[PRIORITYOPTIONS.indexOf(task.priority)] + 'pts';\n  myPara.classList.add('points');\n  myPara.addEventListener('animationend', removePara);\n  body.appendChild(myPara);\n}\n\nfunction removePoints(task) {\n  const myPara = document.createElement('p');\n  myPara.textContent = -PRIORITYPTS[PRIORITYOPTIONS.indexOf(task.priority)] + 'pts';\n  myPara.classList.value = 'points remove';\n  myPara.addEventListener('animationend', removePara);\n  body.appendChild(myPara);\n}\n\nfunction checkEvent(task) {\n  task.isChecked = this.checked;\n  if(this.checked) addPoints(task);\n  else removePoints(task);\n  console.log(task);\n}\n\nfunction changeTask(task) {\n  const parent = this.parentElement;\n  const labels = [...parent.querySelectorAll('label')];\n  const [title, priority] = labels.map((label) => label.firstElementChild.value);\n  const editTag = task.taskTag.querySelector('.edit');\n  const myH3 = task.taskTag.querySelector('h3');\n\n  task.setName = title;\n  task.setPriority = priority;\n\n  myH3.textContent = title;\n  \n  editTag.classList.remove('active');\n  removeEditBox();\n}\n\nfunction createEditForm(editSpan) {\n  editSpan.classList.add('active');\n  const editBox = document.createElement('div');\n  const editRect = editSpan.getBoundingClientRect();\n  const editBoxHeight = window.innerHeight * 37 / 100;\n  const editBoxWidth = window.innerWidth * 25 / 100;\n  const {top, left} = editRect;\n\n  editBox.classList.add('edit-box');\n\n  editBox.style.top = top - editBoxHeight / 2 + 'px';\n  editBox.style.left = left - editBoxWidth + 'px';\n\n  return editBox;\n}\n\nfunction putInputs(task) {\n  const titleLabel = document.createElement('label');\n  const title = document.createElement('input');\n  const priorityLabel = document.createElement('label');\n  const priority = document.createElement('select');\n  const confirmBtn = document.createElement('div');\n\n  title.classList.add('title-input');\n  priority.classList.add('priority');\n  confirmBtn.classList.add('confirm');\n\n  priority.setAttribute('name', 'priority');\n\n  confirmBtn.addEventListener('click', changeTask.bind(confirmBtn, task));\n\n  titleLabel.textContent = 'Task Name:';\n  priorityLabel.textContent = 'Priority:';\n  confirmBtn.textContent = 'Confirm';\n\n  titleLabel.appendChild(title);\n  priorityLabel.appendChild(priority);\n  PRIORITYOPTIONS.forEach((opt) => {\n    const option = document.createElement('option');\n    option.textContent = opt;\n    option.value = opt;\n    priority.appendChild(option);\n  });\n\n  title.value = (task.name)? task.name: '';\n  priority.value = (task.priority)? task.priority: 'Low';\n\n  this.appendChild(titleLabel);\n  this.appendChild(priorityLabel);\n  this.appendChild(confirmBtn);\n}\n\nfunction editEvent(task) {\n  removeEditBox();\n  if(this.classList.contains('active')) {\n    const active = document.querySelectorAll('.edit.active');\n    active.forEach((span) => span.classList.remove('active'));\n    return;\n  }\n  const editBox = createEditForm(this);\n  editBox.addEventListener('animationend', putInputs.bind(editBox, task));\n  body.appendChild(editBox);\n}\n\nfunction  createTaskTag(task) {\n  const hour = document.createElement('div');\n  const myPara = document.createElement('p');\n  const myh3 = document.createElement('h3');\n  const myBox = document.createElement('div');\n  const editSpan = document.createElement('span');\n  const removeSpan = document.createElement('span');\n  const myCheck = document.createElement('input');\n\n  myCheck.setAttribute('type', 'checkbox');\n\n  myPara.textContent = (task.time < 10)?`0${task.time}:00`: `${task.time}:00`;\n\n  hour.classList.add('hour');\n  myPara.classList.add('time');\n  myh3.classList.add('task-title');\n  myBox.classList.add('tool-box');\n  editSpan.classList.value = 'far fa-edit edit';\n  removeSpan.classList.value = 'fas fa-times remove';\n  myCheck.classList.add('isDone');\n\n  myCheck.value = task.isChecked;\n\n  editSpan.addEventListener('click', editEvent.bind(editSpan, task));\n  removeSpan.addEventListener('click', removeEvent.bind(removeEvent, task));\n  myCheck.addEventListener('change', checkEvent.bind(myCheck, task));\n\n  myBox.appendChild(editSpan);\n  myBox.appendChild(removeSpan);\n  myBox.appendChild(myCheck);\n\n  hour.appendChild(myPara);\n  hour.appendChild(myh3);\n  hour.appendChild(myBox);\n\n  return hour;\n}\n\nclass Task {\n  constructor(time) {\n    this.time = time;\n    this.isDaily = false;\n    this.isChecked = false;\n    this.taskTag = createTaskTag(this);\n    this.priority = 'Low';\n  }\n  \n  set setName(name) {\n    this.name = name;\n  }\n\n  set setPriority(priority) {\n    this.priority = priority;\n  }\n\n}\n\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Task);\n\n//# sourceURL=webpack://dynamic-schedule/./src/task.js?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		if(__webpack_module_cache__[moduleId]) {
/******/ 			return __webpack_module_cache__[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	// startup
/******/ 	// Load entry module
/******/ 	__webpack_require__("./src/index.js");
/******/ 	// This entry module used 'exports' so it can't be inlined
/******/ })()
;