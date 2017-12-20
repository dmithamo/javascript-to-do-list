'use strict'

// The container for all todo's.
let todoList = [];

// Single Add Todo button out to allow re-use
let addButton = document.getElementById("add-new");

// Save | Discard buttons - Define here to make reusable in mutiple functions
let saveDiscard = "<p style=\"text-align:center; margin:auto\"><button class=\"save save-delete\" id=\"save\">Save</button><button class=\"discard save-delete\" id=\"discard\">Discard</button></p>"

// Save | Delete buttons - Define here to make reusable in mutiple functions
let saveDelete = "<p style=\"text-align:center; margin:auto\"><button class=\"save save-delete\" id=\"save\">Back</button><button class=\"discard save-delete\" id=\"discard\">Delete</button></p>"

// Animate ADD TODO button
function hoverAddButton() {
    addButton.addEventListener("mouseover", function () {
        addButton.classList.add("hovered-button")
    });
    addButton.addEventListener("mouseout", function () {
        addButton.classList.remove("hovered-button")
    });
}

// Call emptyTodoField() when Add Todo is clicked
function clickAddButton() {
    addButton.addEventListener("click", function () {
        emptyTodoField()
    });
}


// Single this out to allow to make multiple DRY calls
function animateButtons() {
    // Animate Save button
    document.querySelector("#save").addEventListener("mouseover", function () {
        this.classList.add("hovered-save")
    });
    document.querySelector("#save").addEventListener("mouseout", function () {
        this.classList.remove("hovered-save")
    });

    // Animate Discard button
    document.querySelector("#discard").addEventListener("mouseover", function () {
        this.classList.add("hovered-discard")
    });
    document.querySelector("#discard").addEventListener("mouseout", function () {
        this.classList.remove("hovered-discard")
    });


    // 'Disable' + button
    addButton.classList.add("hidden-button");
}

// A necessary by the way - get current date and time for use as defaults
function dateNow() {
    let today = new Date();
    let year = today.getFullYear()
    let mm = today.getMonth() + 1
    if (mm < 10) {
        mm = '0' + today.getMonth()
    }

    let dd = today.getDate();
    if (dd < 10) {
        dd = '0' + today.getDate()
    }

    today = year + '-' + mm + '-' + dd;
    return today;
}

function currentTime() {
    let today = new Date();
    let hours = today.getHours();
    if (hours < 10) {
        hours = '0' + hours;
    }

    let minutes = today.getMinutes()
    if (minutes < 10) {
        minutes = '0' + minutes;
    }
    let time = hours + ':' + minutes;
    return time
}

// Make empty input fields for creating todo
function emptyTodoField(title, date, time) {
    // Create empty todo Field
    if (!title) {
        title = "Remember to: "
    }

    if (!date) {
        date = dateNow()
    }

    if (!time) {
        time = currentTime()
    }

    let emptyTodoField = "<tr id=\"empty-row\">" + "<td class=\"no-style td-body\">" + "." + "</td>" + "<td>" + "<input onclick = \"this.select()\" id=\"title0" + "\"" + "required class=\"title-style td-body\" type=\"text\" value=" +"\"" + title  + "\">" + "</td>" + "<td>" + "<input onclick = \"this.select()\" id=\"date0" + "\"" + "required class=\"date-style td-body\" type=\"date\"  value="+"\"" + date + "\"" + " min="+"\"" + date + "\"" + + ">" + "</td>" + "<td>" + "<input onclick = \"this.select()\" id=\"time0" + "\"" + "required class=\"time-style td-body\" type=\"time\" value="+"\"" + time + "\"" + ">" + "</td>" + "</tr>";

    
    // Check if there exists an empty row; add one if so remove it
    let emptyExists = !!document.querySelector("#empty-row");
    if(emptyExists){
        document.getElementById("empty-row").remove();
    }
    
    // Append empty todo field
    let tableBody = document.querySelector("#table-body");
    tableBody.innerHTML += emptyTodoField;

    // Append and animate Save | Discard and Add Todo Buttons
    document.querySelector("#table-tag").innerHTML = saveDiscard;
    animateButtons()

    // Execute code to collect user-input  
    addTodo();
}


// Collect user details for  todoItem
function addTodo() {
    let todoItem = {
        todoId: "",
        todoTitle: "",
        todoDueDate: "",
        todoDueTime: ""
    };

    // Listen for change in input fileds, collect user input
    // 1. The Title
    let title = document.querySelector("#title0");
    title.addEventListener("change", function () {
        if(this.value !== ""){
            todoItem["todoTitle"] = this.value;
        }else{
            alert("Error. No title provided.")
        }
    });

    title.addEventListener("mouseout", function () {
        if(this.value !== ""){
            todoItem["todoTitle"] = this.value;
        }else{
            alert("Error. No title provided.")
        }
    });
    
    // 2. The DueDate
    let dueDate = document.querySelector("#date0");
    dueDate.addEventListener("change", function () {
        if(this.value !== ""){
            todoItem["todoDueDate"] = this.value;
        }else{
            alert("Error. No Date provided.")
        }
    });

    dueDate.addEventListener("mouseout", function () {
        if(this.value !== ""){
            todoItem["todoDueDate"] = this.value;
        }else{
            alert("Error. No Date provided.")
        }
    });
    
    // 3. The DueTime
    let dueTime = document.querySelector("#time0");
    dueTime.addEventListener("change", function () {
        if(this.value !== ""){
            todoItem["todoDueTime"] = this.value;
        }else{
            alert("Error. No Time provided.")
        }
    });

    dueTime.addEventListener("mouseout", function () {
        if(this.value !== ""){
            todoItem["todoDueTime"] = this.value;
        }else{
            alert("Error. No Time provided.")
        }
    });

    saveOrDiscard(todoItem);
}

