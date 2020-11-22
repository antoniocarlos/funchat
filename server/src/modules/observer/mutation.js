const ObserverRepository = require('./repositories/ObserverRepository');
const ObserverLoginService = require('./services/ObserverLoginService');


const observerRepository = new ObserverRepository();
const observerLoginService = new ObserverLoginService(observerRepository);


module.exports = {
  register: async (_, args) => {
    const{observerName} = args;
    const observer = await observerLoginService.login(observerName);
    return observer;
  }
}