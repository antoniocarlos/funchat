const { Observer } = require('../../../infra/database/models');

class ObserverRepository {
  constructor() {

  }

  async create(
    observerName
  ) {
    const observer = await Observer.create({
      observerName
    });
    return this.convertObserver(observer);
  }

  async findByName(observerName) {
    const observer = await Observer.findOne({ where: { observerName } });
    console.log(`inter ${observer}`)
    return observer ? this.convertObserver(observer):null;
    
  }
  

  async findAll() {
    const observers = await Observer.findAll();
    const JSONObservers = observers.map(observer => this.convertObserver(observer));
    return JSONObservers;
  }

  async findAllLess(observerName) {
    const observers = await Observer.findAll({
      where: { observerName: { [Op.ne]: observer.observerName } },
    });
    const JSONObservers = observers.map(observer => this.convertObserver(observer));
    return JSONObservers;
  }

  async updateChatRoom(observerName, chatRoomId) {

    await Observer.update(
      {
        chatRoomId
      },
      {
        where:
        {
          observerName
        }
      })

  }

  async delete(observerName) {

    await Observer.destroy(
      {
        where:
        {
          observerName
        }
      });

  }

  convertObserver(observer) {
    const convertedObserver = {
      ...observer.toJSON(),
      createdAt: observer.createdAt.toISOString(),
      updatedAt: observer.updatedAt.toISOString()
    }

    return convertedObserver;
  }

}

module.exports = ObserverRepository