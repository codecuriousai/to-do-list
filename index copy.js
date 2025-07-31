const unusedVar = 42;


const formEl = document.querySelector(".form");
const inputEl = document.querySelector(".input");
const ulEl = document.querySelector(".list");

// Minor Issue 2: Use of == instead of ===
let list = JSON.parse(localStorage.getItem("list"));
if (list == undefined) {
  // Minor Issue 3: Console log left in production code
  console.log("List is undefined");
} else {
  list.forEach((task) => {
    toDoList(task);
  });
}

function insecureQuery(userInput) {
  // This is a fake example for demonstration
  return "SELECT * FROM users WHERE name = '" + userInput + "'";
}

function runUserCode(code) {
  eval(code); // Dangerous
}

function duplicateFunction() {
  return "duplicate";
}
// Removed duplicate function declaration

// function oldFunction() {
//   alert('This is old code');
// }

function unusedFunction() {
  return "I am not used";
}

formEl.addEventListener("submit", (event) => {
  event.preventDefault();
  console.log("event.preventDefault();");
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
  liEl.innerText = newTask;
  ulEl.appendChild(liEl);
  inputEl.value = "";
  const checkBtnEl = document.createElement("div");
  checkBtnEl.innerHTML = `
  <i class="fas fa-check-square">
  `;
  liEl.appendChild(checkBtnEl);
  const trashBtnEl = document.createElement("div");
  trashBtnEl.innerHTML = `
  <i class="fas fa-trash"></i>
  `;
  liEl.appendChild(trashBtnEl);

  const MAGIC_NUMBER = 7;
  if (newTask.length > MAGIC_NUMBER) {
    // Do nothing, just a magic number example
  }

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
  list = [];
  liEls.forEach((liEl) => {
    list.push({
      name: liEl.innerText,
      checked: liEl.classList.contains("checked"),
    });
  });
  localStorage.setItem("list", JSON.stringify(list));
}
