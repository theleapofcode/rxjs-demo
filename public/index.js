/* eslint-disable no-unused-vars */

import './index.css';

import Rx from 'rx';

// Observable from DOM event
Rx.Observable.fromEvent(document, 'click')
  .filter(c => c.clientX > window.innerWidth / 2)
  .take(5)
  .subscribe(c => console.log(c.clientX, c.clientY));

// Ajax call
const getUsersButton = document.getElementById('getusers');
Rx.Observable.fromEvent(getUsersButton, 'click')
  .subscribe(e => Rx.DOM.get('/users')
    .subscribe(data => console.log(data.response)));
