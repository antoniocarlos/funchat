import ObserverRepository from './repositories/ObserverRepository';
import ListObserversService from './services/ListObserversService';
import ObserverLoginService from './services/ObserverLoginService';
import ObserverLogoffService from './services/ObserverLogoffService';

const observerRepository = new ObserverRepository();
const listObserversService = new ListObserversService(observerRepository);
const observerLoginService = new ObserverLoginService(observerRepository);
const observerLogoffService = new ObserverLogoffService(observerRepository);

async function getObservers() {
  const observers = await listObserversService.listAll();
  return observers;
}

async function observerLogin(_, args) {
  const { observerName } = args;
  const observer = await observerLoginService.login(observerName);
  return observer;
}

async function observerLogoff(_, args) {
  const { observerName } = args;
  const observer = await observerLogoffService.logoff(observerName);
  return observer;
}

export default { getObservers, observerLogin, observerLogoff };
