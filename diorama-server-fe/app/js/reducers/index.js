import { combineReducers } from 'redux';
import mocks from './mock-reducer';
import requests from './request-reducer';

export default combineReducers({
    mocks,
    requests
});
