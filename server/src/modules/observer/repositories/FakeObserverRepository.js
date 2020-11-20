class FakeObserverRepository {

  constructor(){
    this.observers = [];
  }
  async create({
    observerName
  }) {
    const index = this.observers.length;
    const date = new Date();
    const observer = {
      id: index,
      observerName,
      createdAt: date,
      updatedAt: date
    }

    this.observers.push(observer);
    return observer;
  }

  async findByName(name) {
    const observer = this.observers.find(observer => observer.observerName===name);
    return observer;
  }
  
  async findAll() {
    return this.observers;
  }

  async findAllLess(observerName) {
    const observers = this.observers.filter(observer => observer.observerName!==observerName);
    return observers;
  }
}

module.exports = FakeObserverRepository