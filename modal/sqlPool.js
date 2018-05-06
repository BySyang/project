const mysql = require('mysql');

module.exports = (function () {
    var pool = mysql.createPool({
        connectionLimit: 50,
        host: 'localhost',
        user: 'root',
        password: 'root',
        database: 'project'
    });
    return function (sql, arr, fn) {
        pool.getConnection(function (err, connection) {
            if (!err) {
                connection.query(sql, arr, function (err, data, fields) {
                    fn(err, data, fields);
                });
                connection.release();
            } else {
                console.log(err.message);
            }
        })
    }
})()