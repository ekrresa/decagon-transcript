$.get("http://localhost:3000/students", function(data) {
  let tableBody = $("#tableBody");
  for (const student of data) {
    let id = createNode("th", student.id);
    let firstname = createNode("td", student.firstname);
    let lastname = createNode("td", student.lastname);
    let email = createNode("td", student.email);
    let matric = createNode("td", student.matric_number);
    let gender = createNode("td", student.gender);
    let dept = createNode("td", student.department);
    let faculty = createNode("td", student.faculty);
    let adm = createNode("td", student.year_of_admission);
    let grad = createNode("td", student.graduation_year);
    let cgpa = createNode("td", student.cgpa);
    let edit = createNode("td");
    let remove = createNode("td");
    let editLink = createNode("a");
    let removeLink = createNode("a");
    let editIcon = createNode("li");
    let removeIcon = createNode("li");
    editLink.href = `http://localhost:3000/students?email=${student.email}`;
    removeLink.href = `http://localhost:3000/students?email=${
      student.email
    }&delete=1`;
    editIcon.classList.add("fas", "fa-edit");
    removeIcon.classList.add("fas", "fa-trash-alt");
    append(editLink, editIcon);
    append(removeLink, removeIcon);
    append(edit, editLink);
    append(remove, removeLink);
    // console.log(editLink);

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

    tableBody.append(tableRow);
    // append(tableBody, tableRow);
  }
});

function createNode(element, text) {
  let node = document.createElement(element);
  if (text) {
    node.innerHTML = `${text}`;
  }
  return node;
}

function append(parent, el) {
  return parent.appendChild(el);
}
