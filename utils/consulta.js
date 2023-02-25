const clc = require("cli-color");
const sqlite3 = require('sqlite3').verbose();
consulta = {
    basico: (cpf) => {
        return new Promise((resolve, reject) => {
            let db = new sqlite3.Database('db/br.db');
            //  console.log(db)
            let sql = `SELECT * FROM pessoas WHERE column1 = ? LIMIT 1`;
            db.get(sql, [cpf], (err, row) => {
                if (err) {
                    resolve({
                        'Status': 'apiError',
                        'Msg': err.message
                    })
                }
                if (row) {
                    return resolve({
                        'cpf': row.column1,
                        'nome': row.column2,
                        'sexo': row.column3,
                        'dataNascimento': row.column4
                    })
                } else {
                    return resolve({
                        'Status': 'error',
                        'Msg': 'CPF não encontrado na base',
                    })
                }

            });
            db.close();
        })
    },
    beneficio: (cpf, nome) => {
        return new Promise((resolve, reject) => {
            let db = new sqlite3.Database('db/db.db');
            //  console.log(db)
            let sql = `SELECT * FROM pessoas WHERE column6 = ? AND column7 = ? LIMIT 1`;
            db.get(sql, [cpf, nome], (err, row) => {
                if (err) {
                    resolve({
                        'Status': 'apiError',
                        'Msg': err.message
                    })
                }
                if (row) {
                    return resolve({
                        municipio: row.column4,
                        tipo: row.column11,
                        parcela: row.column12.substr(0, 1),
                        valor: row.column14,
                        obs: row.column13
                    })
                } else {
                    return resolve({
                        'Status': 'error',
                        'Msg': 'CPF não encontrado na base',
                    })
                }

            });
            db.close();
        })
    }
}

module.exports = { consulta }