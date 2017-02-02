import './index.css';

import Rx from 'rx';
import 'rx-dom';

// Observable from DOM event
Rx.Observable.fromEvent(document, 'click')
  .filter(c => c.clientX > window.innerWidth / 2)
  .take(5)
  .subscribe(c => console.log(c.clientX, c.clientY));

// Ajax call
const getUsersButton = document.getElementById('getusers');
Rx.Observable.fromEvent(getUsersButton, 'click')
  .subscribe(() => Rx.DOM.get('/users')
    .subscribe(data => console.log(data.response)));

// Ajax call cache using AsyncSubject
const getUsersCacheButton = document.getElementById('getuserscache');

function getUsers(url) {
  let subject;

  return Rx.Observable.create(observer => {
    if (!subject) {
      subject = new Rx.AsyncSubject();
      Rx.DOM.get(url).subscribe(subject);
    }

    return subject.subscribe(observer);
  });
}

const users = getUsers('/users');

Rx.Observable.fromEvent(getUsersCacheButton, 'click')
  .subscribe(() => users.subscribe(
    data => console.log(data.response),
    err => console.log(err.message),
    () => console.log('Done...')
  ));
