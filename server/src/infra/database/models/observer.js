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
  class Observer extends Model {
    static associate({ ChatRoom }) {
      this.belongsTo(ChatRoom, { foreignKey: 'chatRoomId' })
    }
  };
  Observer.init({
    observerName: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    },
    chatRoomId : {
      type: DataTypes.STRING,
      allowNull: true,
    }
  }, {
    sequelize,
    modelName: 'Observer',
    tableName: 'observers'
  });
  return Observer;
};
