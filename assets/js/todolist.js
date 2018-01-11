// Display urrent date and time. Using a library called moment.js
// Gotta love moment.js :)
function currentTimeDate() {
    var now = moment();
    $("#time-now").text(now.format("HH : mm"));
    $("#date-today").text(now.format("ddd DD-MM-YYYY"));
    $("#date-showing").text(now.format("ddd DD-MM-YYYY"));
}
// Change time (and incidentally date) every one second
setInterval(currentTimeDate, 100);

// Add functionality top add-button
// Display text input field on click
$("#list-plus").on("click", function () {
    $("input").css("height", "30px")
    $("input").val("");
    $("ol").css("height", "0");
})

// On enter while typing todo, add entered todo item to list
$("input").on("keypress", function(key){
    if(key.which === 13){
        var todoItem = $("#enter-text").val();
        var timeDue = $("#enter-time").val();
        
        if(todoItem !== "" && timeDue !== ""){
            var deleteIcon = "<span class='delete'><i class='fa fa-trash-o' aria-hidden='true'></i></span>"
            var newTodo = "<li>" + deleteIcon + "<span style='margin-right:10px'></span>" + todoItem + "<span class='time'>" + timeDue + "</span></li>"
            $("ol").append(newTodo);
            $("input").val("");
            // $("input").css("display", "none")
            $("input").css("height", "0")
        }
        checkIfLi();
    }
})

// Mark done
$("ol").on("click", "li", function(){
    $(this).toggleClass("done");
})

// Delete
$("ol").on("click", ".delete", function(){
    $(this).parent().fadeOut(1000, function(){
        $(this).remove()
        checkIfLi();
    })
})

// If escape is pressed during input
$("body").on("keyup", function(key){
    if(key.which === 27){
        $("input").css("height", "0");
        checkIfLi();
    }
})


// Append footer for empty todo list
function checkIfLi() {
    var presentTodos = $("li").html();
    if (presentTodos === undefined) {
        $("#list-footer").text("You have no todos today");
        $("ol").css("height", "0");
        $("ol").css("padding", "0");
    }else{
        $("#list-footer").text("");
        $("ol").css("height", "fit-content");
        $("ol").css("padding-left", "15px");
    }
}

checkIfLi();

