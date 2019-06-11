import { createStore, applyMiddleware } from 'redux'
import createSagaMiddleware, { END } from 'redux-saga'
import createLogger from 'redux-logger'
import rootReducer from '../reducers'

const logger = createLogger();

export default function configureStore(initialState) {
    const sagaMiddleware = createSagaMiddleware()
    const store = createStore(
        rootReducer,
        initialState,
        applyMiddleware(sagaMiddleware, logger)
    )

    store.runSaga = sagaMiddleware.run
    store.close = () => store.dispatch(END)
    return store
}