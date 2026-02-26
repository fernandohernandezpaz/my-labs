const fs = require('node:fs');
const path = require('node:path');

const loadEnvFile = () => {
  const envFilePath = path.resolve(process.cwd(), '.env');
  if (!fs.existsSync(envFilePath)) {
    return;
  }

  const fileContent = fs.readFileSync(envFilePath, 'utf8');
  const lines = fileContent.split(/\r?\n/);

  for (const line of lines) {
    const trimmedLine = line.trim();
    if (!trimmedLine || trimmedLine.startsWith('#')) {
      continue;
    }

    const separatorIndex = trimmedLine.indexOf('=');
    if (separatorIndex < 0) {
      continue;
    }

    const key = trimmedLine.slice(0, separatorIndex).trim();
    const value = trimmedLine.slice(separatorIndex + 1).trim();
    if (!process.env[key]) {
      process.env[key] = value.replace(/^['"]|['"]$/g, '');
    }
  }
};

loadEnvFile();

const buildConfig = ({ database, host, password, port, username }) => ({
  database,
  dialect: 'postgres',
  host,
  migrationStorage: 'sequelize',
  password,
  port: parseInt(port, 10),
  seederStorage: 'sequelize',
  username,
});

module.exports = {
  development: buildConfig({
    database: process.env.DB_NAME || 'products_db',
    host: process.env.DB_HOST || 'localhost',
    password: process.env.DB_PASSWORD || 'postgres',
    port: process.env.DB_PORT || '5432',
    username: process.env.DB_USER || 'postgres',
  }),
  production: buildConfig({
    database: process.env.DB_NAME || 'products_db',
    host: process.env.DB_HOST || 'localhost',
    password: process.env.DB_PASSWORD || 'postgres',
    port: process.env.DB_PORT || '5432',
    username: process.env.DB_USER || 'postgres',
  }),
  test: buildConfig({
    database: process.env.DB_TEST_NAME || 'products_test_db',
    host: process.env.DB_TEST_HOST || process.env.DB_HOST || 'localhost',
    password: process.env.DB_TEST_PASSWORD || process.env.DB_PASSWORD || 'postgres',
    port: process.env.DB_TEST_PORT || process.env.DB_PORT || '5432',
    username: process.env.DB_TEST_USER || process.env.DB_USER || 'postgres',
  }),
};
