const toggleBtn = document.getElementById("themeToggle");
const themeIcon = document.getElementById("themeIcon");

// Apply saved theme on load
function loadTheme() {
  const savedTheme = localStorage.getItem("theme");

  if (savedTheme === "light") {
    document.body.classList.add("light-mode");
    themeIcon.className = "ri-sun-line";
  } else {
    document.body.classList.remove("light-mode");
    themeIcon.className = "ri-moon-line";
  }
}

loadTheme();

// Toggle theme
toggleBtn.addEventListener("click", () => {
  document.body.classList.toggle("light-mode");

  if (document.body.classList.contains("light-mode")) {
    localStorage.setItem("theme", "light");
    themeIcon.className = "ri-moon-line";
  } else {
    localStorage.setItem("theme", "dark");
    themeIcon.className = "ri-sun-line";
  }
});

// Load saved theme
if (localStorage.getItem("theme") === "light") {
  document.body.classList.add("light-mode");
}

function openFeatures() {
  var allElem = document.querySelectorAll(".elem");
  var fullPages = document.querySelectorAll(".fullElem");
  var backBtns = document.querySelectorAll(".fullElem .back");

  // Hide all pages initially
  fullPages.forEach(page => page.style.display = "none");

  // Check saved page
  var activePage = localStorage.getItem("activePage");

  if (activePage !== null && fullPages[activePage]) {
    fullPages[activePage].style.display = "block";
  }

  // Open section
  allElem.forEach(function (elem) {
    elem.addEventListener("click", function () {
      fullPages.forEach(page => page.style.display = "none");

      localStorage.setItem("activePage", elem.id);
      fullPages[elem.id].style.display = "block";
    });
  });

  // Back button
  backBtns.forEach(function (btn) {
    btn.addEventListener("click", function () {
      fullPages.forEach(page => page.style.display = "none");

      localStorage.removeItem("activePage");
    });
  });
}

openFeatures();


let form = document.querySelector(".addTask form");
let Taskinput = document.querySelector(".addTask form #task-input");
let TasktextareaInput = document.querySelector(".addTask form textarea");
let TaskCheckbox = document.querySelector(".addTask form #check");

/* ================= TODO FUNCTION ================= */

function todoList() {
  var CurrentTask = [];

  // Load from storage
  if (localStorage.getItem("currentTask")) {
    try {
      CurrentTask = JSON.parse(localStorage.getItem("currentTask"));
    } catch (error) {
      CurrentTask = [];
    }
  }

  /* ---------------- RENDER FUNCTION ---------------- */

  function renderTask() {
    // Save state
    localStorage.setItem("currentTask", JSON.stringify(CurrentTask));

    let allTask = document.querySelector(".allTask");
    let sum = "";

    CurrentTask.forEach(function (elem, idx) {
      sum += `
        <div class="task">
          <h5 class="task-title" data-id="${idx}">
            ${elem.task}
            <span class="${elem.imp}">imp</span>
          </h5>

          <div class="task-details" id="details-${idx}">
            <p>${elem.textArea}</p>
          </div>

          <button data-id="${idx}">Mark as Completed</button>
        </div>
      `;
    });

    allTask.innerHTML = sum;

    /* -------- Delete Logic -------- */

    var markCompleted = document.querySelectorAll(".task button");

    markCompleted.forEach(function (btn) {
      btn.addEventListener("click", function () {
        var id = btn.dataset.id;
        CurrentTask.splice(id, 1);
        renderTask();
      });
    });

    /* -------- Expand / Collapse -------- */

    var titles = document.querySelectorAll(".task-title");

    titles.forEach(function (title) {
      title.addEventListener("click", function () {
        var id = title.dataset.id;
        var details = document.getElementById(`details-${id}`);
        console.log("clicked", id);
        details.classList.toggle("show");
      });
    });
  }

  renderTask();

  /* ---------------- ADD TASK ---------------- */

  form.addEventListener("submit", function (e) {
    e.preventDefault();

    CurrentTask.push({
      task: Taskinput.value,
      textArea: TasktextareaInput.value,
      imp: TaskCheckbox.checked,
    });

    Taskinput.value = "";
    TasktextareaInput.value = "";
    TaskCheckbox.checked = false;

    renderTask();
  });
}

todoList();

function dailyPlanner() {
  var dayPlanData = JSON.parse(localStorage.getItem("dayPlanData")) || {};
  var dayPlanner = document.querySelector(".day-planner");

  var hours = Array.from(
    { length: 18 },
    (elem, idx) => `${6 + idx}:00 - ${7 + idx}:00`,
  );

  var WholeDaySum = "";

  hours.forEach(function (elem, idx) {
    var saveData = dayPlanData[idx] || " ";
    WholeDaySum += ` <div class="day-planner-time">
            <p>${elem}</p>
            <input id="${idx}" type="text" placeholder="........" value=${saveData}>
          </div>`;
  });
  dayPlanner.innerHTML = WholeDaySum;

  var dayPlannerInput = document.querySelectorAll(".day-planner input");
  dayPlannerInput.forEach(function (elem) {
    elem.addEventListener("input", function () {
      dayPlanData[elem.id] = elem.value;
      localStorage.setItem("dayPlanData", JSON.stringify(dayPlanData));
    });
  });
}
dailyPlanner();


