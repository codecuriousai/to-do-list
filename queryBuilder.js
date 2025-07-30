//queryBuilder.js

class QueryBuilder {
  /**
   * Creates a new QueryBuilder for the specified table.
   * @param {string} table - The name of the database table.
   * @throws {Error} If table is not a non-empty string.
   */
  constructor(table) {
    if (typeof table !== 'string' || !table) {
      throw new Error('Table name must be a non-empty string');
    }
    this.table = table;
    this._conditions = [];
    this._params = [];
  }

  /**
   * Adds a WHERE clause condition.
   * @param {string} column - The column name.
   * @param {string} operator - One of =, <, >, <=, >=, !=.
   * @param {*} value - The value to match.
   * @returns {QueryBuilder} The current instance for chaining.
   * @throws {Error} If operator or column is invalid.
   */
  where(column, operator, value) {
    const validOps = ['=', '<', '>', '<=', '>=', '!='];
    if (!validOps.includes(operator)) {
      throw new Error(`Unsupported operator: ${operator}`);
    }
    if (typeof column !== 'string' || !column) {
      throw new Error('Column name must be a non-empty string');
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
   */
  async execute(dbClient) {
    const { sql, params } = this.build();
    const result = await dbClient.query(sql, params);
    return result.rows;
  }
}

module.exports = QueryBuilder;
