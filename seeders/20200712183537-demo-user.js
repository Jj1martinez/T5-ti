'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('users', [{
      first_name: 'Admin',
      last_name: 'Test',
      email: 'admin@test.com',
      password :'123321',
      role: 0,
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      first_name: 'User',
      last_name: 'Test',
      email: 'user@test.com',
      password :'123321',
      role: 1,
      createdAt: new Date(),
      updatedAt: new Date()
    }
  ]);
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('users', null, {});
  }
};

