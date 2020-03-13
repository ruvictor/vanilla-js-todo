// output todays date
//today's date
const date = document.getElementById('date');
const options = {weekday: "long", month: "short", day: "numeric"}
const today = new Date();
date.innerHTML = today.toLocaleDateString("en-US", options);

// vars
let id = 0;
const list = document.querySelector('#list');

// UI Class
class UI{
    //display todos
    static displayToDo(){
        const todos = Store.getToDos();
        todos.forEach((todo) => UI.addToDoToList(todo.text, todo.id, todo.completed));
    }

    // add ToDo To List
    static addToDoToList(toDo, id, ifChecked){
        // 
        const completed = ifChecked ? 'checkedLine' : '';
        const statusIcon = ifChecked ? 'fa-check-circle' : 'fa-circle';
        const liItem = `<li>
        <p class="text ${completed}">${toDo}</p>
        <i class="far ${statusIcon} co" action="complete" id="${id}"></i>
        <i class="far fa-trash-alt" action="delete" id="${id}"></i>
        </li>`;
        const position = "beforeend";
        list.insertAdjacentHTML(position, liItem);
    }

    // remove element
    static removeToDo(element){
        // remove item from UI
        element.parentNode.parentNode.removeChild(element.parentNode);
        
        // get value of the current id and remove it from storage
        const curId = element.attributes.id.value;
        const todos = Store.getToDos();
        todos.forEach((todo, index) => {
            if(+todo.id === +curId){
                todos.splice(index, 1);
            }
        });

        localStorage.setItem('toDo', JSON.stringify(todos));
    }

    // complete element
    static completeToDo(element){
        const CHECK = "fa-check-circle";
        const UNCHECK = "fa-circle";
        element.classList.toggle(CHECK);
        element.classList.toggle(UNCHECK);
        element.parentNode.querySelector(".text").classList.toggle("checkedLine");

        // update the storage
        const curId = element.attributes.id.value;
        const todos = Store.getToDos();
        todos.forEach((todo, index) => {
            if(+todo.id === +curId){
                todos[index].completed = todos[index].completed ? false : true;
            }
        });

        localStorage.setItem('toDo', JSON.stringify(todos));
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

    static addToDoToList(toDo, id){

        const todos = Store.getToDos();

        todos.push({text: toDo, id: id, completed: false});

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
            UI.addToDoToList(toDoItem, Date.now());

            // add todo to loclal storage
            Store.addToDoToList(toDoItem, Date.now());

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