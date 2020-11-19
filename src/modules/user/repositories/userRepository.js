const { User } = require('../../../infra/database/models');


async function create({
  username,
  email,
  password
}) {
  return await User.create({
    username,
    email,
    password
  })
}

async function findOne(args) {
  return await User.findOne(args);
}

async function findAll() {
  return await User.findAll();
}

module.exports = { create, findOne, findAll }