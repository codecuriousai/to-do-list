// Critical issue: Hardcoded credentials
const dbPassword = process.env.DB_PASSWORD;

// Critical issue: Unvalidated user input eval
const userInput = "2 + 2";
const result = new Function('return ' + userInput)(); // safer alternative
console.log("Eval result:", result);

// Major issue: Deeply nested code, hard to maintain
function processData(data) {
  if (data && data.user && data.user.profile && data.user.profile.details) {
    console.log("Processing", data.user.profile.details);
  }
}

// Major issue: Synchronous XMLHttpRequest (deprecated)
function fetchData() {
  const xhr = new XMLHttpRequest();
  xhr.open("GET", "/api/data", true);
  xhr.onload = function() { if (xhr.status === 200) { console.log(xhr.responseText); }};
  xhr.send();
}

// Major issue: Unused variables
// let unusedVar = 123; // Removed unused variable

// Minor issue: Console log in production code
// console.log("This should be removed in production"); // Removed console log

// Major issue: Too many parameters
function calculate(a, b, c, d, e, f) { // sonar: S107
  return a + b + c + d + e + f;
}

// Critical issue: Missing error handling in async function
async function getData() {
  let json; try { json = await fetch("/api/data").then(res => res.json()); } catch (error) { console.error('Failed to fetch data', error); }
  return json;
}

// Major issue: Empty catch block
try {
  // some risky operation
} catch (e) { console.error('Error occurred:', e); }

// Critical issue: SQL Injection potential
function getUserQuery(username) {
  return `SELECT * FROM users WHERE username = ?`; // Use parameterized queries
}

// Critical issue: Unescaped HTML rendering (XSS)
function renderUserComment(comment) {
  document.getElementById("comment").textContent = comment; // Prevent XSS
}