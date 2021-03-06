//  ********** GLOBAL VARIABLES and CONSTANTS *****************
const morning_background = "url('img/morning.jpeg')";
const afternoon_background = "url('img/afternoon.jpeg')";
const evening_background = "url('img/evening.jpeg')";

// =-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=
function showDate() {
  const days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday"
  ];

  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December"
  ];

  let today = new Date(),
    day = today.getDay(),
    dato = today.getDate(),
    month = today.getMonth(),
    year = today.getFullYear();

  let fullDate = days[day] + ", " + dato + " " + months[month] + " " + year;

  document.getElementById("xdate").innerHTML = fullDate;
}

// =-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=
function showTime() {
  let today = new Date(),
    hour = today.getHours(),
    min = today.getMinutes();
  let amPm;

  if (hour < 12) {
    amPm = "am";
  } else if (hour >= 12) {
    amPm = "pm";
  }

  if (hour > 12) {
    hour -= 12;
  } else if (hour == 0) {
    hour = 12;
  }

  min = (parseInt(min, 10) < 10 ? "0" : "") + min; // add leading zero
  let fullTime = hour + ":" + min;

  document.getElementById("time").innerHTML = fullTime;
  document.getElementById("ampm").innerHTML = amPm;
}

// =-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=
function setGreet() {
  let today = new Date(),
    hour = today.getHours(),
    greeting = document.getElementById("greeting");
  let name = getName();

  if (name == null) {
    name = "";
  }

  if (hour < 12) {
    greeting.textContent = `Good morning, ${name}`;
    document.body.style.backgroundImage = morning_background;
  } else if (hour < 18) {
    greeting.textContent = `Good afternoon, ${name}`;
    document.body.style.backgroundImage = afternoon_background;
  } else {
    greeting.textContent = `Good evening, ${name}`;
    document.body.style.backgroundImage = evening_background;
  }
}

// =-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=
function showPhase() {
  const phase = [
    "New Moon",
    "Waxing Crescent Moon",
    "First Quarter Moon",
    "Waxing Gibbous Moon",
    "Full Moon",
    "Waning Gibbous Moon",
    "Last Quarter Moon",
    "Waning Crescent Moon"
  ];

  let c = (e = jd = b = 0);
  let today = new Date(),
    dato = today.getDate(),
    month = today.getMonth(),
    year = today.getFullYear();

  if (month < 3) {
    year--; // apparently the year begins in April
    month += 12;
  }

  month++;

  c = 365.25 * year; //no. of days since year 0
  e = 30.6 * month; //no. of days this month
  jd = c + e + dato - 694039.09; // current julian day - based on julian day for 1900.01.01 (a known full moon)
  jd /= 29.5305882; // divided by the lunar cycle, giving lunation rounded to nearest whole day
  b = parseInt(jd); // discard fraction
  jd -= b; // subtract the integer from the julian day, leaving the fractional part
  b = Math.round(jd * 8); // divide into pieces of eight

  if (b >= 8) {
    b = 0; // 0 and 8 are the same, so, reset
  }

  document.getElementById("moonphase").innerHTML = phase[b];
  let moonIconString = `<img src='svg/${phase[b]}.svg'</img>`;
  document.getElementById("moonicon").innerHTML = moonIconString;
}

// =-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=
function floatingHolidays() {
  let today = new Date(),
    month = today.getMonth(),
          day = today.getDay(),
          dato = today.getDate(),
          week = Math.floor(dato / 7),
          key = month + "," + week + "," + day;

  var holidays = {
    // keys are formatted as month,week,day
    "0,2,1": "Martin Luther King, Jr. Day", //3rd Mon in Jan
    "1,2,1": "President's Day", //3rd Mon in Feb
    "2,1,0": "Daylight Savings Time Begins", //2nd Sun in April
    "4,1,0": "Mother's Day", //2nd Sun in May
    "4,-1,1": "Memorial Day", //Last Mon in May
    "5,2,0": "Father's Day", //3rd Sun in Jun
    "8,0,1": "Labor Day", //1st Mon in Sept
    "9,1,1": "Columbus Day", //2nd Mon in Oct
    "10,0,0": "Daylight Savings Time Ends", //1st Sun in Nov
    "10,3,4": "Thanksgiving Day" //4th Thu in Nov
  };

  let holiday = holidays[key];

  if (holiday) {
    return holiday;
  } else {
    return false;
  }
}

