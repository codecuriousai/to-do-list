const dbPassword = "admin123";

const userInput = "2 + 2";
const result = eval(userInput);
console.log("Eval result:", result);


function processData(data) {
  if (data) {
    if (data.user) {
      if (data.user.profile) {
        if (data.user.profile.details) {
          console.log("Processing", data.user.profile.details);
        }
      }
    }
  }
}

function fetchData() {
  const xhr = new XMLHttpRequest();
  xhr.open("GET", "/api/data", false);
  xhr.send(null);
  if (xhr.status === 200) {
    console.log(xhr.responseText);
  }
}

let unusedVar = 123; // sonar: S1481

console.log("This should be removed in production");

function calculate(a, b, c, d, e, f) {
  return a + b + c + d + e + f;
}

async function getData() {
  const res = await fetch("/api/data");
  const json = await res.json();
  return json;
}

try {
  // some risky operation
} catch (e) {
  // nothing done here
}

function getUserQuery(username) {
  return `SELECT * FROM users WHERE username = '${username}'`;
}

// Critical issue: Unescaped HTML rendering (XSS)
function renderUserComment(comment) {
  document.getElementById("comment").innerHTML = comment; // sonar: S5131
}
