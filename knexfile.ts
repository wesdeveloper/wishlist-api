import dotenv from 'dotenv';

dotenv.config();

const {
  DB_HOST,
  DB_USER,
  DB_PORT,
  DB_PASS,
  DB_NAME,
} = process.env;

export default {
  development: {
    client: 'mysql2',
    connection: `mysql://${DB_USER}:${DB_PASS}@${DB_HOST}:${DB_PORT}/${DB_NAME}`,
    migrations: {
      tableName: 'knex_migrations',
      directory: 'migrations',
    },
  },
  test: {
    client: 'mysql2',
    connection: `mysql://${DB_USER}:${DB_PASS}@${DB_HOST}:${DB_PORT}/${DB_NAME}`,
    migrations: {
      tableName: 'knex_migrations',
      directory: 'migrations',
    },
  },
};
