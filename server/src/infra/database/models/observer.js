'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Observer extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({ ChatRoom }) {
      // define association here
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