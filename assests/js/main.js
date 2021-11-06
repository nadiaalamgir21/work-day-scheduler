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

let clickSound = new Audio("https://www.fesliyanstudios.com/play-mp3/387")

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

function timeBlockGenerator() {
  let timeBlock = ""

  if (localStorage.getItem("timeBlockArray") !== null) {
    timeBlockArray = JSON.parse(localStorage.getItem("timeBlockArray")) // convert timeBlockArray string into object again
  }

  for (let i = 0; i < timeBlockArray.length; i++) {
    timeBlock += `
                <div class="time-block">
                    <div class="hour"> ${amPmConverter(
                      timeBlockArray[i].startTime
                    )}</div>

                    <div class="info-area ${changeBgColorClass(
                      timeBlockArray[i].startTime
                    )}">
                        <textarea id="textarea${timeBlockArray[i].id}">${
      timeBlockArray[i].info
    }</textarea>
                    </div>

                    <div class="button-block"> 
                      <button onclick="saveInfo('${timeBlockArray[i].id}')"> 
                        <i class="fas fa-save fa-2x floppy"></i>
                      </button>
                    </div>
                </div>`
  }

  $(".container").html(timeBlock)
}

function init() {
  timeBlockGenerator()
  currentDay()
}

$(document).ready(init)

function currentDay() {
  $("#currentDay").html(moment().format("dddd, MMMM Do, h:mm a"))
}

function saveInfo(id) {
  clickSound.play()
  let val = $("#textarea" + id).val()
  modifyTimeBlockArray(id, val)
  showStatusBar()
}

function showStatusBar() {
  $(".status-bar").fadeIn(1000)
  setTimeout(function () {
    hideStatusBar()
  }, 1000)
}

function hideStatusBar() {
  $(".status-bar").fadeOut(1000)
}

function modifyTimeBlockArray(id, value) {
  id = parseInt(id)

  for (let i = 0; i < timeBlockArray.length; i++) {
    if (timeBlockArray[i].id === id) {
      timeBlockArray[i].info = value
    }
  }

  console.log("timeBLockAray", timeBlockArray)
  localStorage.setItem("timeBlockArray", JSON.stringify(timeBlockArray))
}