// =-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=
// Astronomical solstices and equinoxes not yet supported
// rewrite to use keys as in floatingHolidays() above
// note: fixed and floating holidays and quote arrays could
// be created as JSON file to make customizable
function getMessage() {
  let today = new Date();

  if (today.getMonth() === 0 && today.getDate() === 1) {
    return "New Year's Day";
  } else if (today.getMonth() === 0 && today.getDate() === 25) {
    return "You & Me Day";
  } else if (today.getMonth() === 1 && today.getDate() === 14) {
    return "Cam's Birthday";
  } else if (today.getMonth() === 2 && today.getDate() === 17) {
    return "St Patrick's Day";
  } else if (today.getMonth() === 4 && today.getDate() === 25) {
    return "St. Bede's Day";
  } else if (today.getMonth() === 5 && today.getDate() === 11) {
    return "Anniversary";
  } else if (today.getMonth() === 5 && today.getDate() === 14) {
    return "Flag Day";
  } else if (today.getMonth() === 5 && today.getDate() === 21) {
    return "Ancestors Day";
  } else if (today.getMonth() === 5 && today.getDate() === 24) {
    return "Penny Jean Day";
  } else if (today.getMonth() === 6 && today.getDate() === 2) {
    return "Dad's Birthday";
  } else if (today.getMonth() === 6 && today.getDate() === 4) {
    return "Independence Day";
  } else if (today.getMonth() === 6 && today.getDate() === 6) {
    return "Happy Birthday!";
  } else if (today.getMonth() === 6 && today.getDate() === 30) {
    return "Honey Jean Day";
  } else if (today.getMonth() === 6 && today.getDate() === 31) {
    return "Lisa's Birthday";
  } else if (today.getMonth() === 7 && today.getDate() === 1) {
    return "Swiss National Day";
  } else if (today.getMonth() === 8 && today.getDate() === 15) {
    return "Mom's Birthday";
  } else if (today.getMonth() === 8 && today.getDate() === 27) {
    return "Hans arrived in America (1710)";
  } else if (today.getMonth() === 9 && today.getDate() === 31) {
    return "Halloween";
  } else if (today.getMonth() === 10 && today.getDate() === 11) {
    return "Veteran's Day";
  } else if (today.getMonth() === 11 && today.getDate() === 24) {
    return "Christmas Eve";
  } else if (today.getMonth() === 11 && today.getDate() === 25) {
    return "Christmas";
  } else if (today.getMonth() === 11 && today.getDate() === 31) {
    return "New Year's Eve";
  } else {
    return "random";
  }
}

// =-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=
function rndMessage() {
  const randomMessages = [
    "Democracy doesn't work",
    "You matter",
    "Never stop dreaming",
    "Be creative",
    "Live simply",
    "Remember who you are",
    "Trust your intuition",
    "Choose joy",
    "Be yourself",
    "Focus on the positive",
    "Create",
    "Shouldn't you be coding?",
    "Hail, Thunar!",
    "We invented everything",
    "Beagle nationalism",
    "Honor your ancestors",
    "Today's the day",
    "Be a jarl",
    "I created this",
    "The first Noble Virtue is Courage",
    "The second Noble Virtue is Truth",
    "The third Noble Virtue is Honor",
    "The fourth Noble Virtue is Fidelity",
    "The fifth Noble Virtue is Discipline",
    "The sixth Noble Virtue is Hospitality",
    "The seventh Noble Virtue is Self-Reliance",
    "The eighth Noble Virtue is Industriousness",
    "The ninth Noble Virtue is Perseverance",
    "Strength is better than weakness",
    "Courage is better than cowardice",
    "Joy is better than guilt",
    "Honor is better than dishonor",
    "Freedom is better than slavery",
    "Kinship is better than alienation",
    "Realism is better than dogmatism",
    "Vigor is better than lifelessness",
    "Ancestry is better than rootlessness"
  ];

  let max = randomMessages.length;
  let rndNum = Math.floor(Math.random() * max);
  return randomMessages[rndNum];
}

