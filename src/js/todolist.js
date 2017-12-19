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


// Make empty input fields for creating todo
function emptyTodoField() {
    // Empty todo Field
    let emptyTodoField = "<tr id=\"empty-row\">" + "<td class=\"no-style td-body\">" + "." + "</td>" + "<td>" + "<input id=\"title0" + "\"" + "required placeholder=\"Remember to?\" class=\"title-style td-body\" type=\"text\">" + "</td>" + "<td>" + "<input id=\"date0" + "\"" + "required class=\"date-style td-body\" type=\"date\" max=\"2018-12-18\" min=\"2017-12-18\">" + "</td>" + "<td>" + "<input id=\"time0" + "\"" + "required class=\"time-style td-body\" type=\"time\">" + "</td>" + "</tr>";;


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
        animateSaveDiscardButtons()

        // Execute code to collect user-input  
        addTodo()
    }
}

// Single this out to allow to DRY multiple calls
function animateSaveDiscardButtons() {
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
        } else {
            console.log("Please check the title")
        }
    });

    // 2. The DueDate
    let dueDate = document.querySelector("#date0");
    dueDate.addEventListener("change", function () {
        if (this.value) {
            todoItem["todoDueDate"] = this.value;
        } else {
            console.log("Check the date")
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
        if (item.todoTitle && item.todoDueDate && item.todoDueTime) {
            todoList.push(item);
        } else {
            alert("Not saved! \n\nTodo item must have Title, Date due, and Time due. Please try again")
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
    editTodoTitle();
    editTodoDueDate();
    editTodoDueTime();
}


// Make it possible to edit title by using a prompt
function editTodoTitle() {
    // Select all todo Titles, addEventListener to Allow for modifying of content
    let toEdit = document.getElementsByClassName("title-style");

    for (let i = 0; i < toEdit.length; i++) {
        toEdit[i].addEventListener("click", function () {
            // this.innerText = prompt("Modify this to: ", this.innerText);
            emptyTodoField();

            // Replace value of Title with current value
            document.querySelector("#title0").value = this.innerText

            // Replace value of Date due with current value
            document.querySelector("#date0").value = this.innerHTML

            // Replace value of Time due with current value
            document.querySelector("#time0").value = this.innerHTML

        })
    }
}

// Make date editable by selecting new date
function editTodoDueDate() {
    // Select all todo Dates and addEventListener to allow for modifying of content
    let toEdit = document.getElementsByClassName("date-style");
    for (let i = 0; i < toEdit.length; i++) {
        toEdit[i].addEventListener("click", function () {

            // On click: define a date input field below table, allowing user to selct new date. 
            // Add Save | Discard Buttons too, and 'Disable' Add Todo Button
            let dateField = "<p id=\"empty-edit\">" + "<input value=\"" + this.innerText + "\"" + "required class=\"date-style td-body\" type=\"date\" max=\"2018-12-18\" min=\"2017-12-18\">" + "</p>";
            document.querySelector("#table-tag").innerHTML = dateField + saveDelete;
            animateSaveDiscardButtons();

            // Update Value of date in 'db' and list updated Todos on clicking Save | Discard Buttons
            saveOrDiscard();
        })
    }
}

// Make time editable by selecting new time
function editTodoDueTime() {
    let toEdit = document.getElementsByClassName("time-style");
    for (let i = 0; i < toEdit.length; i++) {
        toEdit[i].addEventListener("click", function () {
            // this.innerText = prompt("Edit to: ", this.innerText); 
            let timeField = "<p id=\"empty-edit\">" + "<input value=\"" + this.innerText + "\"" + "required class=\"time-style td-body\" type=\"time\">" + "</p>";
            document.querySelector("#table-tag").innerHTML = timeField + saveDelete;
            animateSaveDiscardButtons();

            // Update Value of time in 'db' and list updated Todos on clicking Save | Discard Buttons
            saveOrDiscard();

        })
    }
}

// Execute on start
hoverAddButton()
clickAddButton();