import mysql from 'mysql2/promise';
import dotenv from 'dotenv';

dotenv.config();

const dbConfig = {
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
};

const pool = mysql.createPool(dbConfig);

(async () => {
    try {
        const connection = await pool.getConnection();
        console.log('Conexao com o banco de dados efetuada com sucesso!!!');
        console.log('[dbConnection] host:', dbConfig.host, 'dbname: ', dbConfig.database);
        connection.release();
    } catch (error) {
        console.error('Conexão com o banco de dados gerou um erro.');
        if (error.code === 'ECONNREFUSED') {
            console.error('O serviço Mysql não está rodando no localhost');
        } else if (error.code === 'ER_ACCESS_DENIED_ERROR') {
            console.error('Usuário ou senha incorretos.');
        } else {
            console.error('Erro não identificado ', error);
        }
    }
})();

export default pool;
