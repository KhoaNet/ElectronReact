
import { applyMiddleware,/* combineReducers, */compose, createStore } from 'redux';
import { composeWithDevTools } from 'electron-redux-devtools';
import thunk from 'redux-thunk';
import createSagaMiddleware, { END } from 'redux-saga';
import { loadingBarMiddleware } from 'react-redux-loading-bar';
import rootReducer from '../services/rootReducer';

const sagaMiddleware = createSagaMiddleware()
export default function configureStore() {
    const middleware = [
        thunk,
        sagaMiddleware,
        loadingBarMiddleware({
            promiseTypeSuffixes: ['REQUEST', 'SUCCESS', 'FAILURE'],
        }),
    ];
    const store = createStore(
        rootReducer,
        composeWithDevTools(applyMiddleware(...middleware))
    );
    store.runSaga = sagaMiddleware.run;
    store.close = () => store.dispatch(END);
    return store
}