'use strict'

// Building a console-implemented todoList.
// For practice with objects and arrays.

let todoList = [];

function runApp(){
    let doWhat = true;
    while(doWhat){
        doWhat = Number(prompt("Welcome. Welcome. Welcome. What would you like to do?\n\n1. Add a todo\n2. Add an urgent todo [add to top of list]\n3. View all todos\n4. Modify a todo\n5. Delete a todo\n6. Quit\n\n[Enter number next to option.]", 1));

        if(doWhat < 7 && doWhat > 0){
            if(doWhat === 1){
                console.log("\n\nAdding a todo...");
                addTodo();
            }
            else if(doWhat === 2){
                console.log("\n\nAdding urgent todo...");
                addUrgentTodo();
            }
            else if(doWhat === 3){
                console.log("\n\nListing your todos from oldest[assumed most urgent]...");
                listTodos();
            }
    
            else if(doWhat === 4){
                console.log("\n\nModifying todo...");
                editTodo();
            }
            else if(doWhat === 5){
                console.log("\n\nDeleting todo...");
                deleteTodo();
            }
            else if(doWhat === 6){
                alert("\n\n---Quiting----");
            }
        }else{
            alert("Invalid option. [Valid Options: Numbers 1 to 6]");
        }
    }
}

function addTodo(){
    // future: Don't add item if already in todoList
    let proceed = true;
    while(proceed){
        let itemTodo = {};
        itemTodo["todoTitle"] = prompt("Remember to: ", "Pay rent");
        itemTodo["todoDueDate"] = prompt("Date: ", "30th-Dec-2017");
        itemTodo["todoDueTime"] = prompt("Time: ", "6.30pm");
        if(itemTodo.todoTitle && itemTodo.todoDueDate && itemTodo.todoDueTime){
            todoList.push(itemTodo);
            alert("This has been added to your todo list\n" + "Title: " + itemTodo.todoTitle + " | Date: " + itemTodo.todoDueDate +" | Time: " + itemTodo.todoDueTime);
        }
        else{
            alert("You entered an invalid todo. A todo must have Title, Date, and Time.\nPlease try again.")
        }

        proceed = confirm("Add another to do?");
    }
}

function addUrgentTodo(){
    let proceed = true;
    while(proceed){
        let itemTodo = {};
        itemTodo["todoTitle"] = prompt("Remember to: ", "Pay rent");
        itemTodo["todoDueDate"] = prompt("Date: ", "30th-Dec-2017");
        itemTodo["todoDueTime"] = prompt("Time: ", "6.30pm");

        if(itemTodo.todoTitle && itemTodo.todoDueDate && itemTodo.todoDueTime){
            todoList.unshift(itemTodo);
            alert("This has been added to the top of your todo list\n" + "Title: " + itemTodo.todoTitle + " | Date: " + itemTodo.todoDueDate +" | Time: " + itemTodo.todoDueTime);
        }
        else{
            alert("You entered an invalid todo. A todo must have Title, Date, and Time.\nPlease try again.")
        } 

        proceed = confirm("Add another urgent to do?");
    }
}   

function listTodos(){
    console.log("\n\n");
    if(todoList.length == 0){
        alert("You have no items in your to-do list. Add some first");
    }
    else{
        let i = 0;
        while(i < todoList.length){
            let item = todoList[i];
            console.log(i+1 + ". " + "Title: " + item.todoTitle + " | Date: " + item.todoDueDate + " | Time: " + item.todoDueTime);
            console.log("--".repeat(40));
            i++;
        }
        console.log("\n\n");
    }
}

function editTodo(){
    if(todoList.length > 0){
        let proceed = true;
        while(proceed){
            listTodos();
            let numberToEdit = prompt("On the console is displayed the list of items in your todoList. Enter the number to modify.", "0");
            if (numberToEdit <= todoList.length && numberToEdit !== "0"){
                let indexToEdit = numberToEdit - 1;
                let modifiedItem = {};
                modifiedItem["todoTitle"] = prompt("Modify to: ", todoList[indexToEdit].todoTitle);
                modifiedItem["todoDueDate"] = prompt("Modify to: ", todoList[indexToEdit].todoDueDate);
                modifiedItem["todoDueTime"] = prompt("Modify to: ", todoList[indexToEdit].todoDueTime);

                let confirmSave = confirm("Save changes?")
                if (confirmSave){
                    todoList.splice(indexToEdit, 1, modifiedItem);
                    alert("Changes successful.")
                }
            }
            proceed = confirm("Edit another to do?")
        }
        listTodos()
    } else{
        alert("You have no items on your to do list. Please add some first")
    }
    
}

function deleteTodo(){
    if(todoList.length > 0){
        listTodos()
        let numberToDelete = Number(prompt("On the console is displayed the list of items in your todoList. Enter the number to delete.", "None"));
        if(numberToDelete <= todoList.length-1 && numberToDelete > 0){
            let indexToDelete = numberToDelete - 1;
            let confirmDelete = confirm("Are you sure you want to delete?");
            if (confirmDelete){
                todoList.splice(indexToDelete, 1);
                alert("Delete successful.");
            }
        }
    listTodos()
    } else{alert("You have no items on your to do list. Please add some first")}
}

runApp();