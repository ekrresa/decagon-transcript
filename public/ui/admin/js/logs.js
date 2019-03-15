$.get(`${baseUrl}logs?_expand=student&_sort=id&_order=desc`, function(data) {
  let tableBody = $("#tableBody");
  let total = $(".numRows");
  total.text(data.length);
  let serial = 0;

  for (const row of data) {
    let names = `${row.student.firstname} ${row.student.lastname}`;
    let id = createNode("th", ++serial);
    let matric = createNode("td", row.student.matric);
    let login_time = createNode("td", formatDate(row.login_time));
    let logout_time = createNode("td", formatDate(row.logout_time));
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
// Format date
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
