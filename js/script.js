"use strict";

(() => {
  /* Time variables */
  let time = 0;
  let timer;
  let minutes;
  let seconds;

  /* Brush variables */
  const brushButton = document.querySelector(".brush-button");
  const colorsContainer = document.querySelector(".colors-container");
  const colors = document.querySelectorAll(".color");

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

  /* Pausing timer variable */
  const pauseButton = document.querySelector(".pause-button");

  /* Stopping timer and saving timer's recent score to archives' variables */
  const recentTime = document.querySelector(".recent-time");
  const stopButton = document.querySelector(".stop-button");

  let archivedNumber = 0;

  /* Reset button variable */
  const resetButton = document.querySelector(".reset-button");

  /* Archive variables */
  const archiveButton = document.querySelector(".archive-button");
  const archivedEl = document.querySelector(".archived");

  ///////////////////////////////////////////////////////////////
  /* Brush container functions and listeners */
  colors.forEach((col) =>
    col.addEventListener("click", (e) => {
      const colorCode = getComputedStyle(e.target).backgroundColor;
      document.documentElement.style.setProperty("--primary-color", colorCode);
    })
  );

  const showColors = () => {
    colorsContainer.classList.toggle("show-colors");
  };

  brushButton.addEventListener("click", showColors);

  /* Modal functions and listeners */
  const toggleModal = () => {
    [modalContainer, overlay].forEach((el) => el.classList.toggle("hidden"));
  };

  openModalButton.addEventListener("click", toggleModal);
  closeModalButton.addEventListener("click", toggleModal);

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
      }, 1000);
    }
  };

  playButton.addEventListener("click", runTimer);

  /* Pausing timer functions and listeners */
  const pauseTimer = () => {
    clearInterval(timer);
    timeContainer.classList.remove("timer-run");
  };

  pauseButton.addEventListener("click", pauseTimer);

  /* Helper function to keep DRY */
  const timeResetter = () => {
    time = 0;
    minutesEl.textContent = "0";
    secondsEl.textContent = "00";
  };

  /* Stopping and saving timer functions and listeners*/
  const stopAndSaveTime = () => {
    if (secondsEl.textContent === "00") return;

    timeResetter();

    recentTime.textContent = `Ostatni czas: ${minutes}:${seconds}`;

    timeContainer.classList.remove("timer-run");

    archivedNumber++;
    if (archivedNumber > 6) {
      archivedNumber = 1;
      archivedEl.innerHTML = ``;
    }
    archivedEl.insertAdjacentHTML(
      "beforeend",
      `<p>Pomiar nr ${archivedNumber}: <span>${minutes}:${seconds}</span></p>
  `
    );

    clearInterval(timer);
  };

  stopButton.addEventListener("click", stopAndSaveTime);

  /* Reset button functions and listeners */
  const resetAll = () => {
    timeResetter();
    archivedNumber = 0;
    recentTime.textContent = ``;
    archivedEl.innerHTML = ``;

    timeContainer.classList.remove("timer-run");
    clearInterval(timer);
  };

  resetButton.addEventListener("click", resetAll);

  /* Archive functions and listeners */

  const toggleArchived = () => {
    archivedEl.classList.toggle("hidden");
  };

  archiveButton.addEventListener("click", toggleArchived);
})();
