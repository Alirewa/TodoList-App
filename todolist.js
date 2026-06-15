let filterValue = "all";
let editingId = null;

const addForm       = document.getElementById("addForm");
const addInput      = document.getElementById("addInput");
const todoList      = document.getElementById("todoList");
const emptyState    = document.getElementById("emptyState");
const emptyTitle    = document.getElementById("emptyTitle");
const emptyHint     = document.getElementById("emptyHint");
const filterTabs    = document.querySelectorAll(".filter-tab");
const modalBackdrop = document.getElementById("modalBackdrop");
const editForm      = document.getElementById("editForm");
const editInput     = document.getElementById("editInput");
const modalClose    = document.getElementById("modalClose");
const modalCancel   = document.getElementById("modalCancel");
const totalCount    = document.getElementById("totalCount");
const doneCount     = document.getElementById("doneCount");
const leftCount     = document.getElementById("leftCount");

// ─── Init ────────────────────────────────────────────────
document.addEventListener("DOMContentLoaded", renderTodos);

// ─── Add todo ────────────────────────────────────────────
addForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const title = addInput.value.trim();
  if (!title) { addInput.focus(); return; }

  const todos = getAllTodos();
  todos.unshift({
    id: Date.now(),
    createdAt: new Date().toISOString(),
    title,
    isCompleted: false,
  });
  saveAllTodos(todos);
  addInput.value = "";
  renderTodos();
});

// ─── Filter tabs ─────────────────────────────────────────
filterTabs.forEach((tab) => {
  tab.addEventListener("click", () => {
    filterTabs.forEach((t) => {
      t.classList.remove("active");
      t.setAttribute("aria-selected", "false");
    });
    tab.classList.add("active");
    tab.setAttribute("aria-selected", "true");
    filterValue = tab.dataset.filter;
    renderTodos();
  });
});

// ─── Edit form submit ─────────────────────────────────────
editForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const newTitle = editInput.value.trim();
  if (!newTitle || editingId === null) return;

  const todos = getAllTodos();
  const todo  = todos.find((t) => t.id === editingId);
  if (todo) {
    todo.title = newTitle;
    saveAllTodos(todos);
  }
  closeModal();
  renderTodos();
});

// ─── Modal controls ──────────────────────────────────────
[modalClose, modalCancel].forEach((el) => el.addEventListener("click", closeModal));

modalBackdrop.addEventListener("click", (e) => {
  if (e.target === modalBackdrop) closeModal();
});

document.addEventListener("keydown", (e) => {
  if (e.key === "Escape") closeModal();
});

function openModal(id) {
  const todo = getAllTodos().find((t) => t.id === id);
  if (!todo) return;
  editingId = id;
  editInput.value = todo.title;
  modalBackdrop.classList.remove("hidden");
  requestAnimationFrame(() => editInput.focus());
}

function closeModal() {
  if (modalBackdrop.classList.contains("hidden")) return;
  modalBackdrop.classList.add("hidden");
  editingId = null;
}

// ─── Render ───────────────────────────────────────────────
function renderTodos() {
  const todos = getAllTodos();

  // Stats
  const total = todos.length;
  const done  = todos.filter((t) => t.isCompleted).length;
  totalCount.textContent = toPersianNum(total);
  doneCount.textContent  = toPersianNum(done);
  leftCount.textContent  = toPersianNum(total - done);

  // Filter
  let filtered;
  if      (filterValue === "completed")   filtered = todos.filter((t) => t.isCompleted);
  else if (filterValue === "uncompleted") filtered = todos.filter((t) => !t.isCompleted);
  else                                    filtered = todos;

  // Empty state
  if (filtered.length === 0) {
    todoList.innerHTML = "";
    emptyState.classList.remove("hidden");
    if (todos.length === 0) {
      emptyTitle.textContent = "هنوز وظیفه‌ای نداری";
      emptyHint.textContent  = "اولین وظیفه‌ات رو بالا اضافه کن!";
    } else {
      emptyTitle.textContent = "وظیفه‌ای با این فیلتر پیدا نشد";
      emptyHint.textContent  = "فیلتر دیگری رو امتحان کن";
    }
    return;
  }

  emptyState.classList.add("hidden");
  todoList.innerHTML = filtered.map((todo) => `
    <li class="todo-item${todo.isCompleted ? " completed" : ""}" data-id="${todo.id}">
      <button class="todo-check" data-id="${todo.id}"
        aria-label="${todo.isCompleted ? "علامت‌گذاری به‌عنوان انجام‌نشده" : "علامت‌گذاری به‌عنوان انجام‌شده"}">
        ${todo.isCompleted ? svgCheckDone() : svgCheckEmpty()}
      </button>
      <div class="todo-content">
        <span class="todo-title">${escapeHtml(todo.title)}</span>
        <span class="todo-date">${formatDate(todo.createdAt)}</span>
      </div>
      <div class="todo-actions">
        <button class="todo-edit"   data-id="${todo.id}" aria-label="ویرایش">${svgEdit()}</button>
        <button class="todo-delete" data-id="${todo.id}" aria-label="حذف">${svgDelete()}</button>
      </div>
    </li>
  `).join("");

  todoList.querySelectorAll(".todo-check").forEach((btn) =>
    btn.addEventListener("click", () => toggleTodo(Number(btn.dataset.id)))
  );
  todoList.querySelectorAll(".todo-edit").forEach((btn) =>
    btn.addEventListener("click", () => openModal(Number(btn.dataset.id)))
  );
  todoList.querySelectorAll(".todo-delete").forEach((btn) =>
    btn.addEventListener("click", () => deleteTodo(Number(btn.dataset.id)))
  );
}

// ─── Actions ─────────────────────────────────────────────
function toggleTodo(id) {
  const todos = getAllTodos();
  const todo  = todos.find((t) => t.id === id);
  if (!todo) return;
  todo.isCompleted = !todo.isCompleted;
  saveAllTodos(todos);
  renderTodos();
}

function deleteTodo(id) {
  saveAllTodos(getAllTodos().filter((t) => t.id !== id));
  renderTodos();
}

// ─── Helpers ─────────────────────────────────────────────
function formatDate(iso) {
  return new Date(iso).toLocaleDateString("fa-IR", {
    year: "numeric", month: "long", day: "numeric",
  });
}

function toPersianNum(n) {
  return String(n).replace(/\d/g, (d) => "۰۱۲۳۴۵۶۷۸۹"[d]);
}

function escapeHtml(str) {
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

// ─── Storage ─────────────────────────────────────────────
function getAllTodos() {
  return JSON.parse(localStorage.getItem("todos")) || [];
}
function saveAllTodos(todos) {
  localStorage.setItem("todos", JSON.stringify(todos));
}

// ─── SVG Icons ───────────────────────────────────────────
function svgCheckDone() {
  return `<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>`;
}
function svgCheckEmpty() {
  return `<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><circle cx="12" cy="12" r="10"/></svg>`;
}
function svgEdit() {
  return `<svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/></svg>`;
}
function svgDelete() {
  return `<svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><polyline points="3 6 5 6 21 6"/><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v2"/></svg>`;
}
