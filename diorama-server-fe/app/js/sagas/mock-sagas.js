import { take, put, call, fork, select } from 'redux-saga/effects'
import * as actions from '../actions'
import * as api from '../services/api'

function* changeMockMode(mockId, mockMode) {
    try {
        const result = yield call(api.updateMockConfig, mockId, "mode", mockMode)
        // TODO check result
        yield put(actions.changeMockMode.success(mockId, mockMode))
    }catch(e){
        yield put(actions.changeMockMode.failure(e))
    }
}

function* fetchAllMocks() {
    try {
        const result = yield call(api.fetchAllMocks)
        // TODO check result
        yield put(actions.fetchAllMocks.success(result.response))
    }catch(e){
        console.log(e);
        yield put(actions.fetchAllMocks.failure(e))
    }
}

function* updateStubConfig(mockId, stubId, value){
    try {
        const result = yield call(api.updateStubConfig, mockId, stubId, 'value', value);
        // TODO check result
        yield put(actions.changeEnumStubValue.success(mockId, stubId, value))
    }catch(e){
        console.log(e);
        yield put(actions.changeEnumStubValue.failure(e))
    }
}

function* watchChangeEnumStubValue(){
    while(true) {
        const {mockId, stubId, value} = yield take(actions.ActionType.ChangeEnumStubValue.REQUEST)
        yield fork(updateStubConfig, mockId, stubId, value)
    }
}

function* watchChangeMockMode() {
    while(true) {
        const {mockId, mockMode} = yield take(actions.ActionType.ChangeMockMode.REQUEST)
        yield fork(changeMockMode, mockId, mockMode)
    }
}

function* watchFetchAllMocks(){
    while(true) {
        yield take(actions.ActionType.FetchAllMocks.REQUEST)
        yield fork(fetchAllMocks)
    }
}

export default function* mockSagas() {
    yield [
        fork(watchChangeMockMode),
        fork(watchFetchAllMocks),
        fork(watchChangeEnumStubValue),
    ]
}