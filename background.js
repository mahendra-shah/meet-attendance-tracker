document.addEventListener("DOMContentLoaded", function () {
  var link = document.getElementById("row-2");
  const popHolder = document.getElementsByClassName("card-popup")
  console.log("uyoyoyooooy", link);
  // onClick's logic below:
  link.addEventListener("click", function () {
    link.style.display = "block";
    link.innerHTML += `
        <table class="card-container">
            <tr id="closeMe">
                <th></th>
                <th>Names</th>
                <th>Joined At</th>
                <th>Time in Call</th>
            </tr>
            <tr>
                <td></td>
                <td>Mahendra</td>
                <td>12pm</td>
                <td>30min</td>
            </tr>
        </table>
    `;
    let close = document.getElementById('closeMe')
    close.addEventListener("click", function () {
      link.style.display = 'none'
    });
    console.log("xxx");
  });
});
