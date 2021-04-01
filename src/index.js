import Week from './week';
import { jsPDF } from "jspdf";

(function(){
  const btns = document.querySelectorAll('.btn.day');
  const todayBtn = document.querySelector('.today');
  const weekBtn = document.querySelector('.week');
  const today = new Date();
  const week = new Week();
  const body = document.querySelector('body');
  const container = document.querySelector('.container');

  function start() {
    const ptsTag = document.querySelector('.pts');
    const myDay = week.days.find((day) => (day.date.getDay() === today.getDay()));
    // ptsTag.textContent = userPts + 'pts';
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

  function downloadPDF() {
    const box = document.querySelector('.box');
    const doc = new jsPDF({
      orientation: "landscape",
      unit: 'px',
      hotfixes: ["px_scaling"],
      format: 'a4'
    });
    doc.html(box, {
      callback: function (doc) {
        doc.save('schedule.pdf');
      },
      x: 81,
      y: 200
   });
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
    const downloadBtn = document.createElement('button');
    const icon = document.createElement('i');

    downloadBtn.classList.add('download');
    icon.classList.value = 'fas fa-file-download download-icon';

    downloadBtn.textContent = 'Download Pdf';
    downloadBtn.appendChild(icon);
    downloadBtn.addEventListener('click', downloadPDF);

    cleanContainer();
    container.appendChild(week.getTable);
    container.appendChild(downloadBtn);
  });
  start();
})()
