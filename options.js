const data = chrome.storage.sync.get("Meraki_Attendance_Record", (data) => {
  const records = data.Meraki_Attendance_Record;
  console.log(records, "4567890");
  const tbody = document.getElementById("history");
  for (const record in records.reverse()) {
    tbody.innerHTML += `
          <tr class="popup-row">
              <td>${records[record].meeting_title}</td>
              <td>${records[record].meeting_title}</td>
              <td>
                  <img src="images/attendees-icon.svg" class="icon-at" />
                  <span id="attendees-count" class="ml-1">${
                    JSON.parse(records[record].attendee_names).length
                  }</span>
              </td>
              <td>${records[record].meeting_time.split("T")[1].split(".")[0]}</td>
              <td>${records[record].meet_duration}</td>
              <td></td>
              <td><a id="row-${record}" href="#">View Details</a></td>
              <td><img src="images/remove.svg" class="icon-at pointer"/></td>
              </tr>
              `;
            }
            // <td><button onclick="openPopup(${record}, ${records[record]})"> View Details</button></td>
});

// const pop = document.getElementById("row-0")
// pop.addEventListener('click', (record) => {
//   console.log(record)
//   document.getElementById("popup-handler").style.display = "block";
//   // pop.style.display = "block";

// })

// // function openPopup(rowId, rowData) {
// //   console.log(rowData, '---------------')
// //   document.getElementById("popup-handler").style.display = "block";
// // }

// function closePopup() {
//   console.log('close popup')
//   document.getElementById("popup-handler").style.display = "none";
// }

{/* <button type="button" class="btn cancel" onclick="closePopup()">Close</button> */}

function msToTime(duration) {
  console.log('76')
  var milliseconds = Math.floor((duration % 1000) / 100),
    seconds = Math.floor((duration / 1000) % 60),
    minutes = Math.floor((duration / (1000 * 60)) % 60),
    hours = Math.floor((duration / (1000 * 60 * 60)) % 24);

  hours = hours < 10 ? "0" + hours : hours;
  minutes = minutes < 10 ? "0" + minutes : minutes;
  seconds = seconds < 10 ? "0" + seconds : seconds;

  return hours + ":" + minutes + ":" + seconds;
}
