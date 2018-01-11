// Display urrent date and time. Using a library called moment.js
function currentTimeDate(){
    var now = moment();
    $("#time-now").text(now.format("HH : mm"));
    $("#date-today").text(now.format("ddd YYYY-MM-DD"));
    $("#date-showing").text(now.format("YYYY-MM-DD"));
}
// Change time (and incidentally date) every one second
setInterval(currentTimeDate, 10);

// Gotta love moment.js :)

