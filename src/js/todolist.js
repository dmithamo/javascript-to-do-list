'use strict'

// The container for all todo's.
let todoList = [];

// Single Add Todo button out to allow re-use
let addButton = document.getElementById("add-new");

// Save/Discard buttons - Define here to make reusable in mutiple functions
let saveDelete = "<p style=\"text-align:center; margin:auto\"><button class=\"save save-delete\" id=\"save\">Save</button><button class=\"discard save-delete\" id=\"discard\">Discard</button></p>"

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

// A necessary by the way - get current date and time
function dateNow(){
    let today = new Date();
    let year = today.getFullYear()
    let mm = today.getMonth() + 1
    if(mm < 10){
        mm = '0' + today.getMonth()
    }
    
    let dd = today.getDate();
    if(dd < 10){
        dd = '0' + today.getDate()
    }

    today = year + '-' + mm + '-' + dd;
    return today;
}

function currentTime(){
    let today = new Date();
    let time = today.getHours() + ':' + today.getMinutes();
    return time
}

// Make empty input fields for creating todo
function emptyTodoField(title, date, time) {
    // Empty todo Field
    title = ""
    date = dateNow()
    time = currentTime();

    let emptyTodoField = "<tr id=\"empty-row\">" + "<td class=\"no-style td-body\">" + "." + "</td>" + "<td>" + "<input id=\"title0" + "\"" + "required placeholder=\"Remember to: \" class=\"title-style td-body\" type=\"text\" value=" + title + ">" + "</td>" + "<td>" + "<input id=\"date0" + "\"" + "required class=\"date-style td-body\" type=\"date\"  value=" + date + " min=" + date + ">" + "</td>" + "<td>" + "<input id=\"time0" + "\"" + "required class=\"time-style td-body\" type=\"time\" value=" + time + ">" + "</td>" + "</tr>";


    let tableBody = document.querySelector("#table-body");
    let emptyExists = !!document.querySelector("#empty-row");

    // Check if there exists an empty row; add one if not
    if (emptyExists) {
        alert("Save or Discard the current to do first.")
    } else {
        // Append empty todo field
        tableBody.innerHTML += emptyTodoField;

        // Append and animate Save | Discard and Add Todo Buttons
        document.querySelector("#table-tag").innerHTML = saveDelete;
        animateButtons()

        // Execute code to collect user-input  
        addTodo()
    }
}

// Single this out to allow to DRY multiple calls
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


// Collect user details for  todoItem
function addTodo() {
    let todoItem = {
        todoTitle: "",
        todoDueDate: "",
        todoDueTime: ""
    };

    // Listen for change in input fileds, collect user input
    // 1. The Title
    let title = document.querySelector("#title0");
    title.addEventListener("change", function () {
        if (this.value) {
            todoItem["todoTitle"] = this.value;
        }
        });
        
        // 2. The DueDate
        let dueDate = document.querySelector("#date0");
        dueDate.addEventListener("change", function () {
            if (this.value) {
                todoItem["todoDueDate"] = this.value;
            } else {
                console.log("Please check the date")
            }
            
        });

    // 3. The DueTime
    let dueTime = document.querySelector("#time0");
    dueTime.addEventListener("change", function () {
        todoItem["todoDueTime"] = this.value;
    });

    saveOrDiscard(todoItem)
}

function saveOrDiscard(item) {
    // Save
    document.querySelector("#save").addEventListener("click", function () {
        if(item.todoTitle && item.todoDueDate && item.todoDueTime){
            todoList.push(item)
        }

        else if (!item.todoTitle) {
            alert("Not saved!" + "\nThe title: " + item.todoTitle + " is incomprehensible");
            emptyTodoField()
        } 
        else if(!item.todoDueDate) {
            alert("Not saved!" + "\nThe Due date: " + item.todoDueDate + " is invalid");
        } 
        else if(!item.todoDueTime) {
            alert("Not saved!" + "\nThe Due time: " + item.todoDueTime + " is invalid");
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
}

function restoreTable() {
    let originalTag = "<p class=\"below-table\" id=\"table-tag\"></p>";
    document.querySelector("#table-tag").innerHTML = originalTag;
    if (todoList.length == 0) {
        document.querySelector("#table-tag").innerText = "So empty :-[ ";
    }

    // 'Re-enable' + button
    addButton.classList.remove("hidden-button");

    // Re-set table
    let originalTableBody = "<tbody id=\"table-body\"></tbody>"
    document.querySelector("#table-body").innerHTML = originalTableBody;
}

function listTodos() {
    let row;
    let todoItem;
    // Access all todo Items
    for (let i = 0; i < todoList.length; i++) {
        todoItem = todoList[i];
        row = "<tr><td class=\"no-style td-body-saved\">" + (i + 1) + "." + "</td><td class=\"title-style td-body-saved\">" + todoItem.todoTitle + "</td><td class=\"date-style td-body-saved\">" + todoItem.todoDueDate + "</td><td class=\"time-style td-body-saved\">" + todoItem.todoDueTime + "</td></tr>"
        document.querySelector("#table-body").innerHTML += row;
    }
    editTodo();
}


// 
function editTodo(){
    //1. Edit title
    
    // Select Titles, add dblclick listener
    let titles = document.getElementsByClassName("title-style");
    for(let i = 0; i < titles.length; i++){
        titles[i].addEventListener("dblclick", function(){
            this.style.color = "cyan";
            alert("You double clicked me...")
        })
    }
    
    
}



// Execute on start
hoverAddButton()
clickAddButton();