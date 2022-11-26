let studentDetails = new Map();
let studentsNameSet = new Set();
let ui_buttons;
let totalClassDuration = 0;
let goingToStop = 0;
let isAttendanceWorking = false;
let buttonClickInd = 0;
let startTime;

async function start() {
  startTime = new Date();
  startAttendanceTracker = setInterval(attendanceTracker, 1000);
}

// to get the meeting name/title
const getMeetingName = () => {
  console.log("GET_MEETING_NAME wala functions is working.....");
  const elm = document.querySelector("[data-meeting-title]");
  if (elm && elm.dataset.meetingTitle) {
    return elm.dataset.meetingTitle;
  }
  return document.title;
};

let stop = (STOP = () => {
  console.log("STOP wala functions is working.....");
  clearInterval(startAttendanceTracker);
  let meetingCode = window.location.pathname.substring(1);
  let date = new Date();
  let dd = date.getDate();
  let mm = date.toLocaleString("default", { month: "short" });
  let yyyy = date.getFullYear();
  date = dd + "-" + mm + "-" + yyyy;
  let sortedtstudentsNameSet = [];
  let studentsAttendedDuration = [];
  //   let studentsJoiningTime = [];
  let mapKeys = studentDetails.keys();
  for (i = 0; i < studentDetails.size; i++) {
    let studentName = mapKeys.next().value;
    sortedtstudentsNameSet.push(studentName);
  }
  sortedtstudentsNameSet.sort();
  for (studentName of sortedtstudentsNameSet) {
    let data = studentDetails.get(studentName);
    studentsAttendedDuration.push(data[0].toString());
    // studentsJoiningTime.push(data[1]);
  }
  var record = {
    attendee_names: JSON.stringify(sortedtstudentsNameSet),
    attendedDurationInSec: JSON.stringify(studentsAttendedDuration),
    meet_code: meetingCode,
    meeting_title: getMeetingName().replace("Meet - ", ""),
    meeting_time: startTime,
  };

  console.log(record, "&&&&&&");

  setTimeout(() => {
    const api = "http://localhost:5000/attendance"; // endpoint where this data will go

    fetch(api, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(record),
    })
      .then((response) => response.json())
      .then((string) => {
        // console.log(string);
        console.log(`Title of our response :  ${string.title}`);
      })
      .catch((error) => {
        console.log(error);
      });
  }, 2000);
});

function attendanceTracker() {
  let currentlyPresentStudents = document.getElementsByClassName("zWGUib");
  if (currentlyPresentStudents.length > 0) {
    studentsNameSet.clear();
    let numberOfjoinedStudents = -1;
    try {
      numberOfjoinedStudents = Number(
        document.getElementsByClassName("uGOf1d")[1].innerHTML
      );
      numberOfjoinedStudents =
        Number.isInteger(numberOfjoinedStudents) &&
        numberOfjoinedStudents > 0 &&
        numberOfjoinedStudents != -1
          ? numberOfjoinedStudents
          : currentlyPresentStudents.length;
    } catch (e) {
      numberOfjoinedStudents = currentlyPresentStudents.length;
    }
    for (i = 0; i < numberOfjoinedStudents; i++) {
      try {
        studentsNameSet.add(
          currentlyPresentStudents[i].innerHTML.toUpperCase()
        );
      } catch (exception) {}
    }
    for (studentName of studentsNameSet) {
      if (studentDetails.has(studentName)) {
        let data = studentDetails.get(studentName);
        data[0] += 1;
        studentDetails.set(studentName, data);
      } else {
        let joiningTime = new Date().toLocaleTimeString();
        let currStatus = 1;
        let data = [];
        data.push(currStatus);
        data.push(joiningTime);
        studentDetails.set(studentName, data);
      }
    }
    if (studentsNameSet.size - 1 == -1) {
      goingToStop += 1;
    } else {
      newButton.innerHTML =
        "Tracking Started<br>" +
        toTimeFormat(totalClassDuration) +
        " ago<br>" +
        "Click To Generate Report";
      totalClassDuration += 1;
      goingToStop = 0;
    }
    if (goingToStop == 2) {
      isAttendanceWorking = false;
      newButton.innerHTML = "Track Attendance";
      newButton.style.border = "2px solid #C5221F";
      goingToStop = 0;
      stop();
    }
  } else {
    try {
      ui_buttons[buttonClickInd % ui_buttons.length].click();
      buttonClickInd += 1;
      goingToStop = 0;
    } catch (error) {
      goingToStop += 1;
      if (goingToStop == 2) {
        isAttendanceWorking = false;
        newButton.innerHTML = "Track Attendance";
        newButton.style.border = "2px solid #C5221F";
        goingToStop = 0;
        stop();
      }
    }
  }
}

// Adding button to meet ui
let newButton = document.createElement("button");
newButton.id = "newButton";
newButton.className = "Jyj1Td CkXZgc";
newButton.innerHTML = "Track Attendance";
newButton.type = "button";
newButton.innerHTML = "Track Attendance";
newButton.style.border = "1px solid white";
newButton.style.backgroundColor = "#C5221F";
newButton.style.color = "white";
newButton.style.borderRadius = "2px";
newButton.style.padding = "auto auto auto auto";
newButton.style.height = "75px";
newButton.style.width = "250px";
newButton.style.borderRadius = "10px";

let flag = true;
if (flag) {
  let tryInsertingButton = setInterval(insertButton, 1000);
}

function insertButton() {
  try {
    ui_buttons = document.getElementsByClassName("VfPpkd-kBDsod NtU4hc");
    //ui_buttons[1].click();
    document.getElementsByClassName("lefKC")[0].appendChild(newButton);
    if (!isAttendanceWorking) {
      isAttendanceWorking = true;
      newButton.innerHTML = "Click To<br>Generate Attendance Report";
      newButton.style.backgroundColor = "#00796b";
      StartTime = new Date().toLocaleTimeString();
      studentDetails.clear();
      studentsNameSet.clear();
      totalClassDuration = 0;
      start();
    }
    document.getElementById("newButton").addEventListener("click", function () {
      if (isAttendanceWorking) {
        isAttendanceWorking = false;
        newButton.innerHTML = "Track Attendance";
        newButton.style.backgroundColor = "#C5221F";
        stop();
      }
    });
    clearInterval(tryInsertingButton);
  } catch (error) {}
}

function toTimeFormat(time) {
  hh = Math.floor(time / 3600);
  time = time - hh * 3600;
  mm = Math.floor(time / 60);
  time = time - mm * 60;
  ss = time;
  if (hh == 0) return mm + " min " + ss + "s";
  else return hh + " hr " + mm + " min " + ss + "s";
}
