jest.unmock('../mock-reducer'); // unmock to use the actual implementation of mocks
jest.unmock('../../actions')
jest.unmock('./mocks.list.json')

import mock from '../mock-reducer.js'
import { ActionType } from '../../actions'

import mockList from './mocks.list.json'

describe('mocks reducer', () => {
    it('return new list after fetch all mocks completed', () => {
        expect(mock([], {type: ActionType.FetchAllMocks.SUCCESS, mockList:['test', 'test2']})).toEqual(['test','test2'])
    })

    it('return new list with loading mode true after request change mode', () => {
        let newState = mock(mockList, {type: ActionType.ChangeMockMode.REQUEST, mockId:"verification"});
        // it must be new object
        expect(newState).not.toBe(mockList);
        expect(newState[2].loadingMode).toBe(true);
    })

    it('return new list with not loading mode and updated mock mode after change mock mode success', () => {
        let newState = mock(mockList, {type: ActionType.ChangeMockMode.SUCCESS, mockId:'verification', mockMode:'Proxy'});
        // it must be new object
        expect(newState).not.toBe(mockList);
        expect(newState[2].mode).toBe('Proxy');
        expect(newState[2].loadingMode).toBe(false);
    })

    it('return new list with loading mode true after request change stub config value',, () => {
        let newState = mock(mockList, {type: ActionType.ChangeEnumStubValue.REQUEST, mockId:'verification', stubId: "", mockMode:'Proxy'});
        // it must be new object
        expect(newState).not.toBe(mockList);
        expect(newState[2].mode).toBe('Proxy');
        expect(newState[2].loadingMode).toBe(false);
    })
    
});