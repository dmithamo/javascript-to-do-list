'use strict'

let todoList = [];


// Mouse over the add-todo button
let addButton = document.querySelector("#add-new");
addButton.addEventListener("mouseover", function () {
    addButton.classList.add("hovered-button");
});
addButton.addEventListener("mouseout", function () {
    addButton.classList.remove("hovered-button")
});

// Function adds an event to the todo list, and calls the listTodos() function to display added events
addButton.addEventListener("click", addTodo);
function addTodo(){
    // future: Don't add item if already in todoList
    let proceed = true;
    while(proceed){
        let itemTodo = {};
        itemTodo["todoTitle"] = prompt("Remember to: ", "Buy a Range Rover");
        if(itemTodo.todoTitle){
            itemTodo["todoDueDate"] = prompt("Date: ", "30th-Dec-2020");
        }
        if(itemTodo.todoDueDate){
            itemTodo["todoDueTime"] = prompt("Time: ", "3.30pm");
        }
        if(itemTodo.todoTitle && itemTodo.todoDueDate && itemTodo.todoDueTime){
            todoList.push(itemTodo);
            listTodos();

            let rows = document.getElementsByClassName("td-body");
            for(let a = 0; a < rows.length; a++){
                rows[a].classList.add("style-table-item");
            }

            alert("Success!");
 
        }
        else{
            alert("You entered an invalid todo. A todo must have Title, Date, and Time.\nPlease try again.")
        }

        proceed = confirm("Add another to do?");
    }

}


// Alters the contents of the table-tag once a todo has been added to the todo list
let tableTag = document.getElementById("table-tag");
addButton.addEventListener("click", function(){
    if(todoList.length != 0){
        tableTag.innerText = "Your todo List. Press \"+\" to add more todos";
    }
});



// Lists the todos that are in the todoList 
function listTodos(){
    if(todoList.length == 0){
        alert("You have no items in your to-do list. Add some first");
    }
    else{
        let i = 0;
        let allItems = [];
        while(i < todoList.length){
            let item = todoList[i];
            let listItem = "<tr><td class=\"no-style td-body\">" + (i+1) + ". " + "</td>" + "<td class=\"title-style td-body\">" + item.todoTitle + "</td>" + "<td class=\"date-style td-body\">" + item.todoDueDate + "</td>" + "<td class=\"time-style td-body\">" + item.todoDueTime + "</td></tr>";
            allItems.push(listItem)
            document.querySelector("#table-body").innerHTML = "";
            for(let b = 0; b < allItems.length; b++){
                document.querySelector("#table-body").innerHTML += allItems[b];
            }

            i++;
        }
    }
}