// =-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=
function showMessage() {
  let a_holiday = "",
    message = "";
  a_holiday = floatingHolidays();

  if (a_holiday) {
    message = a_holiday;
  } else {
    message = getMessage();
    if (message === "random") {
      message = rndMessage();
    }
  }

  document.getElementById("message").innerHTML = message;
}

// =-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=
function showWeather() {
  let lat, long;
  let temp = document.getElementById("temperature"),
    heat_index = document.getElementById("heat-index"),
    summ = document.getElementById("summary"),
    ico = document.getElementById("icon");

  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(position => {
      lat = position.coords.latitude;
      long = position.coords.longitude;
      const proxy = "https://cors-anywhere.herokuapp.com/";
      const api = `${proxy}https://api.darksky.net/forecast/${config.key}/${lat},${long}`;

      fetch(api)
        .then(weather_data => {
          return weather_data.json();
        })
        .then(weather_data => {
          const { temperature } = weather_data.currently;
          const { summary } = weather_data.currently;
          const { apparentTemperature } = weather_data.currently;
          const { icon } = weather_data.currently;

          const weather_icon = `<img src='svg/${icon}.svg'</img>`;

          temp.innerHTML = "Temperature: " + parseInt(temperature) + "&#176;";
          heat_index.innerHTML =
            "Feels like: " + parseInt(apparentTemperature) + "&#176;";
          summ.textContent = "Currently, " + summary.toLowerCase();
          ico.innerHTML = weather_icon;
        });
    });
  } else {
    // if geolocation does not work
    document.getElementById("summary").textContent =
      "Unable to retrieve weather.";
  }
  setTimeout(showWeather, 300000);
}

// =-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=
// This can be done differently... and better
function getName() {
  let name = document.getElementById("name");
  if (localStorage.getItem("name") === null) {
    name.textContent = "[Enter Name]";
    name.style.visibility = "visible";
  } else {
    let stored_name = localStorage.getItem("name");
    name.style.visibility = "hidden";
    // name.textContent = localStorage.getItem("name");
    return stored_name;
  }
}

// =-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=
function setName(event) {
  let name = document.getElementById("name");
  if (event.type === "keypress") {
    if (event.which == 13 || event.keycode == 13) {
      localStorage.setItem("name", event.target.innerText);
      name.blur();
    }
  } else {
    localStorage.setItem("name", event.target.innerText);
  }
}

// =-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=
function changeMessage() {
  let now = new Date(),
    hour = now.getHours(),
    minute = now.getMinutes(),
    seconds = now.getSeconds();

  if (hour == 0 && minute == 0 && seconds <= 7) {
    showMessage(); // change the message at midnight
  }
}

// =================================================================
function getBeats() {
  const beats = document.getElementById("beats");
  const secondsPerBeat = 86.4;
  let iTime = new Date();
  let seconds = iTime.getUTCSeconds();
  let minutes = iTime.getUTCMinutes();
  let hours = iTime.getUTCHours();

  // correct for UTC + 1 (BMT)
  if (hours === 23) {
    hours = 0;
  } else {
    hours++;
  }

  // convert the time to standard seconds
  let BMTinSeconds = (hours * 60 + minutes) * 60 + seconds;

  // convert standard seconds to internet time and set decimal to tenths
  let internetTime = (BMTinSeconds / secondsPerBeat).toFixed(1);

  // format internet time
  internetTime = "@".concat(
    "000".concat(internetTime).slice(internetTime.length - 2)
  );

  // show on page
  beats.innerText = internetTime;
}

// =-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=
function initialize() {
  showMessage(); // set initial message
  showWeather(); // show initial weather
  getName();
  let name = document.getElementById("name");
  name.addEventListener("keypress", setName);
}

// =-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=
function main() {
  showDate();
  showTime();
  setGreet();
  showPhase();
  changeMessage();
  getBeats();
  setTimeout(main, 5000);
}

// =-=-=-=-=-=-= APP BEGINS HERE =-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-
// initialize is called here so that it isnt looped by setTimeout
initialize();
main();
