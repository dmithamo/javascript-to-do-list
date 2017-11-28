'use strict'

var toDo = [];

function runApp() {

    var whatToDo = ''
    while (whatToDo !== 'quit') {
        whatToDo = prompt("What would you like to do?\nTry one of these:\n1. Quit\n2. Add\n3. View\n4. Edit\n5. Delete").toLowerCase()
        if (whatToDo === 'view') {
            viewToDo()
        } else if (whatToDo === 'add') {
            addToDo()
        } else if (whatToDo === 'delete') {
            deleteToDo()
        } else if (whatToDo === 'edit') {
            editToDo()
        }
    }
    console.log("Alright, you quit, quitter.")
}


function loopTwo(element) {
    console.log("--".repeat(30))
    console.log((1 + toDo.indexOf(element)) + ".  " + element)
}

function viewToDo() {
    if (toDo.length === 0){
        console.log("You have no items in your to-do.\nEnter some items first. ")
    }else{
        console.log("\n\nLe To-Do List\n")
        toDo.forEach(loopTwo)
        console.log("\n\n")
    }
}

function addToDo() {
    var itemToAdd = prompt("What would you like to add to your to-do's?")
    toDo.push(itemToAdd)
}

function editToDo() {
    if (toDo.length === 0){
        console.log("You have no items in your to-do.\nEnter some items first. ")
    }else{
        var itemToDelete = prompt("Edit item number: ?") - 1
        var changeItemTo = prompt("Modify it to read as: ?", toDo[itemToDelete])
        toDo.splice(itemToDelete, 1, changeItemTo)
        // can also be used to insert 
        // items at a designate index when the 1 is 0
    }
}

function deleteToDo() {
    if (toDo.length === 0){
        console.log("You have no items in your to-do.\nEnter some items first. ")
    }else{
        var whichItem = Number(prompt("Delete item number: ")) - 1
        if (whichItem >= toDo.length) {
            console.log("You do not have that many items in your to do, I'm afraid")
        }else{
            console.log("We are deleting item on index: " + whichItem)
            toDo.splice(whichItem, 1)
            console.log("Delete successful")
        }
    }
}

runApp()