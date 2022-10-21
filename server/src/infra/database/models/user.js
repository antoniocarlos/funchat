/* eslint-disable prettier/prettier */
/* eslint-disable import/newline-after-import */
/* eslint-disable no-path-concat */
/* eslint-disable prefer-template */
/* eslint-disable no-unused-vars */
/* eslint-disable lines-around-directive */
/* eslint-disable strict */
'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    static associate({ Message, ChatRoom }) {
      this.hasMany(Message, { as: 'messages' })
      this.belongsTo(ChatRoom, { foreignKey: 'chatRoomId' })
    }
  };
  User.init({
    userName: {
      type: DataTypes.STRING(20),
      allowNull: false,
      unique: true
    },
    email: {
      type: DataTypes.STRING(100),
      allowNull: false,
      unique: true
    },
    birthDate: {
      type: DataTypes.DATE,
      allowNull: false
    },
    password: {
      type: DataTypes.STRING(20),
      allowNull: false,
    },
    imageUrl : {
      type: DataTypes.STRING,
      allowNull: true,
    },
    chatRoomId : {
      type: DataTypes.STRING,
      allowNull: true,
    }
  }, {
    sequelize,
    modelName: 'User',
    tableName: 'users',
  });
  return User;
};
