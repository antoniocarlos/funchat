const ObserverRepository = require('./repositories/ObserverRepository');
const ListObserversService = require('./services/ListObserversService');
const ObserverLoginService = require('./services/ObserverLoginService');
const ObserverLogoffService = require('./services/ObserverLogoffService');

const observerRepository = new ObserverRepository();
const listObserversService = new ListObserversService(observerRepository);
const observerLoginService = new ObserverLoginService(observerRepository);
const observerLogoffService = new ObserverLogoffService(observerRepository);

module.exports = {
  getObservers: async () => {
    return listObserversService.listAll();
  },
  observerLogin: async (_, args) => {
    const{observerName} = args;
    const observer = observerLoginService.login(observerName);
    return observer;
  },
  observerLogoff: async (_, args) => {
    const{observerName} = args;
    const observer = observerLogoffService.logoff(observerName);
    return observer;
  }
}
