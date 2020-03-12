// Select elements
const date = document.getElementById('date');
const clear = document.querySelector(".clear");
const list = document.getElementById("list");
const input = document.getElementById("input");

// define classes
const CHECK = "fa-check-circle";
const UNCHECK = "fa-circle";
const checkedLine = "checkedLine";

// variables
let LIST, id;

// clear storage
clear.addEventListener("click", function(){
    localStorage.clear();
    location.reload();
});

// get item from localstorage
let data = localStorage.getItem("TODO");
if(data){
    LIST = JSON.parse(data);
    console.log(LIST);
    id = LIST.length; // set the is to the last one in the list
    LoadList(LIST); // load the list to the user interface
}else{
    LIST = [];
    id = 0;
}

// load items to user interface
function LoadList(array){
    array.forEach(function(item){
        addNewItem(item.name, item.id, item.done, item.trash);
    });
}

//today's date
const options = {weekday: "long", month: "short", day:"numeric"}
const today = new Date();

date.innerHTML = today.toLocaleDateString("en-US", options);

// new todo function
function addNewItem(ToDoitem, id, done, trash){
    if(trash) {return;}

    const DONE = done ? CHECK : UNCHECK;
    const LINE = done ? checkedLine : "";

    const item = `
    <li class="item">
        <p class="text ${LINE}">${id + 1}) ${ToDoitem}</p>
        <i class="far ${DONE} co" job="complete" id="${id}"></i> 
        <i class="far fa-trash-alt" job="delete" id="${id}"></i>
    </li>
    `;
    const position = "beforeend";
    list.insertAdjacentHTML(position, item);
}

// enter key listener
document.addEventListener("keyup", function(){
    if(event.keyCode == 13){
        const ToDoitem = input.value;
        // check if there is any text in the todo
        if(ToDoitem){
            addNewItem(ToDoitem, id, false, false);
            LIST.push({
                name: ToDoitem,
                id: id,
                done: false,
                trash: false
            });

            // add to localstorage
            localStorage.setItem("TODO", JSON.stringify(LIST));

            id++;
        }
        input.value = "";
    }
});

// complet todo
function completeToDo(element){
    element.classList.toggle(CHECK);
    element.classList.toggle(UNCHECK);
    element.parentNode.querySelector(".text").classList.toggle(checkedLine);

    LIST[element.id].done = LIST[element.id].done ? false : true;
}

// delete doto
function deleteToDo(element){
    element.parentNode.parentNode.removeChild(element.parentNode);

    LIST[element.id].trash = true;
}

// target the items created dynamicly
list.addEventListener("click", function(event){
    const element = event.target;
    const elementJob = element.attributes.job.value;

    if(elementJob == "complete"){
        completeToDo(element);
    }else if(elementJob == "delete"){
        deleteToDo(element);
    }
    // add to localstorage
    localStorage.setItem("TODO", JSON.stringify(LIST));
});