// @ts-check

import 'core-js/stable';
import 'regenerator-runtime/runtime';

import faker from 'faker';

import '../assets/application.scss';
// @ts-ignore
import gon from 'gon';
import startApp from './app.jsx';
import { buildInitialState } from './utils';

// import faker from 'faker';

// import cookies from 'js-cookie';
// import io from 'socket.io-client';

if (process.env.NODE_ENV !== 'production') {
  localStorage.debug = 'chat:*';
}


console.log('it works!');
console.log('gon', gon);

const chatRoot = document.getElementById('chat');
const initialState = buildInitialState(gon);
const username = faker.name.findName();
startApp({
  rootElement: chatRoot,
  initialState,
  username,
});
