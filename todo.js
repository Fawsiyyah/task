let todoItems = [];
const testButton = document.getElementById("test")

testButton.addEventListener("click", () => {
  if (document.getElementById('todo-text').value !== ""){
    addTodo()
    renderTodo()
  }
  
})


const testContainer = document.getElementById("list-container")


function renderTodo() {
 
  // console.log(array);
  const storage = JSON.parse(localStorage.getItem('todoItems'))
  array = storage
  console.log('i work');
  const list = document.querySelector('.js-todo-list');
  let output = ""
  array.forEach(element => {
    output += `
    <li class="todo-js-item" id="${element.id}">
      
      <span>${element.text}</span>
      <button class="delete-todo js-delete-todo">
      <svg><use href="#delete-icon"></use></svg>
      </button>
    </li>
    `
  })
  testContainer.innerHTML= output 
}
renderTodo()

function addTodo() {
  const todo = {
    text: `${document.getElementById('todo-text').value}`,
    checked: false,
    id: Date.now(),
  }
  document.getElementById('todo-text').value = ""
  todoItems.unshift(todo);
  localStorage.setItem('todoItems', JSON.stringify(todoItems));

  return todoItems;
}

function deleteTodo(itemKey) {
  const storage = JSON.parse(localStorage.getItem('todoItems'))
  todoItems = storage
  todoItems.forEach(element=>{
  
   if (element.id.toString() === itemKey){
    element.checked = true
   }
  }) 
  const filteredStorage = todoItems.filter(element => element.checked !== true)
  todoItems = filteredStorage
  localStorage.setItem('todoItems', JSON.stringify(todoItems));
  renderTodo()
}


// function toggleDone(itemKey) {
//   const storage = JSON.parse(localStorage.getItem('todoItems'))
//   todoItems = storage
//   todoItems.forEach(element=>{
//    if (element.id.toString() === itemKey && element.checked === false){
//     element.checked = true
//    }
//    if (element.id.toString() === itemKey && element.checked === true){
//     element.checked = false
//    }
//   }) 
//   localStorage.setItem('todoItems', JSON.stringify(todoItems));
// }



// const form = document.querySelector('.todo-form');
// form.addEventListener('submit', event => {
//   event.preventDefault();
//   const input = document.querySelector('.todo-input');

//   const text = input.value.trim();
//   if (text !== '') {
//     addTodo(text);
//     input.value = '';
//     input.focus();
//   }
// });

const list = document.querySelector('.js-todo-list');
list.addEventListener('click', event => {
  // if (event.target.id= 'check-todo') {
  //   const itemKey = event.target.parentElement.id;
  //   toggleDone(itemKey);
  // }
  
  if (event.target.classList.contains('js-delete-todo')) {
    const itemKey = event.target.parentElement.id;
    deleteTodo(itemKey);
    //console.log(itemKey);
  }
});

document.addEventListener('DOMContentLoaded', () => {
  const ref = localStorage.getItem('todoItems');
  if (ref) {
    todoItems = JSON.parse(ref);
    todoItems.forEach(t => {
      renderTodo(t);
    });
  }
});
