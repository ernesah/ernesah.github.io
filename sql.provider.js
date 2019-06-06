var mysql = require('mysql');

let conn = null;

class SqlProvider {
  static async getConnection() {
    const config = {
        host: "localhost",
        port: "3307",
        user: "root",
        password: "",
        database: 'e-commerce'
    };
    if (conn) {
      return conn
    }

    conn = await mysql.createConnection(config);

    return conn;
  }
}

module.exports = SqlProvider;