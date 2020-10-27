require('dotenv').config();

const { env } = process;
const development = {
  username: env.MYSQL_USERNAME,
  password: env.MYSQL_PASSWORD,
  database: env.MYSQL_DATABASE,
  host: env.MYSQL_HOST,
  dialect: env.MYSQL_DIALECT,
  port: env.MYSQL_PORT,
  define: {
    freezeTableName: true,
    timestamps: false,
  },
};

const production = {
  username: env.MYSQL_USERNAME,
  password: env.MYSQL_PASSWORD,
  database: env.MYSQL_DATABASE,
  host: env.MYSQL_HOST,
  dialect: env.MYSQL_DIALECT,
  port: env.MYSQL_PORT,
};

const test = {
  username: env.MYSQL_USERNAME,
  password: env.MYSQL_PASSWORD,
  database: env.MYSQL_DATABASE_TEST,
  host: env.MYSQL_HOST,
  dialect: env.MYSQL_DIALECT,
  port: env.MYSQL_PORT,
};

export default { development, production, test };
