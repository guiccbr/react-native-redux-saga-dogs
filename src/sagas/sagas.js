import { takeLatest, call, put } from 'redux-saga/effects';
import axios from 'axios';

// Watcher Saga: watches for actions dispatched to the store, starting worker
// saga. TakeLatest listens for API_CALL_REQUEST and launches workerSaga when
// that happens.
export function* watcherSaga() {
  yield takeLatest('API_CALL_REQUEST', workerSaga);
  // TakeLatest is a helper function provided by redux-saga that will trigger a
  // workerSaga, every time that it sees an API_CALL_REQUEST, cancelling any
  // other workerSaga that may be still in execution. This is GREAT!
}

// INFO: The function* syntax is new for ES6, and creates a generator.
// Generators can pause and restart - be exited and re-entered (as a thread?) -
// and actually remember the context/state of the function over time.
//
// Each yield in a generator basically represents an asynchronous step in a
// more synchronous/sequential process.

// Function that fetches a dog
function fetchDog() {
  return axios({
    method: 'get',
    url: 'https://dog.ceo/api/breeds/image/random',
  });
}

// Worker Saga: makes the API call when the watcher saga sees the action
function* workerSaga() {
  try {
    // call is another redux-saga helper, that will start a new generator
    // function fetchDog. This is necessary for saga to detect changes and/or
    // cancel (through takelatest) - makes a lot of sense. It returns a promise
    // (because fetchDog returns a promise indeed).
    const response = yield call(fetchDog);
    const dog = { uri: response.data.message };

    // dispatch a success action to the store with the new dog:
    // put is another redux-saga helper, that will dispatch an ACTION to Redux
    // (and will monitor for these actions if a takeLatest is used anywhere
    // else in the code.
    yield put({ type: 'API_CALL_SUCCESS', dog });
  } catch (error) {
    yield put({ type: 'API_CALL_FAILURE', error });
  }
}
