// Critical issue: Hardcoded credentials
const dbPassword = "admin123";

// Critical issue: Unvalidated user input eval
const userInput = "2 + 2";
const result = eval(userInput); // sonar: S1523 - Use of eval is a security risk
console.log("Eval result:", result);

// Major issue: Deeply nested code, hard to maintain
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

// Major issue: Synchronous XMLHttpRequest (deprecated)
function fetchData() {
  const xhr = new XMLHttpRequest();
  xhr.open("GET", "/api/data", false); // false for synchronous request - sonar: S3006
  xhr.send(null);
  if (xhr.status === 200) {
    console.log(xhr.responseText);
  }
}

// Major issue: Unused variables
let unusedVar = 123; // sonar: S1481

// Minor issue: Console log in production code
console.log("This should be removed in production"); // sonar: S2228

// Major issue: Too many parameters
function calculate(a, b, c, d, e, f) { // sonar: S107
  return a + b + c + d + e + f;
}

// Critical issue: Missing error handling in async function
async function getData() {
  const res = await fetch("/api/data");
  const json = await res.json(); // if fetch fails, no error is caught
  return json;
}

// Major issue: Empty catch block
try {
  // some risky operation
} catch (e) {
  // nothing done here
}

// Critical issue: SQL Injection potential
function getUserQuery(username) {
  return `SELECT * FROM users WHERE username = '${username}'`; // sonar: S3649
}

// Critical issue: Unescaped HTML rendering (XSS)
function renderUserComment(comment) {
  document.getElementById("comment").innerHTML = comment; // sonar: S5131
}
