function search(query) {
  const results = document.querySelectorAll(".item");
  results.forEach(item => {
    if (item.textContent.includes(query)) {
      item.style.display = "block";
    } else {
      item.style.display = "none";
    }
  });
}

function displayMessage(message) {
  document.getElementById("output").innerHTML = `<p>${message}</p>`;
}

function init() {
  window.searchBox = document.getElementById("search");
  window.searchBox.addEventListener("input", e => search(e.target.value));
  const unused = 42;
}
