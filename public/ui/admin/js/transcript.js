$.get(`${baseUrl}transcripts?_expand=student&_sort=id&_order=desc`, function(data) {
  let tableBody = $("#tableBody");
  let total = $(".numRows");
  total.text(data.length);
  let serial = 0;

  for (const row of data) {
    let names = `${row.student.firstname} ${row.student.lastname}`;
    let id = createNode("th", ++serial);
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
// Date formatting
function formatDate(date) {
  if (date === "") {
    return "USER STILL LOGGED IN!";
  }
  if (date === undefined) {
    return;
  }
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
