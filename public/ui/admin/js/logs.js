$.get("http://localhost:3000/logs?_expand=student", function(data) {
  let tableBody = $("#tableBody");
  let total = $(".numRows");
  total.text(data.length);

  for (const row of data) {
    let names = `${row.student.firstname} ${row.student.lastname}`;
    let id = createNode("th", row.id);
    let matric = createNode("td", row.student.matric);
    let email = createNode("td", row.email_to);
    let quantity = createNode("td", row.quantity);
    let date = createNode("td", row.date_issued);
    let fullname = createNode("td", names);
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
