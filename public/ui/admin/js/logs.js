$.get("http://localhost:3000/logs?_expand=student", function(data) {
  let tableBody = $("#tableBody");
  let total = $(".numRows");
  total.text(data.length);

  for (const row of data) {
    let names = `${row.student.firstname} ${row.student.lastname}`;
    let id = createNode("th", row.id);
    let matric = createNode("td", row.student.matric);
    let login_time = createNode("td", row.login_time);
    let logout_time = createNode("td", row.logout_time);
    let fullname = createNode("td", names);

    let tableRow = createNode("tr");
    append(tableRow, id);
    append(tableRow, fullname);
    append(tableRow, matric);
    append(tableRow, login_time);
    append(tableRow, logout_time);

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
