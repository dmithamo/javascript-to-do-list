'use strict'

// The container for all todo's, and a tracker for how many todo's there are.
let todoList = [];

// Animate + button
function hoverAddButton(){
    let hoverAddButton = document.querySelector("#add-new");
    hoverAddButton.addEventListener("mouseover", function(){
        hoverAddButton.classList.add("hovered-button")
    });
    hoverAddButton.addEventListener("mouseout", function(){
        hoverAddButton.classList.remove("hovered-button")
    });
}

// Call emptyTodoField() when + is clicked
function clickAddButton(){
    let clickAddButton = document.querySelector("#add-new");
    clickAddButton.addEventListener("click", emptyTodoField)
}

// Make empty input fields for creating todo
function emptyTodoField(){
    // Empty todo Field
    let emptyTodoField = "<tr id=\"empty-row\">" + "<td class=\"no-style td-body\">" + "." + "</td>"+ "<td>" + "<input id=\"title0"  + "\"" + "required placeholder=\"Remember to?\" class=\"title-style td-body\" type=\"text\">" + "</td>" + "<td>" + "<input id=\"date0"  + "\"" + "required class=\"date-style td-body\" type=\"date\" min=\"2017-12-18\">" + "</td>" + "<td>" + "<input id=\"time0"  + "\"" + "required class=\"time-style td-body\" type=\"time\">" + "</td>" + "</tr>";;
    
    // Save/Discard buttons
    let saveDelete = "<p style=\"text-align:center; margin:auto\"><button class=\"save-delete\" id=\"save\">Save</button><button class=\"save-delete\" id=\"discard\">Discard</button></p>"
    
    let tableBody = document.querySelector("#table-body");
    let emptyExists = !!document.querySelector("#empty-row");
    
    // Check if there exists an empty row; add one if not
    if(emptyExists){
        alert("Save or Discard the current to do first.")
    }else{
        // Append empty todo field
        tableBody.innerHTML += emptyTodoField;
       
        // Append Save/Discard buttons
        document.querySelector("#table-tag").innerHTML = saveDelete;
        
        // 'Disable' + button
        document.querySelector("#add-new").classList.add("hidden-button");

        // Execute code to collect user-input  
        addTodo()
    }
}


// Collect user details for  todoItem
function addTodo(){
    let todoItem = {todoTitle:"", todoDueDate:"", todoDueTime:""};

    // Listen for change in input fileds, collect user input

    // 1. The Title
    let title = document.querySelector("#title0");
    title.addEventListener("change", function(){
        if(this.value){
            todoItem["todoTitle"] = this.value;
        }else{
            console.log("Please check the title")
        }
    });
    
    // 2. The DueDate
    let dueDate = document.querySelector("#date0");
    dueDate.addEventListener("change", function(){
        if(this.value){
            todoItem["todoDueDate"] = this.value;
        }else{
            console.log("Check the date")
        }
    });
    
    // 3. The DueTime
    let dueTime = document.querySelector("#time0");
    dueTime.addEventListener("change", function(){
        todoItem["todoDueTime"] = this.value;
        
    });

    saveOrDiscard(todoItem)
}

function saveOrDiscard(item){
    // Save
    document.querySelector("#save").addEventListener("click", function(){
        if(item.todoTitle && item.todoDueDate && item.todoDueTime){
            todoList.push(item);
        }else{
            alert("Not saved! \n\nTodo item must have Title, Date due, and Time due. Please try again")
        }
        
        // Replace original table-tag, re-enable + button and list todo's
        restoreTable();
        listTodos()

    });
    
    // Discard
    document.querySelector("#discard").addEventListener("click", function(){
        restoreTable();
        listTodos();
   });

}

function restoreTable(){
    let originalTag = "<p class=\"below-table\" id=\"table-tag\">Click \"+\" to add todo's</p>";
    document.querySelector("#table-tag").innerHTML = originalTag;
    
    // 'Re-enable' + button
    document.querySelector("#add-new").classList.remove("hidden-button");

    // Re-set table
    let originalTableBody = "<tbody id=\"table-body\"></tbody>"
    document.querySelector("#table-body").innerHTML = originalTableBody;
}

function listTodos(){
    let row;
    let todoItem;
    // Access all todo Items
    for(let i = 0; i < todoList.length; i++){
        todoItem = todoList[i];
        row = "<tr><td class=\"no-style td-body-saved\">" + (i+1) + "." + "</td><td class=\"title-style td-body-saved\">" + todoItem.todoTitle + "</td><td class=\"date-style td-body-saved\">" + todoItem.todoDueDate + "</td><td class=\"time-style td-body-saved\">" + todoItem.todoDueTime + "</td></tr>"
        document.querySelector("#table-body").innerHTML += row;
    }


}

// Execute on start
hoverAddButton();
clickAddButton();