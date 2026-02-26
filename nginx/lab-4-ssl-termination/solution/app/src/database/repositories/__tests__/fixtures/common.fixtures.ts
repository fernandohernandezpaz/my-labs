export const repositoryTestConfig = {
  database: process.env.DB_TEST_NAME ?? 'products_test_db',
  dialect: 'postgres' as const,
  host: process.env.DB_TEST_HOST ?? 'localhost',
  logging: false,
  password: process.env.DB_TEST_PASSWORD ?? 'postgres',
  port: Number(process.env.DB_TEST_PORT ?? 5432),
  username: process.env.DB_TEST_USER ?? 'postgres',
};
