$.get("http://localhost:3000/transcripts?_expand=student", function(data) {
  let tableBody = $("#tableBody");

  for (const row of data) {
    let names = `${row.student.firstname} ${row.student.lastname}`;
    let id = createNode("th", row.id);
    let matric = createNode("td", row.student.matric);
    let email = createNode("td", row.email_to);
    let quantity = createNode("td", row.quantity);
    let date = createNode("td", row.date);
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