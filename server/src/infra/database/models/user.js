'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({ Message, ChatRoom }) {
      // define association here
      this.hasMany(Message, { as: 'messages' }) // messages
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