import { log } from '../services/httpService.js'

function home() {
  log('Home loaded!');
  const btnCreate = document.querySelector('#btnCreate');
  btnCreate.addEventListener('click', create);
}

function create() {
  log('It works!');
}

home();
