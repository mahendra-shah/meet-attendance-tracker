const data = chrome.storage.sync.get("Meraki_Attendance_Record", (data) => {
  const records = data.Meraki_Attendance_Record;
  console.log(records, "4567890");
  const tbody = document.querySelector("tbody");
    for (let record of records) {
        tbody.innerHTML += `
          <tr id="row-place">
              <td>${record.meeting_title}</td>
              <td>
                  <img src="images/attendees-icon.svg" class="icon-at" />
                  <span id="attendees-count" class="ml-1">${
                    JSON.parse(record.attendee_names).length
                  }</span>
              </td>
              <td>${record.meeting_time.split("T")[1].split(".")[0]}</td>
              <td>${record.meet_duration}</td>
              <td></td>
              <td></td>
              <td></td>
          </tr>
        `;

    }
});

function msToTime(duration) {
  var milliseconds = Math.floor((duration % 1000) / 100),
    seconds = Math.floor((duration / 1000) % 60),
    minutes = Math.floor((duration / (1000 * 60)) % 60),
    hours = Math.floor((duration / (1000 * 60 * 60)) % 24);

  hours = hours < 10 ? "0" + hours : hours;
  minutes = minutes < 10 ? "0" + minutes : minutes;
  seconds = seconds < 10 ? "0" + seconds : seconds;

  return hours + ":" + minutes + ":" + seconds;
}
