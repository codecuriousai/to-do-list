//queryBuilder.js

// Module-level constants
const VALID_OPERATORS = ['=', '<', '>', '<=', '>=', '!='];

/**
 * Validates that a name is a non-empty string.
 * @param {string} name - The name to validate.
 * @param {string} label - Label for error messages (e.g., 'Table', 'Column').
 * @throws {Error} If name is not a non-empty string.
 */
function validateName(name, label) {
  if (typeof name !== 'string' || !name.trim()) {
    throw new Error(`${label} name must be a non-empty string`);
  }
}

/**
 * Validates operator against whitelist.
 * @param {string} operator - The operator to validate.
 * @throws {Error} If operator is not in VALID_OPERATORS.
 */
function validateOperator(operator) {
  if (!VALID_OPERATORS.includes(operator)) {
    throw new Error(`Unsupported operator: ${operator}`);
  }
}

class QueryBuilder {
  /**
   * Creates a new QueryBuilder for the specified table.
   * @param {string} table - The name of the database table.
   */
  constructor(table) {
    validateName(table, 'Table');
    this.table = table.trim();
    this._conditions = [];
    this._params = [];
  }

  /**
   * Adds a WHERE clause condition.
   * @param {string} column - The column name.
   * @param {string} operator - One of VALID_OPERATORS.
   * @param {*} value - The value to match (primitive types only).
   * @returns {QueryBuilder} The current instance for chaining.
   */
  where(column, operator, value) {
    validateName(column, 'Column');
    validateOperator(operator);

    // Allow only primitive types for safety
    const valueType = typeof value;
    if (!['string', 'number', 'boolean'].includes(valueType) && value !== null) {
      throw new Error(`Unsupported value type: ${valueType}`);
    }

    this._conditions.push(`${column} ${operator} ?`);
    this._params.push(value);
    return this;
  }

  /**
   * Builds the SQL query string and parameters.
   * @returns {{ sql: string, params: any[] }}
   */
  build() {
    const whereClause = this._conditions.length
      ? ' WHERE ' + this._conditions.join(' AND ')
      : '';
    const sql = `SELECT * FROM ${this.table}${whereClause};`;
    return { sql, params: this._params };
  }

  /**
   * Executes the query against a database client.
   * @param {{ query: (sql: string, params: any[]) => Promise<{ rows: any[] }> }} dbClient
   * @returns {Promise<any[]>} The resulting rows.
   * @throws {Error} If execution fails, with context.
   */
  async execute(dbClient) {
    const { sql, params } = this.build();
    try {
      const result = await dbClient.query(sql, params);
      return result.rows;
    } catch (err) {
      // Provide context for debugging
      throw new Error(`Query failed on table "${this.table}": ${err.message}`);
    }
  }
}

module.exports = QueryBuilder;