var motivationQuote = document.querySelector(".motivation2 h1");
var motivationAuthor = document.querySelector(".motivation3 h2");

async function fetchQuote() {
  try {
    let response = await fetch(
      "https://motivational-spark-api.vercel.app/api/quotes/random",
      {
        cache: "no-store"
      }
    );

    let data = await response.json();
    console.log(data);

    motivationQuote.textContent = data.quote;
    motivationAuthor.textContent = "- " + data.author;

  } catch (error) {
    console.log("Error fetching quote:", error);
  }
}

fetchQuote();


function pomodoroTimer() {
  let timer = document.querySelector(".pomo-timer h1");
  var startBtn = document.querySelector(".pomo-timer .start-timer");
  var pauseBtn = document.querySelector(".pomo-timer .Pause-timer");
  var resetBtn = document.querySelector(".pomo-timer .Reset-timer");
  var session = document.querySelector(".pomo-full .session");
  const alarmSound = document.getElementById("alarmSound");

  var isWorkSession = true;
  let timerInterval = null;
  let totalSeconds = 25 * 60;
  session.style.boxShadow = "0 0 10px var(--completed)";

  // Play alarm sound
  function playSound() {
    alarmSound.currentTime = 0;
    alarmSound.play();
  }

  // Update timer display
  function updateTimer() {
    let minutes = Math.floor(totalSeconds / 60);
    let seconds = totalSeconds % 60;

    timer.innerHTML = `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`;
  }

  // Start timer
  function startTimer() {
    // Stop alarm if playing
    alarmSound.pause();
    alarmSound.currentTime = 0;

    clearInterval(timerInterval);

    if (isWorkSession) {
      totalSeconds = 25 * 60;

      timerInterval = setInterval(() => {
        if (totalSeconds > 0) {
          totalSeconds--;
          updateTimer();
        } else {
          isWorkSession = false;
          clearInterval(timerInterval);

          timer.innerHTML = "05:00";
          session.innerHTML = "Break";
          session.style.background = "var(--missed-soft)";
          session.style.color = "var(--missed)";
          session.style.boxShadow = "0 0 10px var(--missed)";
          showToast("Work session completed. Take a short break.");
          startTimer(); // Automatically start break
        }
      }, 1000);
    } else {
      totalSeconds = 5 * 60;

      timerInterval = setInterval(() => {
        if (totalSeconds > 0) {
          totalSeconds--;
          updateTimer();
        } else {
          isWorkSession = true;
          clearInterval(timerInterval);

          timer.innerHTML = "25:00";
          session.innerHTML = "Work Session";

          session.innerHTML = "Work Session";
          session.style.background = "var(--completed-soft)";
          session.style.color = "var(--completed)";
          session.style.boxShadow = "0 0 10px var(--completed)";
          showToast("Break is over. Time to focus.");
          playSound(); // Play sound when break ends
        }
      },1000);
    }
  }

  // Pause timer
  function pauseTimer() {
    clearInterval(timerInterval);
    alarmSound.pause();
    alarmSound.currentTime = 0;
  }

  // Reset timer
  function resetTimer() {
    clearInterval(timerInterval);

    alarmSound.pause();
    alarmSound.currentTime = 0;

    isWorkSession = true;
    totalSeconds = 25 * 60;

    session.innerHTML = "Work Session";
    session.style.background = "var(--completed-soft)";
    session.style.color = "var(--completed)";
    session.style.boxShadow = "0 0 10px var(--completed)";
    updateTimer();
  }

  pauseBtn.addEventListener("click", pauseTimer);
  startBtn.addEventListener("click", startTimer);
  resetBtn.addEventListener("click", resetTimer);

  updateTimer();

  const toast = document.getElementById("toast");

  function showToast(message) {
    toast.innerText = message;
    toast.classList.add("show");

    setTimeout(() => {
      toast.classList.remove("show");
    }, 3000);
  }
}
pomodoroTimer();

//  weather

