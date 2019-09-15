var mysql = require('mysql');

let conn = null;

class SqlProvider {
  static async getConnection() {
    const config = {
        host: "remotemysql.com",
        port: "3306",
        user: "UfefPd1mk5",
        password: "KfR4ufcbt5",
        database: 'UfefPd1mk5'
    };
    if (conn) {
      return conn
    }

    conn = await mysql.createConnection(config);

    return conn;
  }
}

module.exports = SqlProvider;