$(document).ready(function() {
  var user;
  function processForm() {
    var param = location.search.substring(1).split("&");
    var temp = param[0].split("=");
    user = unescape(temp[1]);
  }
  processForm();
  user = localStorage.getItem("student_email");
  let studentId = localStorage.getItem("studentId");
  $.ajax({
    type: "GET",
    url: `http://localhost:3000/students?id=${studentId}`,
    success: function(data) {
      let cgpa = data[0].cgpa;

      $("#name").text(`${data[0].firstname} ${data[0].lastname}`);
      $("tr #email").text(`${data[0].email}`);
      $("tr #matric").text(`${data[0].matric}`);
      $("tr #department").text(`${data[0].department}`);
      $("tr #faculty").text(`${data[0].faculty}`);
      $("tr #admission_year").text(`${data[0].adm_year}`);
      $("tr #graduation_year").text(`${data[0].grad_year}`);
      $("tr #gender").text(`${data[0].gender}`);

      if (cgpa >= 4.5) {
        class_of_degree = "First Class";
      } else if (cgpa >= 3.5 && cgpa < 4.5) {
        class_of_degree = "Second Class (upper)";
      } else if (cgpa >= 2.5 && cgpa < 3.5) {
        class_of_degree = "Second Class (lower)";
      } else if (cgpa >= 1.5 && cgpa < 2.5) {
        class_of_degree = "Third Class";
      } else {
        class_of_degree = "Fail";
      }
      $("tr #class_of_degree").text(class_of_degree);
    },
    error: function() {
      alert("something is wrong with the server, please reload the page");
    }
  });

  //   Payments Data
  $.get(
    `http://localhost:3000/payments?studentId=${studentId}&_expand=transcript`,
    function(data) {
      let tableBody = $("#payBody");
      let i = 0;
      for (const row of data) {
        let id = createNode("th", ++i);
        let email = createNode("td", row.transcript.email_to);
        let amount = createNode("td", row.amount);
        let date = createNode("td", row.payment_date);

        let tableRow = createNode("tr");

        append(tableRow, id);
        append(tableRow, email);
        append(tableRow, amount);
        append(tableRow, date);

        // Append row to table body
        tableBody.append(tableRow);
      }
    }
  );

  // Transcripts Data
  $.get(`http://localhost:3000/transcripts?studentId=${studentId}`, function(
    data
  ) {
    let tableBody = $("#transBody");
    let i = 0;
    for (const row of data) {
      let id = createNode("th", ++i);
      let email = createNode("td", row.email_to);
      let quantity = createNode("td", row.quantity);
      let date = createNode("td", row.date_issued);

      let tableRow = createNode("tr");

      append(tableRow, id);
      append(tableRow, email);
      append(tableRow, quantity);
      append(tableRow, date);

      // Append row to table body
      tableBody.append(tableRow);
    }
  });

  $("#apply-btn").click(function() {
    event.preventDefault();
    window.location = "../student/transcript.html?user-login=" + user;
  });
});

// Create html element with textContent
function createNode(element, text) {
  let node = document.createElement(element);
  if (text) {
    node.innerHTML = `${text}`;
  }
  return node;
}
// Append child to parent
function append(parent, el) {
  return parent.appendChild(el);
}
