'use strict'

var toDo = [];

function runApp() {
    var whatToDo = '';
    while (whatToDo !== 'quit') {
        whatToDo = prompt("What would you like to do?\nTry one of these:\n1. Add\n2. View\n3. Edit\n4. Delete\n5. Quit").toLowerCase();
        if (whatToDo === 'view') {
            viewToDo();
        } else if (whatToDo === 'add') {
            addToDo();
        } else if (whatToDo === 'delete') {
            deleteToDo();
        } else if (whatToDo === 'edit') {
            editToDo();
        }
    }
    console.log("Alright, you quit, quitter.");
}

function loopToDos(element, i) {
    console.log("--".repeat(30));
    console.log(1 + i + ".  " + element);
}

function viewToDo() {
    if (toDo.length === 0){
        console.log("You have no items in your to-do.\nEnter some items first. ");
    }else{
        console.log("\n\nLe To-Do List\n");
        toDo.forEach(loopToDos);
        console.log("\n\n");
    }
}

function addToDo() {
    var itemToAdd = prompt("What would you like to add to your to-do's?");
    toDo.push(itemToAdd);
    console.log("'" + itemToAdd + "'" + " added to to-do's");
}

function editToDo() {
    if (toDo.length === 0){
        console.log("You have no items in your to-do.\nEnter some items first. ");
    }else{
        console.log("\n\nHere is your list of to-dos: ")
        viewToDo()
        var itemToEdit = prompt("Edit item number: ?") - 1;
        let save_that = toDo[itemToEdit]
        var changeItemTo = prompt("Modify it to read as: ?", toDo[itemToEdit]);
        toDo.splice(itemToEdit, 1, changeItemTo);
        console.log("'" + save_that + "'" + " modified to " + "'" + changeItemTo + "'")
        // can also be used to insert 
        // items at a designate index when the 1 is 0
    }
}

function deleteToDo() {
    if (toDo.length === 0){
        console.log("You have no items in your to-do.\nEnter some items first. ");
    }else{
        console.log("\n\nHere is your list of to-dos: ")
        viewToDo()
        var whichItem = Number(prompt("Delete item number: ")) - 1;
        if (whichItem >= toDo.length) {
            console.log("You do not have that many items in your to do, I'm afraid");
        }else{
            let deleted_item = toDo[whichItem]
            toDo.splice(whichItem, 1);
            console.log("'" + deleted_item + "'" + " deleted successfully");
        }
    }
}

runApp()