import mysql = require('mysql');

export default class Mysql {
    private static _instance: Mysql;
    cnn: mysql.Connection;
    conectado: boolean = false;
    constructor() {
        console.log('Clase inicializada');
        this.cnn = mysql.createConnection({
            host: 'localhost',
            user: 'node',
            password: '0108',
            database: 'nodeDB'
        });
        this.conectarDB();
    }

    public static get instance() {
        return this._instance || (this._instance = new this());
    }

    static ejecutarQuery(query: string, callback: Function) {
        this.instance.cnn.query(query, (err, results: Object[], fields) => {
            if (err) {
                console.log('error en query');
                console.log(err);
                return callback(err);
            }
            if (results.length === 0) {
                callback('El registro solicitado no existe');
            }
            callback(null,results);
         });
    }

    private conectarDB() {
        this.cnn.connect((err: mysql.MysqlError) => {
            if (err) {
                console.log(err.message);
                return;
            } else {
                this.conectado = true;
                console.log('Base de datos en linea ')
            }
        });
    }
}



