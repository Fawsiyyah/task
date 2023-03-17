// //created close button and appended to list items

// var myNodelist = document.getElementsByTagName("LI");
// var i;
// for (i = 0; i < myNodelist.length; i++) {
//     var span = document.createElement("SPAN");
//     var txt = document.createTextNode("\u00d7");
//     span.className = "close";
//     span.appendChild(txt);
//     myNodelist[i].appendChild(span);
// }

// //deleting current list item
// var close = document.getElementsByClassName("close");
// var i;
// for (i = 0; i < close.length; i++) {
//     close[i].onClick = function() {
//         var div = this.parentElement;
//         div.style.display = "none"
//     }
// }

// //checking an item
// var list = document.querySelector('ul');
// list.addEventListener('click', function(ev) {
//     if (ev.target.tagName === 'LI') {
//         ev.target.classList.toggle('checked');
//     }
// }, false);

// //create new list item
// function newElement() {
//     var li = document.createElement("li");
//     var inputValue = document.getElementById("myInput").ariaValueMax;
//     var t = document.createTextNode(inputValue);
//     li.appendChild(t);
//     if (inputValue === '') {
//         alert("Input cannot be blank!")
//     } else {
//         document.getElementById("myInput").value = "";
        
//         var span = document.createElement("SPAN");
//         var txt = document.createTextNode("\u00D7");
//         span.className = "close";
//         span.appendChild(txt);
//         li.appendChild(span);

//         for (i = 0; i < close.length; i++) {
//             close[i].onClick = function() {
//                 var div = this.parentElement;
//                 div.style.display="none";
//             }
//         }
//     }
// }


//function that creates new list and adds to thE top
let todoItems = []
function addTodo(text) {
    const todo= {
    text,
    checked: false,
    id: Date.now(),
};

todoItems.prepend(todo);
renderTodo(todo);
}

//selecting the form element and adding a submit event listner
const form = document.querySelector('.js-form');
form.addEventListener('submit', event => {
    //prevent page from refreshing
    event.preventDefault();
    const input = document.querySelector('.js-todo-input');

    //getting the value of the input and remove whitespace
const text = input.value.trim();
if(text !== '') {
    addTodo(text);
    input.value='';
    input.focus();
}
})

//show inputed todo item on page
localStorage.setItem('todoItemsRef', JSON.stringify(todoItems));
function renderTodo(todo) {
    const list = document.querySelector('.js-todo-list');
    const item = document.querySelector(`[data-key='${todo.id}']`);

    if (todo.deleted) {
        item.remove();
        return
    }

    //tenary operator to check if 'todo-checked' is true, then assign 'done'to 'isChecked'
    const isChecked = todo.checked ? 'done':'';
    const node = document.createElement("li");
    node.setAttribute('class, `todo-item ${isChecked}');
    node.setAttribute('data-key', todo.id);

    //set contents of li to element created above
    node.innerHTML = `
    <input id="${todo.id}" type= "checkbox" />
    <label for= "${todo.id}" class="tick js-tick"></label>
    <span>${todo.text}</span>
    <button class="delete-todo js-delete-todo"><svg><use href="#delete-icon"></use></svg></button>
    `;

    if (item) {
        list.replaceChild(node, item);
    }else {
        list.append(node);
    }
    
}

//delete todo items
const list = document.querySelector('.js-todo-list');
list.addEventListener('click', event => {
    if(event.target.classList.contains('js-tick')){
        const itemKey = event.target.parentElement.dataset.key;
        toggleDone(itemKey)
    }
});

function deleteTodo(key) {
    const index = todoItems.findIndex(item => item.id === Number(key));
    const todo = {
        deleted: true,
        ...todoItems[index]
    };

    todoItems = todoItems.filter(item => item.id !== Number(key));
    renderTodo(todo);
}

document.addEventListener('DOMContentLoaded', () => {
    const ref = localStorage.getItem('todoItemsRef');
    if (ref) {
        todoItems= JSON.parse(ref);
        todoItems.forEach(t => {
            renderTodo(t);
        });
    }
});
