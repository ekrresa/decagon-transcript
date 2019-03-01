let totalAmount = $("#totalAmount");
let totalTranscripts = $("#totalTranscripts");
let totalStudents = $("#totalStudents");

// $.get("http://localhost:3000/students", function(data) {
//   console.log(data);
// });
// $.get("http://localhost:3000/transcripts", function(data) {
//   console.log(data);
// });
$.get("http://localhost:3000/payments", function(data) {
  let total = 0;
  for (const row of data) {
    total += Number(row.amount);
  }
  totalAmount.text(total);
});
