import './index.css';

import Rx from 'rxjs/Rx';

Rx.Observable.fromEvent(document, 'click').filter(c => c.clientX > window.innerWidth / 2).take(5).subscribe(c => console.log(c.clientX, c.clientY));

const getUsersButton = document.getElementById('getusers');

Rx.Observable.fromEvent(getUsersButton, 'click').subscribe(Rx.DOM.get('/users').subscribe(data => console.log(data.response)));
