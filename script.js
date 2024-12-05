const todoForm = document.querySelector('form')
const todoInput = document.getElementById('todo-input')
const todoList = document.getElementById('todo-list')
const deletetodo=document.getElementById('delete-button')
const All=document.getElementById('all')
const pending=document.getElementById('pending')
const completed=document.getElementById('completed')

let alltodo = JSON.parse(localStorage.getItem('alltodo')) || []; 
let currentFilter = 'all';
window.onload = () => {
    updateTodoList();
};
todoForm.addEventListener('submit',function(e){
    e.preventDefault()
    addTodo();
})

function addTodo(){
    const todoText=todoInput.value.trim();
    if(todoText.length > 0){
        alltodo.push({ text: todoText, completed: false });
        saveToLocalStorage();
        updateTodoList()
        todoInput.value=''
    }
        else{
            alert('Please enter a todo item')
        }
    
}

function updateTodoList(){
    todoList.innerHTML=''
    const filteredTodos = alltodo.filter(todo => {
        if (currentFilter === 'all') return true;
        if (currentFilter === 'completed') return todo.completed;
        if (currentFilter === 'pending') return !todo.completed;
    });

    if (filteredTodos.length === 0) {
        // If no tasks match the current filter, show "No tasks" message
        const noTaskMessage = document.createElement('li');
        noTaskMessage.textContent = 'No tasks found.';
        noTaskMessage.style.textAlign = 'center'; // Center the message
        noTaskMessage.style.color = 'gray'; // Add a subtle color
        todoList.append(noTaskMessage);
    } else {
        // Render tasks if they exist
        filteredTodos.forEach((todo, todoIndex) => {
            const todoItem = createTodoItem(todo, todoIndex);
            todoList.append(todoItem);
        });
    }
}
function deleteTodo(todoIndex){
    alltodo.splice(todoIndex,1)
    saveToLocalStorage();
    updateTodoList()
    
}

function toggleTodoCompletion(todoIndex) {
    // Toggle the completed property
    alltodo[todoIndex].completed = !alltodo[todoIndex].completed;
    saveToLocalStorage();
    updateTodoList();
}


function createTodoItem(todoText,todoIndex){
    const todoId='todo-'+todoIndex
    const todoLi=document.createElement('li')
    // todoLi.className='todo';
    const completedClass = todoText.completed ? 'line-through' : '';
    todoLi.innerHTML=`
     <li class="todo">
                    <div class='two'>
                    <input type="checkbox" id="${todoId}" ${todoText.completed ? 'checked' : ''} onchange="toggleTodoCompletion(${todoIndex})">
                  <label for="${todoId}" class="${completedClass}">${todoText.text}</label>
                  </div>
                <button class="delete-button" onclick="deleteTodo(${todoIndex})">Delete</button>
            </li>
    `
    return todoLi
}

function setFilter(filterType) {
    // Update the filter state
    currentFilter = filterType; 

    // Set the active class on the clicked filter button
    const buttons = document.querySelectorAll('.filter-buttons button');
    buttons.forEach(button => button.classList.remove('active')); // Remove active class from all buttons
    event.target.classList.add('active'); // Add active class to the clicked button
    
    updateTodoList(); // Re-render the list based on the new filter
}

function saveToLocalStorage() {
    localStorage.setItem('alltodo', JSON.stringify(alltodo)); // Save tasks to localStorage
}