function Weather() {
  var city = "Bhubaneswar";
  var data = null;
  var apiKey = "d381dddf083f46f7b0a62647262202";

  var header1Time = document.querySelector(".header1 h1");
  var header1Date = document.querySelector(".header1 h2");
  var header2Temp = document.querySelector(".header2 h2");
  var header2Condition = document.querySelector(".header2 h4");
  var header2Percipitation = document.querySelector(".header2 .per");
  var header2Humidity = document.querySelector(".header2 .hum");
  var header2Wind = document.querySelector(".header2 .win");

  async function weatherAPIcall() {
    try {
      const apiKey = "95029210600ba4fe1f2f357f98b81372";

      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`,
      );

      if (!response.ok) {
        throw new Error("City not Found");
      }

      const data = await response.json();
      console.log(data);

      header2Temp.innerHTML = `${data.main.temp}°C`;
      header2Condition.innerHTML = data.weather[0].description;

      // Converting  m/s to km/h
      header2Wind.innerHTML = `Wind: ${(data.wind.speed * 3.6).toFixed(1)} km/h`;

      header2Humidity.innerHTML = `Humidity: ${data.main.humidity}%`;

      // 🌧 Rain (safe check)
      const rain = data.rain?.["1h"] || 0;
      header2Percipitation.innerHTML = `Precipitation: ${rain} mm`;
    } catch (error) {
      console.error(error.message);
    }
  }

  weatherAPIcall();

  function timeDate() {
    const days = [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
    ];
    const months = [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ];
    const now = new Date();

    const daysOfWeek = days[now.getDay()];
    const date = now.getDate();
    const month = months[now.getMonth()];
    const year = now.getFullYear();

    let hours = now.getHours();
    const minutes = String(now.getMinutes()).padStart(2, "0");
    const seconds = String(now.getSeconds()).padStart(2, "0");

    if (hours === 0) {
      hours = 12;
    }

    if (hours > 12) {
      header1Time.innerHTML = `${daysOfWeek}, ${hours - 12}:${minutes}:${seconds} PM`;
    } else if (hours === 12) {
      header1Time.innerHTML = `${daysOfWeek}, ${hours}:${minutes}:${seconds} PM`;
    } else {
      header1Time.innerHTML = `${daysOfWeek}, ${hours}:${minutes}:${seconds} AM`;
    }

    header1Date.innerHTML = `${date} ${month}, ${year}`;
  }

  setInterval(timeDate, 1000);
}
Weather();

function dailyGoals() {
  let goals = JSON.parse(localStorage.getItem("goals")) || [];

  const addBtn = document.getElementById("addGoalBtn");
  const form = document.getElementById("goalForm");
  const saveBtn = document.getElementById("saveGoal");
  const goalList = document.querySelector(".goal-list");
  const tabs = document.querySelectorAll(".tab");

  let activeTab = "ongoing";

  addBtn.addEventListener("click", () => {
    form.style.display = form.style.display === "block" ? "none" : "block";
  });

  saveBtn.addEventListener("click", () => {
    const title = document.getElementById("goalTitle").value;
    const date = document.getElementById("goalDate").value;

    if (!title || !date) return;

    goals.push({
      title,
      date,
      status: "ongoing",
    });

    localStorage.setItem("goals", JSON.stringify(goals));
    form.style.display = "none";
    document.getElementById("goalTitle").value = "";
    renderGoals();
  });

  tabs.forEach((tab) => {
    tab.addEventListener("click", () => {
      tabs.forEach((t) => t.classList.remove("active"));
      tab.classList.add("active");
      activeTab = tab.dataset.type;
      renderGoals();
    });
  });

  function checkMissedGoals() {
    const today = new Date();
    today.setHours(0, 0, 0, 0); // normalize

    goals.forEach((goal) => {
      if (goal.status === "ongoing") {
        const deadline = new Date(goal.date);
        deadline.setHours(0, 0, 0, 0);

        if (today > deadline) {
          goal.status = "missed";
        }
      }
    });

    localStorage.setItem("goals", JSON.stringify(goals));
  }

  function renderGoals() {
    checkMissedGoals();
    goalList.innerHTML = "";

    let filtered = goals.filter((goal) => goal.status === activeTab);

    let ongoingCount = goals.filter((g) => g.status === "ongoing").length;
    let completedCount = goals.filter((g) => g.status === "completed").length;
    let missedCount = goals.filter((g) => g.status === "missed").length;

    tabs[0].innerText = `Ongoing (${ongoingCount})`;
    tabs[1].innerText = `Completed (${completedCount})`;
    tabs[2].innerText = `Missed (${missedCount})`;

    filtered.forEach((goal, index) => {
      const card = document.createElement("div");
      card.classList.add("goal-card");
      card.classList.add(goal.status);

      card.innerHTML = `
        <div class="goal-content">
          <div>
            <h4>${goal.title}</h4>
            <p>${goal.date}</p>
          </div>
        </div>
      `;

      if (goal.status === "ongoing") {
        const btn = document.createElement("button");
        btn.innerText = "Mark Completed";
        btn.addEventListener("click", () => {
          goal.status = "completed";
          localStorage.setItem("goals", JSON.stringify(goals));
          renderGoals();
        });
        card.appendChild(btn);
      }

      // Delete button (for completed & missed)
      if (goal.status === "completed" || goal.status === "missed") {
        const deleteBtn = document.createElement("button");
        deleteBtn.className = "delete-btn";
        deleteBtn.innerHTML = "🗑";

        deleteBtn.addEventListener("click", () => {
          goals.splice(index, 1);
          localStorage.setItem("goals", JSON.stringify(goals));
          renderGoals();
        });

        card.appendChild(deleteBtn);
      }

      goalList.appendChild(card);
    });
  }

  renderGoals();
}

dailyGoals();
