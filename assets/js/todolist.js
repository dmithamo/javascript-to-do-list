// Display urrent date and time. Using a library called moment.js
// Gotta love moment.js :)
function currentTimeDate() {
    var now = moment();
    $("#time-now").text(now.format("HH : mm"));
    $("#date-today").text(now.format("ddd DD-MM-YYYY"));
    $("#date-showing").text(now.format("ddd DD-MM-YYYY"));
    checkIfLi();
}
// Change time (and incidentally date) every one second
setInterval(currentTimeDate, 100);

// Add functionality top add-button
// Display text input field on click
$("#list-plus").on("click", function () {
    $("input").css("display", "block")
})

// Append footer for empty todo list
function checkIfLi() {
    var presentTodos = $("li").html();
    if (presentTodos === undefined) {
        $("#list-footer").text("You have no to-dos");
        $("ol").css("padding", "0");
    }
}

// "<li><span class='delete'></span>" + item + "<span class='time'>" + timeDue + "</span></li>"