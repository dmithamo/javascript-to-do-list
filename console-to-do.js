'use strict'
// A basic console based to-do list app.

/* 
Pseudocode:
Ask user to pick an option. Display options?
Each option calls different function.

Options:
    1. View to-do list ("view to-do's")
    2. Add new Item to to-do list ("add a to-do")
    3. Remove item from to-do list.("delete a to-do")
    4. Edit an item on the to-do list.("Edit a to-do")
    5. Quit app ("quit")
*/


// app's execution


var toDo = [];

function runApp(){

    var whatToDo = ''
    while (whatToDo !== 'quit'){
        whatToDo = prompt("What would you like to do?\nTry one of these:\n1. Quit\n2. Add\n3. View\n4. Edit\n5. Delete").toLowerCase()
        if (whatToDo === 'view'){
            viewToDo()
        }else if (whatToDo === 'add'){
            addToDo()
        }else if (whatToDo === 'delete'){
            deleteToDo()
        }else if (whatToDo === 'edit'){
            editToDo()
        }

        
        
    }console.log("Alright, you quit, quitter.")
}


function loopTwo(element){
    console.log("--".repeat(30))
    console.log((1 + toDo.indexOf(element)) + ".  " + element)

}

function viewToDo(){
    console.log("Le To-Do List".toUpperCase())
    toDo.forEach(loopTwo)
    console.log("\n\n")
}

function addToDo(){
    var itemToAdd = prompt("What would you like to add to your to-do's?")
    toDo.push(itemToAdd)
}


function editToDo(){
    var itemToDelete = prompt("Edit item number: ?") - 1
    var changeItemTo = prompt("Modify it to read as: ?", toDo[itemToDelete])
    if (itemToDelete >= -1){

    }toDo.splice(itemToDelete, 1, changeItemTo)
    // can also be used to insert 
    // items at a designate index when the 1 is 0
}

function deleteToDo(){
    var whichItem = Number(prompt("Delete item number: ")) - 1
    console.log("We are deleting item on index: " + whichItem)
    if (whichItem >= toDo.length){
        console.log("You do not have that many items in your to do, I'm afraid")
    }else if (whichItem <=-1){
        console.log("Sorry. you have no items in your to-do.\nEnter some items in order to delete.")
    }
    else{
        toDo.splice(whichItem, 1)
        console.log("Delete successful")
    }
}

runApp()