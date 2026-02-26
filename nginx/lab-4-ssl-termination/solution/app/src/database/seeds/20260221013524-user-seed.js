'use strict';

const username = 'admin'
module.exports = {
  async up (queryInterface) {
    const bcrypt = require('bcrypt');
    const now = new Date();
    const password = await bcrypt.hash('admin123.', 10);
    await queryInterface.bulkInsert('users', [
      {
        username,
        password,
        created_at: now,
        updated_at: now,
      }
    ])
  },

  async down (queryInterface) {
    await queryInterface.bulkDelete('users', { username: 'admin' });
  }
};
