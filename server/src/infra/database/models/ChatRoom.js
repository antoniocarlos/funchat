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
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({ User, Observer, Message }) {
      // define association here
      this.hasMany(User, { as: 'users' }) // users
      this.hasMany(Observer, { as: 'observers' }) // observers
      this.hasMany(Message, { as: 'messages' }) // messages
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
