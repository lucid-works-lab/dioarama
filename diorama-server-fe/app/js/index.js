import 'babel-polyfill';

import React from 'react';
import ReactDOM from 'react-dom';
import promise from 'es6-promise';
import 'isomorphic-fetch';
import {hashHistory, Router, Route, Link, IndexRedirect, withRouter} from 'react-router';
import {Provider} from 'react-redux';
import MockPage from './containers/MockPage';
import App from './containers/App';
import RequestsPage from './containers/RequestsPage';
import TestRunnerPage from './containers/TestRunnerPage';
import MockOverviewPage from './containers/MockOverviewPage';
import configureStore from './store/configureStore'
import {fetchAllMocks, fetchMockRequestList} from './actions'

import rootSaga from './sagas'

const store = configureStore({});
store.runSaga(rootSaga)

store.dispatch(fetchAllMocks.request());
store.dispatch(fetchMockRequestList.request(1, 20));

ReactDOM.render(
    <Provider store={store}>
        <Router history={hashHistory}>
            <Route path='/' component={App}>
                <IndexRedirect to="/mock/overview"/>
                <Route path="/mock/overview" component={MockOverviewPage}/>
                <Route path="/mock/:mockId" component={MockPage}/>
                <Route path="/requests" component={RequestsPage}/>
                <Route path="/test-runner" component={TestRunnerPage}/>
            </Route>
        </Router>
    </Provider>,
    document.getElementById('content')
);
	
	