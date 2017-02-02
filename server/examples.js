import Rx from 'rx';
import fs from 'fs';
import Promise from 'promise';

const num = process.argv[2];

switch (num) {
  case '1': {
    console.log('Observable from Array :');
    Rx.Observable.from(['Tony', 'Steve', 'Bruce']).subscribe(
      x => console.log(x),
      err => console.log(err),
      () => console.log('Done...')
    );
    break;
  }

  case '2': {
    console.log('Observable from Callback :');
    const readFileObservable = Rx.Observable.fromNodeCallback(fs.readFile);
    const fileContentObservable = readFileObservable(__dirname + '/../README.md', 'utf8');
    fileContentObservable.subscribe(
      fileContent => console.log(fileContent),
      err => console.log(err),
      () => console.log('Done...')
    );
    break;
  }

  case '3': {
    console.log('Observable from Promise :');
    const promise = new Promise((resolve, reject) => { // eslint-disable-line no-unused-vars
      resolve('resolved...');
    });
    const promiseObservable = Rx.Observable.fromPromise(promise);
    promiseObservable.subscribe(
      x => console.log(x),
      err => console.log(err),
      () => console.log('Done...')
    );
    break;
  }

  case '4': {
    console.log('Merge two observables from interval :');
    const obs1 = Rx.Observable.interval(500).map(i => 'A' + i).take(5);
    const obs2 = Rx.Observable.interval(1000).map(i => 'B' + i).take(5);
    Rx.Observable.merge(obs1, obs2).subscribe(
      x => console.log(x),
      err => console.log(err),
      () => console.log('Done...')
    );
    break;
  }

  case '5': {
    console.log('Map transformation :');
    Rx.Observable.range(1, 5).map(x => x * x).subscribe(
      x => console.log(x),
      err => console.log(err),
      () => console.log('Done...')
    );
    break;
  }

  case '6': {
    console.log('Filter transformation :');
    Rx.Observable.range(1, 5).filter(x => x > 3).subscribe(
      x => console.log(x),
      err => console.log(err),
      () => console.log('Done...')
    );
    break;
  }

  case '7': {
    console.log('Reduce transformation :');
    Rx.Observable.range(1, 5).reduce((x, y) => x + y).subscribe(
      x => console.log(x),
      err => console.log(err),
      () => console.log('Done...')
    );
    break;
  }

  case '8': {
    console.log('Average using map and reduce :');
    Rx.Observable.range(1, 5).reduce((prev, curr) => {
      return {
        sum: prev.sum + curr,
        count: prev.count + 1
      };
    }, {
        sum: 0,
        count: 0
      }).map(x => x.sum / x.count).subscribe(
      x => console.log(x),
      err => console.log(err),
      () => console.log('Done...')
      );
    break;
  }

  case '9': {
    console.log('Running average using scan :');
    Rx.Observable.range(1, 5).scan((prev, curr) => {
      return {
        sum: prev.sum + curr,
        count: prev.count + 1
      };
    }, {
        sum: 0,
        count: 0
      }).map(x => x.sum / x.count).subscribe(
      x => console.log(x),
      err => console.log(err),
      () => console.log('Done...')
      );
    break;
  }

  case '10': {
    console.log('Flatmap transformation :');

    Rx.Observable.range(1, 5).flatMap(x => Rx.Observable.range(0, x)).subscribe(
      x => console.log(x),
      err => console.log(err),
      () => console.log('Done...')
    );
    break;
  }

  case '11': {
    console.log('Unsubscribe :');

    const obsble = Rx.Observable.interval(1000);
    const subscription = obsble.subscribe(
      x => console.log(x),
      err => console.log(err),
      () => console.log('Done...')
    );

    setTimeout(() => subscription.dispose(), 5000);
    break;
  }

  case '12': {
    console.log('Handling error - fail :');

    Rx.Observable.from(['{"key1": "val1"}', '{"key2": "val2}', '{"key3": "val3"}'])
      .map(str => JSON.parse(str))
      .subscribe(
      x => console.log(x),
      err => console.log(err.message),
      () => console.log('Done...')
      );

    break;
  }

  case '13': {
    console.log('Handling error - complete :');

    Rx.Observable.from(['{"key1": "val1"}', '{"key2": "val2}', '{"key3": "val3"}'])
      .map(str => JSON.parse(str))
      .catch(err => Rx.Observable.return({
        'error': err.message
      }))
      .subscribe(
      x => console.log(x),
      err => console.log(err.message),
      () => console.log('Done...')
      );

    break;
  }

  case '14': {
    console.log('Subject as a proxy :');

    const subject = new Rx.Subject();

    const source = Rx.Observable.interval(300)
      .map(i => 'From source -  ' + i)
      .take(5);

    source.subscribe(subject);

    subject.subscribe(
      x => console.log(x),
      err => console.log(err.message),
      () => console.log('Done...')
    );

    subject.onNext('From Subject - 1');
    subject.onNext('From Subject - 2');
    setTimeout(function () {
      subject.onCompleted();
    }, 1000);

    break;
  }

  case '15': {
    console.log('ReplaySubject to cache and re-emit values:');

    const replaySub = new Rx.ReplaySubject(); // This can also take buffer size and buffer time for caching

    replaySub.onNext(1);
    replaySub.onNext(2);

    replaySub.subscribe(
      x => console.log(x),
      err => console.log(err),
      () => console.log('Done...')
    );

    replaySub.onNext(3);
    replaySub.onNext(4);

    break;
  }

  default:
    break;
}

