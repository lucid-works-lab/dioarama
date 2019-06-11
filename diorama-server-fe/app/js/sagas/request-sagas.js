import {take, put, call, fork, select} from 'redux-saga/effects'
import * as actions from '../actions'
import * as api from '../services/api'

function* fetchMockRequestList (indexTo, size) {
    try {
        const result = yield call(api.fetchMockRequestList, indexTo, size)
        // TODO check result
        yield put(actions.fetchMockRequestList.success(result.response))
    } catch (e) {
        console.log(e);
        yield put(actions.fetchMockRequestList.failure(e))
    }
}

function* watchFetchMockRequestList () {
    while (true) {
        const {indexTo, size} = yield take(actions.ActionType.FetchMockRequestList.REQUEST)
        yield fork(fetchMockRequestList, indexTo, size)
    }
}

export default function* mockSagas () {
    yield [
        fork(watchFetchMockRequestList),
    ]
}