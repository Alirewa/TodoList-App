let filterValue = "all";

// selecting:
const todoForm = document.querySelector(".todo-form");
const todoInput = document.querySelector(".todo-input");
const todoEditInput = document.querySelector(".edit-todo-input");
const todoList = document.querySelector(".todolist");
const selectFilter = document.querySelector(".filter-todos");
const submitEditForm = document.querySelector("#submit-edit-form");
const backdrop = document.querySelector(".backdrop");

// events:
document.addEventListener("DOMContentLoaded", (e) => {
  const todos = getAllTodos();
  filterTodos(todos);
});

todoForm.addEventListener("submit", addNewTodo);
selectFilter.addEventListener("change", (e) => {
  filterValue = e.target.value;
  filterTodos();
});

// functions
function addNewTodo(e) {
  e.preventDefault();
  if (!todoInput.value) return null;

  const newTodo = {
    id: Date.now(),
    createdat: new Date().toISOString(),
    title: todoInput.value,
    isCompleted: false,
  };
  saveTodo(newTodo);
  filterTodos();
}
function createTodos(todos) {
  // Create On Dom:
  let result = "";
  todos.forEach((todo) => {
    result += `<li class="todo ${todo.isCompleted && "completed"}">
            <p class="todo__title">${todo.title} </p>
            <span class="todo__createdAt">${new Date(
              todo.createdat
            ).toLocaleDateString("fa-ir")}</span>
            <button data-todo-id= ${
              todo.id
            } class="edit-text open-modal">edit</button>
            <button class="todo__check" data-todo-id= ${
              todo.id
            }><i class="far fa-check-square"></i></button>
            <button class="todo__remove" data-todo-id= ${
              todo.id
            }><i class="far fa-trash-alt"></i></button>
          </li>`;
  });
  todoList.innerHTML = result;
  todoInput.value = "";
  const removeBtns = [...document.querySelectorAll(".todo__remove")];
  removeBtns.forEach((btn) => btn.addEventListener("click", removeTodo));

  const checkBtns = [...document.querySelectorAll(".todo__check")];
  checkBtns.forEach((btn) => btn.addEventListener("click", checkTodo));

  const editBtns = [...document.querySelectorAll(".edit-text")];
  editBtns.forEach((btn) => btn.addEventListener("click", editTodo));
  modal();
}
function filterTodos() {
  const todos = getAllTodos();
  switch (filterValue) {
    case "all": {
      createTodos(todos);
      break;
    }
    case "completed": {
      const filteredTodos = todos.filter((t) => t.isCompleted);
      createTodos(filteredTodos);
      break;
    }
    case "uncompleted": {
      const filteredTodos = todos.filter((t) => !t.isCompleted);
      createTodos(filteredTodos);
      break;
    }
    default:
      createTodos(todos);
  }
}

function removeTodo(e) {
  let todos = getAllTodos();
  const todoId = Number(e.target.dataset.todoId);
  todos = todos.filter((t) => t.id !== todoId);
  saveAllTodos(todos);
  filterTodos();
}
function checkTodo(e) {
  let todos = getAllTodos();
  const todoId = Number(e.target.dataset.todoId);
  const todo = todos.find((t) => t.id == todoId);
  todo.isCompleted = !todo.isCompleted;
  saveAllTodos(todos);
  filterTodos();
}

function editTodo(e) {
  let todos = getAllTodos();
  const todoId = Number(e.target.dataset.todoId);
  const todo = todos.find((t) => t.id == todoId);
  submitEditForm.addEventListener("submit", (e) => {
    e.preventDefault();
    backdrop.classList.add("hidden");
    return todoEditInput.value;
  });
  todo.title = todoEditInput.value; // chetor meghdar input ro inja gharar bedam??;
  saveAllTodos(todos);
  filterTodos();
}


function modal() {
  // modal show/hide
  const openModalBtn = [...document.querySelectorAll(".open-modal")];
  const closeModalBtn = document.querySelectorAll(".modal__close");
  const modal = document.querySelector(".modal");
  closeModalBtn.forEach((e) => {
    e.addEventListener("click", closeModal);
  });
  openModalBtn.forEach((btn) => btn.addEventListener("click", openModal));
  backdrop.addEventListener("click", closeModal);
  modal.addEventListener("click", (e) => e.stopPropagation());

  function openModal(e) {
    backdrop.classList.remove("hidden");
  }
  function closeModal(e) {
    backdrop.classList.add("hidden");
  }
}
// local storage:
function getAllTodos() {
  const savedTodos = JSON.parse(localStorage.getItem("todos")) || [];
  return savedTodos;
}
function saveTodo(todo) {
  const savedTodos = getAllTodos();
  savedTodos.push(todo);
  localStorage.setItem("todos", JSON.stringify(savedTodos));
  return savedTodos;
}
function saveAllTodos(todos) {
  localStorage.setItem("todos", JSON.stringify(todos));
}
