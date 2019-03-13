let totalAmount = $("#totalAmount");
let totalTranscripts = $("#totalTranscripts");
let totalStudents = $("#totalStudents");

$.get("http://localhost:3000/students", function(data) {
  let tableBody = $("#studentBody");
  totalStudents.text(data.length);
  for (const row of data) {
    // Create nodes for table
    let id = createNode("th", row.id);
    let firstname = createNode("td", row.firstname);
    let lastname = createNode("td", row.lastname);
    let email = createNode("td", row.email);
    let matric = createNode("td", row.matric);
    let gender = createNode("td", row.gender);
    let dept = createNode("td", row.department);
    let faculty = createNode("td", row.faculty);
    let adm = createNode("td", row.adm_year);
    let grad = createNode("td", row.grad_year);
    let cgpa = createNode("td", row.cgpa);

    // Append nodes to column
    let tableRow = createNode("tr");
    append(tableRow, id);
    append(tableRow, firstname);
    append(tableRow, lastname);
    append(tableRow, matric);
    append(tableRow, email);
    append(tableRow, dept);
    append(tableRow, faculty);
    append(tableRow, adm);
    append(tableRow, grad);
    append(tableRow, cgpa);

    // Append row to table body
    tableBody.append(tableRow);
  }
});

$.get("http://localhost:3000/transcripts?_expand=student", function(data) {
  let tableBody = $("#transcriptBody");
  totalTranscripts.text(data.length);

  for (const row of data) {
    let names = `${row.student.firstname} ${row.student.lastname}`;
    let id = createNode("th", row.id);
    let matric = createNode("td", row.student.matric);
    let email = createNode("td", row.email_to);
    let quantity = createNode("td", row.quantity);
    let date = createNode("td", formatDate(row.date_issued));
    let fullname = createNode("td", names);

    let tableRow = createNode("tr");
    append(tableRow, id);
    append(tableRow, fullname);
    append(tableRow, matric);
    append(tableRow, email);
    append(tableRow, quantity);
    append(tableRow, date);

    // Append row to table body
    tableBody.append(tableRow);
  }
});

$.get("http://localhost:3000/payments?_expand=transcript&_expand=student", function(data) {
  let tableBody = $("#paymentBody");
  let total = 0;

  for (const row of data) {
    total += Number(row.amount);
    let names = `${row.student.firstname} ${row.student.lastname}`;
    let id = createNode("th", row.id);
    let fullname = createNode("td", names);
    let matric = createNode("td", row.student.matric);
    let email = createNode("td", row.transcript.email_to);
    let amount = createNode("td", row.amount);
    let date = createNode("td", formatDate(row.payment_date));

    let tableRow = createNode("tr");
    append(tableRow, id);
    append(tableRow, fullname);
    append(tableRow, matric);
    append(tableRow, email);
    append(tableRow, amount);
    append(tableRow, date);

    // Append row to table body
    tableBody.append(tableRow);
  }
  totalAmount.text(total);
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

// Format date
function formatDate(date) {
  let options = {
    weekday: "long",
    year: "numeric",
    month: "short",
    day: "numeric",
    hour: "numeric",
    minute: "numeric",
    second: "numeric"
  };

  let dateObj = new Date(date);
  return dateObj.toLocaleDateString("en-US", options);
}
