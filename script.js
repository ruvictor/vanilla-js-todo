// output todays date
//today's date
const date = document.getElementById('date');
const options = {weekday: "long", month: "short", day: "numeric"}
const today = new Date();
date.innerHTML = today.toLocaleDateString("en-US", options);

// vars
let todoArray = [], id = 0;
const list = document.querySelector('#list');

// UI Class
class UI{
    //display todos
    static displayToDo(){
        const todos = Store.getToDos();
        todos.forEach((todo) => UI.addToDoToList(todo, id));
    }

    // add ToDo To List
    static addToDoToList(toDo, id){
        const liItem = `<li>
        <p class="text">${toDo}</p>
        <i class="far fa-circle co" action="complete" id="${id}"></i>
        <i class="far fa-trash-alt" action="delete" id="${id}"></i>
        </li>`;
        const position = "beforeend";
        list.insertAdjacentHTML(position, liItem);
    }

    // remove element
    static removeToDo(element){
        element.parentNode.parentNode.removeChild(element.parentNode);
    }

    // complete element
    static completeToDo(element){
        const CHECK = "fa-check-circle";
        const UNCHECK = "fa-circle";
        element.classList.toggle(CHECK);
        element.classList.toggle(UNCHECK);
        element.parentNode.querySelector(".text").classList.toggle("checkedLine");
    }

    // clear all todo
    static clearToDo(){
        list.innerHTML = '';
        localStorage.clear();
    }
}

// store class
class Store{
    static getToDos(){
        let todos;
        if(localStorage.getItem('toDo') === null){
            todos = [];
        }else{
            todos = JSON.parse(localStorage.getItem('toDo'));
        }
        return todos;
    }

    static addToDo(toDo, id){

        const todos = Store.getToDos();

        todos.push({text: toDo, id: id});

        localStorage.setItem('toDo', JSON.stringify(todos));
    }
}

// Event to display todos
document.addEventListener('DOMContentLoaded', UI.displayToDo);

// if press ENTER then we call 
// addNewTodo from UI
document.addEventListener("keyup", function(){
    if(event.keyCode == 13){
        const toDoItem = input.value;
        // here a little validation
        if(toDoItem){
            // add to do to UI
            UI.addToDoToList(toDoItem, id);

            // add to to to loclal storage
            Store.addToDo(toDoItem, id);

            // increment id
            id++;
        }
        input.value = "";
    }
});

// this method is for checking and removing items
list.addEventListener("click", (event) => {
    
    const element = event.target;
    if(element.attributes.action){
        const elementAction = element.attributes.action.value;
        if(elementAction == "complete"){
            UI.completeToDo(element);
        }else if(elementAction == "delete"){
            UI.removeToDo(element);
        }
    }
    
});