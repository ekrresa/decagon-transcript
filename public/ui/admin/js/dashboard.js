$.get("http://localhost:3000/students", function(data) {
  let tableBody = $("#tableBody");
  for (const student of data) {
    // Create nodes for table
    let id = createNode("th", student.id);
    let firstname = createNode("td", student.firstname);
    let lastname = createNode("td", student.lastname);
    let email = createNode("td", student.email);
    let matric = createNode("td", student.matric);
    let gender = createNode("td", student.gender);
    let dept = createNode("td", student.department);
    let faculty = createNode("td", student.faculty);
    let adm = createNode("td", student.adm_year);
    let grad = createNode("td", student.grad_year);
    let cgpa = createNode("td", student.cgpa);
    // Create edit node and append to column
    let edit = createNode("td");
    let editLink = createNode("a");
    let editIcon = createNode("li");
    editLink.href = `./edit_student.html?email=${student.email}`;
    editIcon.classList.add("fas", "fa-edit");
    append(editLink, editIcon);
    append(edit, editLink);
    // Create delete node and append to column
    let remove = createNode("td");
    let removeLink = createNode("a");
    let removeIcon = createNode("li");
    removeLink.href = `./delete.html?email=${student.email}`;
    removeIcon.classList.add("fas", "fa-trash-alt");
    append(removeLink, removeIcon);
    append(remove, removeLink);

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
    append(tableRow, edit);
    append(tableRow, remove);

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
