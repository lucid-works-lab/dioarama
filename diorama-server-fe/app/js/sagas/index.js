import { fork } from 'redux-saga/effects';
import mockSagas from './mock-sagas';
import requestSagas from './request-sagas';

export default function* root() {
    yield fork(mockSagas);
    yield fork(requestSagas);
}