function saveOrDiscard(item) {
    // Save
    document.querySelector("#save").addEventListener("click", function () {
        // Append to list of todos
        
        let date = item.todoDueDate;
        let title = item.todoTitle;
        let time = item.todoDueTime;
       
        // Validation
        if(item.todoTitle !== "" && item.todoDueDate !== "" && item.todoDueTime !== ""){
            todoList.push(item)
        }

        else if(item.todoTitle === ""){
            alert("You did not provide a Title. Rudia.")
        }
        else if(item.todoDueDate=== ""){
            alert("You did not provide Date. Rudia.")
        }
        else if(item.todoDueTime === ""){
            alert("You did not provide Time. Rudia.")
        }

        // Replace original table-tag, re-enable + button and list todo's
        restoreTable();
        listTodos()
    });

    // Discard
    document.querySelector("#discard").addEventListener("click", function () {
        restoreTable();
        listTodos();
    });
    return item;
}

function restoreTable() {
    // Re-set table
    let originalTableBody = "<tbody id=\"table-body\"></tbody>"
    document.querySelector("#table-body").innerHTML = originalTableBody;
 
    // Restore atble tag
    let originalTag = "<p class=\"below-table\" id=\"table-tag\"></p>";
    document.querySelector("#table-tag").innerHTML = originalTag;
    if (todoList.length == 0) {
        document.querySelector("#table-tag").innerHTML = "So empty :-[ ";
    }else{
        document.querySelector("#table-tag").innerHTML = "Edit todo:-<br>Click on Title, Date or Time.<br><br>Delete Todo:-<br>Double click its number. ";
    }
    
    // 'Re-enable' + button
    addButton.classList.remove("hidden-button");
}


function listTodos() {
    let row;
    let todoItem;
    // Access all todo Items
    document.querySelector("#table-body").innerHTML = "";
    for (let i = 0; i < todoList.length; i++) {
        todoItem = todoList[i];
        todoItem.todoId = i + 1;
        row = "<tr><td class=\"no-style td-body-saved\">" + todoItem.todoId + "." + "</td><td class=\"title-style td-body-saved\">" + todoItem.todoTitle + "</td><td class=\"date-style td-body-saved\">" + todoItem.todoDueDate + "</td><td class=\"time-style td-body-saved\">" + todoItem.todoDueTime + "</td></tr>"
        document.querySelector("#table-body").innerHTML += row;
    }
    deleteTodo();
    editTodo();

}


// Modify existing todo
function editTodo() {
    // Select Titles, add dblclick listener
    let todoDataCells = document.getElementsByClassName("td-body-saved");

    // Variables to be re-assigned during the following loops
    let clickedTodo;
    let clickedObjectValues;
    let title;
    let date;
    let time;
    for (let i = 0; i < todoDataCells.length; i++) {
        todoDataCells[i].addEventListener("dblclick", function () {
            
            // 
            clickedTodo = todoDataCells[i];

            for (let a = 0; a < todoList.length; a++) {
                
                clickedObjectValues = Object.values(todoList[a])
                if(clickedObjectValues.includes(clickedTodo.innerHTML)){

                    title = clickedObjectValues[1];
                    date = clickedObjectValues[2];
                    time = clickedObjectValues[3];
                    
                    clickedTodo.style.background = "grey"; 
                    clickedTodo.style.color = "white"; 
                    clickedTodo.innerHTML += "<br>[EDITING...]"; 

                    emptyTodoField(title, date, time);
                    
                    document.querySelector("#discard").addEventListener("click", function(){
                        listTodos()
                    });
                    document.querySelector("#save").addEventListener("click", function(){
                        todoList.splice(a, 1);
                        listTodos();
                    });
                }
                
            }
        });
    }
    
}


// Remove a todo
function deleteTodo() {

    // Select Titles, add dblclick listener
    let todoDataCells = document.getElementsByClassName("td-body-saved");

    // Variables to be re-assigned during the following loops
    let clickedTodo;
    let clickedObjectValues;
   
    let todoIds = document.getElementsByClassName("no-style");

    for (let i = 0; i < todoIds.length; i++) {
        todoIds[i].addEventListener("dblclick", function () {
            
            // 
            clickedTodo = todoIds[i];

            for (let a = 0; a < todoList.length; a++) {
                
                clickedObjectValues = Object.values(todoList[a])

                if(clickedObjectValues[0] == clickedTodo.innerHTML){
                    
                    
                    clickedTodo.style.background = "red"; 
                    clickedTodo.style.color = "white"; 
                    clickedTodo.innerHTML += "DELETE?";
                    
                    document.querySelector("#table-tag").innerHTML = saveDelete;
                    animateButtons();
                    
                    // Disable add todo button
                    // Later....


                    // Handle Back | Delete clicks
                    document.querySelector("#discard").addEventListener("click", function(){
                        todoList.splice(a, 1);
                        restoreTable();
                        listTodos();
                    });
                    document.querySelector("#save").addEventListener("click", function(){
                        restoreTable();
                        listTodos();
                    });
                }
                
            }
        });
    }
}


// Execute on start
hoverAddButton()
clickAddButton();