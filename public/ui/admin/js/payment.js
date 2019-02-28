$.get(
  "http://localhost:3000/payments?_expand=transcript&_expand=student",
  function(data) {
    let tableBody = $("#tableBody");
    let total = $(".numRows");
    total.text(data.length);

    for (const row of data) {
      let names = `${row.student.firstname} ${row.student.lastname}`;
      let id = createNode("th", row.id);
      let fullname = createNode("td", names);
      let matric = createNode("td", row.student.matric);
      let email = createNode("td", row.transcript.email_to);
      let amount = createNode("td", row.amount);
      let date = createNode("td", row.payment_date);

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
  }
);

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
