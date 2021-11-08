// This is an array of timeslot object from 9am to 5pm.
let timeBlockArray = [
  { id: 1, info: "", startTime: 9 },
  { id: 2, info: "", startTime: 10 },
  { id: 3, info: "", startTime: 11 },
  { id: 4, info: "", startTime: 12 },
  { id: 5, info: "", startTime: 13 },
  { id: 6, info: "", startTime: 14 },
  { id: 7, info: "", startTime: 15 },
  { id: 8, info: "", startTime: 16 },
  { id: 9, info: "", startTime: 17 },
]

// click sound for save button
let clickSound = new Audio("https://www.fesliyanstudios.com/play-mp3/387")

// This is a function for the convertion of time in each loop to appropriate am and pm
function amPmConverter(val) {
  if (val < 12) {
    val = val + "am"
  } else {
    if (val > 12) {
      val = val - 12
    }
    val = val + "pm"
  }
  return val
}

// This function is to change the background color of the time blocks according to the current time if the time blocks are past the current time they will get the past class for gray background and for the time blocks that are in future they will get the future class and the current time will get the present class
function changeBgColorClass(startTime) {
  let currentHour = moment().hour()

  console.log(currentHour)

  if (startTime < currentHour) {
    return "past"
  }

  if (startTime > currentHour) {
    return "future"
  }

  if (startTime === currentHour) {
    return "present"
  }
}

//this function loops through each item in the timeBlockArray and generates the time block according to the corresponding logic provided in above functions
function timeBlockGenerator() {
  let timeBlock = ""
  //gets the stored timeBlockArray from the localstorage if it exists
  if (localStorage.getItem("timeBlockArray") !== null) {
    timeBlockArray = JSON.parse(localStorage.getItem("timeBlockArray")) // convert timeBlockArray string into object again
  }

  for (let i = 0; i < timeBlockArray.length; i++) {
    timeBlock += `
                <div class="row time-block">

                    <div class="col-md-1 hour"> ${amPmConverter(
                      timeBlockArray[i].startTime
                    )}</div>

                    <div class="col-md-10 info-area ${changeBgColorClass(
                      timeBlockArray[i].startTime
                    )}">
                      <textarea id="textarea${timeBlockArray[i].id}">${timeBlockArray[i].info}</textarea>
                    </div>

                    <div class="col-md-1 button-block"> 
                      <button onclick="saveInfo('${timeBlockArray[i].id}')"> 
                        <i class="fas fa-save fa-2x floppy"></i>
                      </button>
                    </div>

                </div>`
  }

  $(".my-content").html(timeBlock)
}

// runs when document is ready
function init() {
  timeBlockGenerator()
  currentDay()
}
// jquery method which runs when it detects the document is ready to be used
$(document).ready(init)

//prints the current day with time below the heading work day scheduler
function currentDay() {
  $("#currentDay").html(moment().format("dddd, MMMM Do, h:mm a"))
}

//plays the click sound when save button is clicked and extracts the value from the textarea element of the that time-block
function saveInfo(id) {
  clickSound.play()
  let val = $("#textarea" + id).val()
  modifyTimeBlockArray(id, val)
  showStatusBar()
}

//shows the saved status for 1 second and then hides it
function showStatusBar() {
  $(".status-bar").fadeIn(1000)
  setTimeout(function () {
    hideStatusBar()
  }, 1000)
}

// hides the status element with fade animation
function hideStatusBar() {
  $(".status-bar").fadeOut(1000)
}

//replaces the value in timeBlockArray of the current saved time block by searching that element with help of id
function modifyTimeBlockArray(id, value) {
  id = parseInt(id)

  for (let i = 0; i < timeBlockArray.length; i++) {
    if (timeBlockArray[i].id === id) {
      timeBlockArray[i].info = value
    }
  }

  localStorage.setItem("timeBlockArray", JSON.stringify(timeBlockArray))
}
