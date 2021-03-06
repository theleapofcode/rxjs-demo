# rxjs-demo
Demo of RxJS in browser and node.

## Browser demo
Run the browser demo `npm run browserdemo -s`.

* Click on right side of window to print co-ordinates in console.
* Click on 'Get Data' button to make ajax call to backend and print JSON data in console.
* Click on 'Get Data (cache)' button to make ajax call only once to server and cache the response. JSON response is printed in console. Subsequent clicks gets the data from cache and not from server. Check the network tab in dev console to verify.

## Node demo
Run the node demo `npm run nodedemo -s <option>`

**options:**
  1. Observable from Array
  2. Observable from Callback
  3. Observable from promise
  4. Merge two observables from interval
  5. Map transformation
  6. Filter transformation
  7. Reduce transformation
  8. Average using map and reduce
  9. Scan operator to compute running average
  10. Flatmap transformation
  11. Unsubscribe
  12. Handling error - fail
  13. Handling error - complete
  14. Subject as a proxy
  15. Replay subject
