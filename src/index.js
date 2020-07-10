// @ts-check

import 'core-js/stable';
import 'regenerator-runtime/runtime';

import faker from 'faker';
import Cookies from 'js-cookie';

import '../assets/application.scss';
// @ts-ignore
import gon from 'gon';
import startApp from './app.jsx';
import { buildInitialState } from './utils';

if (process.env.NODE_ENV !== 'production') {
  localStorage.debug = 'chat:*';
}

const chatRoot = document.getElementById('chat');
const initialState = buildInitialState(gon);

if (!Cookies.get('chatUsername')) {
  Cookies.set('chatUsername', faker.name.findName());
}
const username = Cookies.get('chatUsername');

startApp({
  rootElement: chatRoot,
  initialState,
  username,
});
