// Critical issue: Hardcoded credentials
const dbPassword = process.env.DB_PASSWORD;
// Critical issue: Unvalidated user input eval
const userInput = "2 + 2";
const result = Function(`'use strict'; return (${userInput})`)();
console.log("Eval result:", result);
// Major issue: Deeply nested code, hard to maintain
function processData(data) {
  if (data?.user?.profile?.details) {
    console.log("Processing", data.user.profile.details);
  }
}
// Major issue: Synchronous XMLHttpRequest (deprecated)
async function fetchData() {
  const response = await fetch("/api/data");
  const data = await response.json();
  console.log(data);
}
// Major issue: Unused variables
// Removed unused variable
// Minor issue: Console log in production code
// console.log("This should be removed in production"); // Commented out for production
// Major issue: Too many parameters
function calculate(...args) {
  return args.reduce((sum, current) => sum + current, 0); // Use rest parameters and reduce
}
// Critical issue: Missing error handling in async function
async function getData() {
  try {
    const res = await fetch("/api/data");
    if (!res.ok) throw new Error('Network response was not ok');
    const json = await res.json();
    return json;
  } catch (error) {
    console.error('Fetch error:', error);
  }
}
// Major issue: Empty catch block
try {
  // some risky operation
} catch (e) {
  // nothing done here
}
// Critical issue: SQL Injection potential
function getUserQuery(username) {
  return `SELECT * FROM users WHERE username = ?`; // Use parameterized queries
}
// Critical issue: Unescaped HTML rendering (XSS)
function renderUserComment(comment) {
  document.getElementById("comment").textContent = comment; // Use textContent to prevent XSS
}