const changeClocks = document.querySelector(".clocks"),
  toggle = document.querySelector(".toggle"),
  digitalClock = document.querySelector(".digital-clock"),
  hour = document.querySelector(".hour"),
  minute = document.querySelector(".minute"),
  second = document.querySelector(".second"),
  ampm = document.querySelector(".ampm"),
  format = document.querySelector(".twelve"),
  classicClock = document.querySelector(".classic-clock"),
  hourEl = document.querySelector(".hour-needle"),
  minuteEl = document.querySelector(".minute-needle"),
  secondEl = document.querySelector(".second-needle"),
  ClassicClockHours = document.querySelector(".hours"),
  dayMonth = document.querySelector(".day-month");

let weekDay = ["sun", "mon", "tue", "wed", "thu", "fri", "sat"];
let months = [
  "january",
  "february",
  "march",
  "april",
  "may",
  "june",
  "july",
  "august",
  "september",
  "october",
  "november",
  "december",
];

changeClocks.addEventListener("click", changeTheClockType);
toggle.addEventListener("click", theme);
format.addEventListener("click", changeFormat);

function changeTheClockType(e) {
  if (e.target.classList.contains("active")) {
    e.target.classList.remove("active");
    e.target.innerHTML = "Change to Digital Clock";
    digitalClock.style.display = "none";
    classicClock.style.display = "flex";
  } else {
    e.target.classList.add("active");
    e.target.innerHTML = "Change to Classic Clock";
    digitalClock.style.display = "flex";
    classicClock.style.display = "none";
  }
}

function changeFormat(e) {
  if (e.target.classList.contains("active")) {
    e.target.classList.remove("active");
  } else {
    e.target.classList.add("active");
    e.target.innerHTML = "12";
  }
}

function theme(e) {
  const html = document.querySelector("html");
  if (html.classList.contains("dark")) {
    html.classList.remove("dark");
    e.target.innerHTML = "Dark mode";
    e.target.classList.remove("dark-toggle");
  } else {
    html.classList.add("dark");
    e.target.innerHTML = "Light mode";
    e.target.classList.add("dark-toggle");
  }
}

function clock() {
  let h = new Date().getHours();
  let m = new Date().getMinutes();
  let s = new Date().getSeconds();
  let day = new Date().getDay();
  let monthIndicator = new Date().getMonth();
  let currentDate = new Date().getDate();

  if (changeClocks.innerHTML === "Change to Classic Clock") {
    if (format.classList.contains("active")) {
      hour.innerHTML = h;
      minute.innerHTML = m;
      second.innerHTML = s;
      ampm.classList.add("format-twelve");

      if (h < 10) hour.innerHTML = "0" + h;
      if (m < 10) minute.innerHTML = "0" + m;
      if (s < 10) second.innerHTML = "0" + s;
      if (h > 12) {
        ampm.innerHTML = "PM";
        hNew = h - 12;
        if (hNew < 10) hour.innerHTML = "0" + hNew;
        else hour.innerHTML = hNew;
      }
    } else {
      hour.innerHTML = h;
      minute.innerHTML = m;
      second.innerHTML = s;
      ampm.classList.remove("format-twelve");

      if (h < 10) hour.innerHTML = "0" + h;
      if (m < 10) minute.innerHTML = "0" + m;
      if (s < 10) second.innerHTML = "0" + s;
    }
  } else {
    let hNeedle = h;
    let mins = m;

    if (m < 10) mins = "0" + m;

    if (h > 12) hNeedle = (h - 12) * 30;
    if (h <= 12) hNeedle = h * 30;
    if (m >= 12 && m < 24) hNeedle += 6;
    if (m >= 24 && m < 36) hNeedle += 12;
    if (m >= 36 && m < 48) hNeedle += 18;
    if (m >= 48 && m < 60) hNeedle += 24;

    hourEl.style.transform = `translate(-50%, -100%) rotate(${hNeedle}deg)`;
    minuteEl.style.transform = `translate(-50%, -100%) rotate(${m * 6}deg)`;
    secondEl.style.transform = `translate(-50%, -100%) rotate(${s * 6}deg)`;
    ClassicClockHours.innerHTML = `${h}:${mins}`;
    dayMonth.innerHTML = `${weekDay[day]}, ${months[monthIndicator]} <span class="circle">${currentDate}</span>`;
  }
}

let interval = setInterval(clock, 100);
