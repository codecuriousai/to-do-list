const formEl = document.querySelector('.form');

const inputEl = document.querySelector('.input');

const ulEl = document.querySelector('.list');

let list = JSON.parse(localStorage.getItem('list'));
if (list) {
  list.forEach((task) => {
    toDoList(task);
  });
}

formEl.addEventListener('submit', (event) => {
  event.preventDefault();
  console.log('event.preventDefault();')
  toDoList();
});

function sanitize(input) {
  const tempDiv = document.createElement('div');
  tempDiv.innerText = input;
  return tempDiv.innerHTML;
}

function toDoList(task) {
  let newTask = inputEl.value.trim();
  if (!newTask) return;
  if (task) {
    newTask = task.name;
  }

  const liEl = createTaskElement(newTask, task);
  ulEl.appendChild(liEl);
  inputEl.value = '';
  updateLocalStorage();
}

function createTaskElement(newTask, task) {
  const liEl = document.createElement('li');
  if (task && task.checked) {
    liEl.classList.add('checked');
  }
  liEl.innerText = sanitize(newTask);
  const checkBtnEl = document.createElement('div');
  checkBtnEl.innerHTML = '<i class="fas fa-check-square"></i>';
  liEl.appendChild(checkBtnEl);
  const trashBtnEl = document.createElement('div');
  trashBtnEl.innerHTML = '<i class="fas fa-trash"></i>';
  liEl.appendChild(trashBtnEl);

  checkBtnEl.addEventListener('click', () => {
    liEl.classList.toggle('checked');
    updateLocalStorage();
  });

  trashBtnEl.addEventListener('click', () => {
    liEl.remove();
    updateLocalStorage();
  });
  return liEl;
}

function updateLocalStorage() {
  const liEls = document.querySelectorAll('li');
  list = [];
  liEls.forEach((liEl) => {
    list.push({
      name: liEl.innerText,
      checked: liEl.classList.contains('checked'),
    });
  });
  localStorage.setItem('list', JSON.stringify(list));
}