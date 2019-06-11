
const REQUEST = 'REQUEST'
const SUCCESS = 'SUCCESS'
const FAILURE = 'FAILURE'

function createRequestTypes(base) {
    return [REQUEST, SUCCESS, FAILURE].reduce((acc, type) => {
        acc[type] = `${base}_${type}`
        return acc
    }, {})
}

export const ActionType = {
    FetchAllMocks: createRequestTypes('FetchAllMocks'),
    ChangeMockMode: createRequestTypes('ChangeMockMode'),
    ChangeEnumStubValue: createRequestTypes('ChangeEnumStubValue'),
    FetchMockRequest: createRequestTypes('FetchMockRequest'),
    FetchMockRequestList: createRequestTypes('FetchMockRequestList')
};

function action(type, payload = {}) {
    return {type, ...payload}
}

export const fetchAllMocks = {
    request: () => action(ActionType.FetchAllMocks.REQUEST),
    success: (mockList) => action(ActionType.FetchAllMocks.SUCCESS, {mockList}),
    failure: (error) => action(ActionType.FetchAllMocks.FAILURE, {error}),
}

export const changeMockMode = {
    request: (mockId, mockMode) => action(ActionType.ChangeMockMode.REQUEST, {mockId, mockMode}),
    success: (mockId, mockMode) => action(ActionType.ChangeMockMode.SUCCESS, {mockId, mockMode}),
    failure: (error) => action(ActionType.ChangeMockMode.FAILURE, {error}),
}

export const changeEnumStubValue = {
    request: (mockId, stubId, value) => action(ActionType.ChangeEnumStubValue.REQUEST, {mockId, stubId, value}),
    success: (mockId, stubId, value) => action(ActionType.ChangeEnumStubValue.SUCCESS, {mockId, stubId, value}),
    failure: (error) => action(ActionType.ChangeEnumStubValue.FAILURE, {error}),
}

export const fetchMockRequest = {
    request: (index) => action(ActionType.FetchMockRequest.REQUEST, {index}),
    success: (request) => action(ActionType.FetchMockRequest.SUCCESS, {request}),
    failure: (error) => action(ActionType.FetchMockRequest.FAILURE, {error}),
}

export const fetchMockRequestList = {
    request: (indexTo, size) => action(ActionType.FetchMockRequestList.REQUEST, {indexTo, size}),
    success: (requestList) => action(ActionType.FetchMockRequestList.SUCCESS, {requestList}),
    failure: (error) => action(ActionType.FetchMockRequestList.FAILURE, {error}),
}