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
  class ChatRoom extends Model {

    static associate({ User, Observer, Message }) {
      this.hasMany(User, { as: 'users' })
      this.hasMany(Observer, { as: 'observers' })
      this.hasMany(Message, { as: 'messages' })
    }
  };
  ChatRoom.init({
    name: {
      type: DataTypes.STRING,
      allowNull: false
    }
  }, {
    sequelize,
    modelName: 'ChatRoom',
    tableName: 'chatRooms',
  });
  return ChatRoom;
};
