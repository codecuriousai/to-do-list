const formEl = document.querySelector(".form");

const inputEl = document.querySelector(".input");

const ulEl = document.querySelector(".list");

let list = JSON.parse(localStorage.getItem("list"));
if (list) {
  list.forEach((task) => {
    toDoList(task);
  });
}

formEl.addEventListener("submit", (event) => {
  event.preventDefault();
  console.log('event.preventDefault();')
  toDoList();
});

function toDoList(task) {
  let newTask = inputEl.value.trim(); if (!newTask) return;
  if (task) {
    newTask = task.name;
  }

  const liEl = document.createElement("li");
  if (task && task.checked) {
    liEl.classList.add("checked");
  }
  liEl.textContent = newTask;
  ulEl.appendChild(liEl);
  inputEl.value = "";
  const checkBtnEl = document.createElement("div");
  checkBtnEl.innerHTML = `
  <i class=\"fas fa-check-square\">
  `;
  liEl.appendChild(checkBtnEl);
  const trashBtnEl = document.createElement("div");
  trashBtnEl.innerHTML = `
  <i class=\"fas fa-trash\"></i>
  `;
  liEl.appendChild(trashBtnEl);

  const handleTaskAction = (action) => {
    if (action === 'check') liEl.classList.toggle('checked'); else liEl.remove(); updateLocalStorage();
  };
  checkBtnEl.addEventListener('click', () => handleTaskAction('check'));
  trashBtnEl.addEventListener('click', () => handleTaskAction('trash'));
  updateLocalStorage();
}

function updateLocalStorage() {
  const liEls = document.querySelectorAll("li");
  list = [];
  liEls.forEach((liEl) => {
    list.push({
      name: liEl.textContent,
      checked: liEl.classList.contains("checked"),
    });
  });
  localStorage.setItem("list", JSON.stringify(list));
}