import mysql from 'mysql2/promise';
import dotenv from 'dotenv';

dotenv.config();

const dbConfig = {
    host: process.env.DB_HOST,
    port: Number(process.env.DB_PORT), // IMPORTANTE
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,

    // Railway normalmente funciona sem SSL explícito,
    // mas pode ser mantido:
    ssl: {
        rejectUnauthorized: false
    },

    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
};

// Debug temporário
console.log('[DB CONFIG]', {
    host: dbConfig.host,
    port: dbConfig.port,
    user: dbConfig.user,
    database: dbConfig.database
});

const pool = mysql.createPool(dbConfig);

// Teste inicial da conexão
(async () => {
    try {
        const connection = await pool.getConnection();

        console.log('✅ Conexão com o banco efetuada com sucesso!');
        console.log('[dbConnection] host:', dbConfig.host);
        console.log('[dbConnection] port:', dbConfig.port);
        console.log('[dbConnection] database:', dbConfig.database);

        connection.release();
    } catch (error) {
        console.error('❌ Erro ao conectar no banco');

        if (error.code === 'ECONNREFUSED') {
            console.error('Conexão recusada.');
        } else if (error.code === 'ER_ACCESS_DENIED_ERROR') {
            console.error('Usuário ou senha incorretos.');
        } else {
            console.error(error);
        }
    }
})();

// Verifica conectividade ao banco
export async function isConnected() {
    try {
        await pool.query('SELECT 1');
        return true;
    } catch {
        return false;
    }
}

// Monitoramento
let lastHealthy = true;

(async function monitor() {
    while (true) {
        try {
            const ok = await isConnected();

            if (ok !== lastHealthy) {
                console.log('[db.monitor] healthy:', ok);
                lastHealthy = ok;
            }

            await new Promise(r => setTimeout(r, ok ? 30000 : 5000));

        } catch (err) {
            console.error('[db.monitor]', err.message);
            await new Promise(r => setTimeout(r, 5000));
        }
    }
})();

export default pool;