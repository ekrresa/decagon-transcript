$.get(
  `${baseUrl}payments?_expand=transcript&_expand=student&_sort=payment_date&_order=desc`,
  function(data) {
    let tableBody = $("#tableBody");
    let total = $(".numRows");
    total.text(data.length);
    let serial = 0;

    for (const row of data) {
      let names = `${row.student.firstname} ${row.student.lastname}`;
      let id = createNode("th", ++serial);
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
// Format Date
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
