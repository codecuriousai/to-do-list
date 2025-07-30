//queryUtils.js

/**
 * Database utility functions.
 * Avoid hardcoded secrets, inline SQL, and unsafe `eval`.
 */

const { Client } = require('pg');  // Example: using PostgreSQL client

/**
 * Fetches users by name using a parameterized query to prevent SQL injection.
 * @param {{ query: (sql: string, params: any[]) => Promise<{ rows: any[] }> }} dbClient
 * @param {string} userName - The name of the user to fetch.
 * @returns {Promise<any[]>} The resulting user rows.
 * @throws {Error} If query execution fails.
 */
async function fetchUsers(dbClient, userName) {
  if (typeof userName !== 'string' || !userName.trim()) {
    throw new Error('userName must be a non-empty string');
  }
  const sql = 'SELECT * FROM users WHERE name = $1';
  const params = [userName.trim()];
  try {
    const result = await dbClient.query(sql, params);
    return result.rows;
  } catch (err) {
    throw new Error(`fetchUsers query failed: ${err.message}`);
  }
}

/**
 * Safely evaluates JSON input strings.
 * Rejects non-JSON inputs to avoid arbitrary code execution.
 * @param {string} jsonString - The JSON string to parse.
 * @returns {any} The parsed object.
 * @throws {Error} If input is not valid JSON.
 */
function safeParse(jsonString) {
  if (typeof jsonString !== 'string') {
    throw new Error('Input must be a JSON string');
  }
  try {
    return JSON.parse(jsonString);
  } catch (err) {
    throw new Error(`safeParse failed: invalid JSON - ${err.message}`);
  }
}

module.exports = { fetchUsers, safeParse };
