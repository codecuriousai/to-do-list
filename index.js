const formEl = document.querySelector(".form");

const inputEl = document.querySelector(".input");

const ulEl = document.querySelector(".list");

let tasksList = JSON.parse(localStorage.getItem("list"));
if (tasksList) {
  tasksList.forEach((task) => {
    toDoList(task);
  });
}

formEl.addEventListener("submit", (event) => {
  event.preventDefault();
  console.log('event.preventDefault();')
  toDoList();
});

function toDoList(task) {
  let newTask = inputEl.value;
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

  checkBtnEl.addEventListener("click", () => {
    liEl.classList.toggle("checked");
    updateLocalStorage();
  });

  trashBtnEl.addEventListener("click", () => {
    liEl.remove();
    updateLocalStorage();
  });
  updateLocalStorage();
}

function updateLocalStorage() {
  const liEls = document.querySelectorAll("li");
  tasksList = [];
  liEls.forEach((liEl) => {
    tasksList.push({
      name: liEl.textContent,
      checked: liEl.classList.contains("checked"),
    });
  });
  localStorage.setItem("list", JSON.stringify(tasksList));
}