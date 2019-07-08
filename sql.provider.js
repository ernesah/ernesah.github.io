var mysql = require('mysql');

let conn = null;

class SqlProvider {
  static async getConnection() {
    const config = {
        host: "remotemysql.com",
        port: "3306",
        user: "DBrUnDLuiy",
        password: "7pANwtE49K",
        database: 'DBrUnDLuiy'
    };
    if (conn) {
      return conn
    }

    conn = await mysql.createConnection(config);

    return conn;
  }
}

module.exports = SqlProvider;