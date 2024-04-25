const hourContainerEl = document.querySelector("#number-container-hour");
const hourEl = document.querySelector("#value-hour");
const minuteContainerEl = document.querySelector("#number-container-minute");
const minuteEl = document.querySelector("#value-minute");
const secondContainerEl = document.querySelector("#number-container-second");
const secondEl = document.querySelector("#value-second");
const millisecondEl = document.querySelector("#value-millisecond");
const countDown = document.querySelector("#countdown");

const hourSemiColonEl = document.querySelector("#hour-semicolon");
const minuteSemiColonEl = document.querySelector("#minute-semicolon");

const launchDate = new Date(2024, 3, 25, 18).getTime();
// const launchDate = new Date().getTime() + 6200;

// Update every second
const interval = setInterval(() => {
  const now = new Date().getTime();
  const distance = launchDate - now;
  const hours = Math.floor(
    (distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
  )
    .toString()
    .padStart(2, "0");
  console.log(hours);

  const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60))
    .toString()
    .padStart(2, "0");
  const seconds = Math.floor((distance % (1000 * 60)) / 1000)
    .toString()
    .padStart(2, "0");

  const milliseconds = Math.floor(distance % 1000)
    .toString()
    .padStart(3, "0");

  // If less than a hour left, dont show hours
  if (distance < 360000) {
    hourContainerEl.outerHTML = "";
    hourSemiColonEl.outerHTML = "";
  }

  // If less than a minute left, show milliseconds
  if (distance < 60000) {
    minuteContainerEl.outerHTML = "";
    minuteSemiColonEl.outerHTML = "";
    secondEl.innerHTML = seconds + "." + milliseconds;
  } else {
    hourEl.innerHTML = hours;
    minuteEl.innerHTML = minutes;
    secondEl.innerHTML = seconds;
  }

  // If the countdown is finished, write some text
  if (distance < 0) {
    clearInterval(interval);

    fireworks();
    setTimeout(() => {
      const fireworksEl = document.querySelector("#fireworks-effect");
      fireworksEl.style.transition = "opacity 5s";
      fireworksEl.style.opacity = "0";
    }, 20000);

    countDown.innerHTML = "PRISUTDELNING!";
  }
}, 64);

// CONFETTI

function fireworks() {
  tsParticles.load({
    id: "fireworks-effect",
    options: {
      duration: 30,
      preset: "fireworks",
    },
  });
}
