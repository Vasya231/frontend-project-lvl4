// @ts-check

import 'core-js/stable';
import 'regenerator-runtime/runtime';

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

startApp({
  rootElement: chatRoot,
  initialState,
});
