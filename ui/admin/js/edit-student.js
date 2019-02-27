const getUrl = `http://localhost:3000/students?email=${urlParams.get("email")}`;
// Get student data, populate form fields
$.get(getUrl, function(data) {
  let student = data[0];
  $("#firstname").val(data[0].firstname);
  $("#lastname").val(data[0].lastname);
  $("#matric").val(data[0].matric_number);
  $("#email").val(data[0].email);
  $("#gender")
    .val(data[0].gender)
    .attr("selected", "selected");
  $("#department").val(data[0].department);
  $("#faculty").val(data[0].faculty);
  $("#adm-year").val(data[0].year_of_admission);
  $("#grad-year").val(data[0].graduation_year);
  $("#cgpa").val(data[0].graduation_year);
});
