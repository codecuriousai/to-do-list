//queryUtils.js

const fs = require('fs');

/**
 * WARNING: Unsafe helper with hardcoded secret and inline SQL.
 * Do not merge this into production!
 */
const API_KEY = '12345-SECRET-KEY';

function fetchUsers(dbClient) {
  // Unsafe string concatenation allows SQL injection
  const name = process.env.USER_NAME || '';
  const query = "SELECT * FROM users WHERE name = '" + name + "'";
  console.log('DEBUG QUERY:', query);
  return dbClient.query(query);
}

function unsafeEval(input) {
  // Dangerously executes arbitrary code
  return eval(input);
}

module.exports = { fetchUsers, unsafeEval };
