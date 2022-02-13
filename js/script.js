"use strict";

/* Modal variables */
const openModalButton = document.querySelector(".modal-button");
const closeModalButton = document.querySelector(".close-modal");
const modalContainer = document.querySelector(".modal-container");
const overlay = document.querySelector(".overlay");

/* Starting timer variables */
const playButton = document.querySelector(".play-button");
const minutesEl = document.querySelector(".minutes");
const secondsEl = document.querySelector(".seconds");
const timeContainer = document.querySelector(".time-container");

let time = 0;
let timer;
let minutes;
let seconds;

/* Pausing timer variables */
const pauseButton = document.querySelector(".pause-button");

/* Stopping and saving timer's last score to archives' variables */
const lastTime = document.querySelector(".last-time");
const stopButton = document.querySelector(".stop-button");

let archivedNumber = 0;

/* Reset all variables */
const resetButton = document.querySelector(".reset-button");

/* Archive variables */
const archiveButton = document.querySelector(".archive-button");
const archivedEl = document.querySelector(".archived");

///////////////////////////////////////////////////////////////
/* Modal functions and listeners */
const showModal = () => {
  [modalContainer, overlay].forEach((el) => el.classList.remove("hidden"));
};

const closeModal = () => {
  [modalContainer, overlay].forEach((el) => el.classList.add("hidden"));
};

openModalButton.addEventListener("click", showModal);
closeModalButton.addEventListener("click", closeModal);

/* Starting timer functions and listeners */
const runTimer = () => {
  if (!timeContainer.classList.contains("timer-run")) {
    timeContainer.classList.add("timer-run");
    timer = setInterval(() => {
      time++;
      seconds = Math.floor(time % 60);
      seconds = seconds < 10 ? `0${seconds}` : seconds;
      minutes = Math.floor(time / 60);
      minutesEl.textContent = minutes;
      secondsEl.textContent = seconds;
    }, 100);
  }
};

playButton.addEventListener("click", runTimer);

/* Pausing timer functions and listeners */
const pauseTimer = () => {
  clearInterval(timer);
  timeContainer.classList.remove("timer-run");
};

pauseButton.addEventListener("click", pauseTimer);

/* Stop and save functions and listeners*/

const stopAndSaveTime = () => {
  time = 0;
  timeContainer.classList.remove("timer-run");
  lastTime.textContent = `Ostatni czas: ${minutes}:${seconds}`;
  minutesEl.textContent = "0";
  secondsEl.textContent = "00";

  archivedNumber++;
  if (archivedNumber > 6) {
    archivedNumber = 1;
    archivedEl.innerHTML = ``;
  }
  clearInterval(timer);
  archivedEl.insertAdjacentHTML(
    "beforeend",
    `        <p>Pomiar nr ${archivedNumber}: <span>${minutes}:${seconds}</span></p>
  `
  );
};

stopButton.addEventListener("click", stopAndSaveTime);

/* Reset button functions and listeners */
const resetAll = () => {
  time = 0;
  timeContainer.classList.remove("timer-run");
  lastTime.textContent = ``;
  minutesEl.textContent = "0";
  secondsEl.textContent = "00";
  archivedEl.innerHTML = ``;
  archivedNumber = 0;
};

resetButton.addEventListener("click", resetAll);

/* Archive functions and listeners */

const toggleArchived = () => {
  archivedEl.classList.toggle("hidden");
};

archiveButton.addEventListener("click", toggleArchived);
