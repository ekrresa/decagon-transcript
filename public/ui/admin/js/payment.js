$.get(
  `${baseUrl}payments?_expand=transcript&_expand=student&_sort=payment_date&_order=desc`,
  function(data) {
    let tableBody = $("#tableBody");
    let total = $(".numRows");
    total.text(data.length);
    let serial = 0;
    let options = {
      weekday: "long",
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "numeric",
      minute: "numeric",
      second: "numeric"
    };

    for (const row of data) {
      let dateObj = new Date(row.payment_date);
      let names = `${row.student.firstname} ${row.student.lastname}`;
      let id = createNode("th", ++serial);
      let fullname = createNode("td", names);
      let matric = createNode("td", row.student.matric);
      let email = createNode("td", row.transcript.email_to);
      let amount = createNode("td", row.amount);
      let date = createNode("td", dateObj.toLocaleDateString("en-US", options));

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
