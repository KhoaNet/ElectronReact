import React from 'react'
import { render } from 'react-dom'
import { Provider } from 'react-redux';

import configureStore from './store/configStore';
import { rootSaga } from "./services/rootSaga";
import App from './App.jsx';
import '../src/main.css';
import '../../node_modules/bootstrap/dist/css/bootstrap.min.css';


// import '@fortawesome/fontawesome-free/css/all.min.css';
// import 'bootstrap-css-only/css/bootstrap.min.css';

const store = configureStore();
store.runSaga(rootSaga);

render(
    <Provider store={store}>
        <App />
    </Provider>
    , document.getElementById('app')
)
