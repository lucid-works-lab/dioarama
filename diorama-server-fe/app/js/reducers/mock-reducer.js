import { ActionType } from '../actions'
import { fromJS } from 'immutable'

export default function mocks (state = [], action) {
    let _state, newState, _mock, tIndex, _stub
    switch(action.type) {
        case ActionType.FetchAllMocks.SUCCESS:
            return fromJS(action.mockList).toJS()

        case ActionType.ChangeMockMode.REQUEST:
            _state = fromJS(state);
            newState = _state.update(
                _state.findIndex((mock) => mock.get('mockId') === action.mockId),
                (m) => m.set('loadingMode', true))
            return newState.toJS()

        case ActionType.ChangeMockMode.SUCCESS:
            _state = fromJS(state);
            newState = _state.update(
                _state.findIndex((mock) => mock.get('mockId') === action.mockId),
                (m) => m.set('loadingMode', false).set('mode', action.mockMode))
            return newState.toJS()

        case ActionType.ChangeEnumStubValue.REQUEST:
            // TODO refactor this
            _state = fromJS(state);
            _mock = _state.get( _state.findIndex((mock) => mock.get('mockId') === action.mockId));
            tIndex = _mock.get('stubs').findIndex( (stub) => stub.get('stubId') === action.stubId);
            if(tIndex < 0){
                return state;
            }
            _stub = _mock.get('stubs').update(
                tIndex,
                (s) => s.set('loading', true)
            );
            _mock = _mock.set('stubs', _stub);
            newState = _state.set(
                _state.findIndex((mock) => mock.get('mockId') === action.mockId),
                _mock);

           return newState.toJS();

        case ActionType.ChangeEnumStubValue.SUCCESS:
            _state = fromJS(state);
            _mock = _state.get( _state.findIndex((mock) => mock.get('mockId') === action.mockId));
            tIndex = _mock.get('stubs').findIndex( (stub) => stub.get('stubId') === action.stubId);
            if(tIndex < 0){
                return state;
            }
            _stub = _mock.get('stubs').update(
                tIndex,
                (s) => s.set('value', action.value).set('loading', false)
            );
            _mock = _mock.set('stubs', _stub);
            newState = _state.set(
                _state.findIndex((mock) => mock.get('mockId') === action.mockId),
                _mock);

            return newState.toJS();
    }
    return state;
}
