'use strict';

//Password: test for JWT_SECRET="123"
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('users', [{
      userName: 'John Doe',
      email: 'johndoe@test.com',
      birthDate: new Date(),
      password: "$2a$06$YXNcg32yY7bigC103jDGSeAmtag4cCrhSbN75WH5rVX9jYvLL1AyS",
      createdAt: new Date(),
      updatedAt: new Date()
    }]);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('users', null, {});
  }
};
