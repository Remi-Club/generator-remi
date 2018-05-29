import React from 'react';
import ReactDOM from 'react-dom';
import {
    Provider as Provider
} from 'react-redux';
import store from './reducers';
import {BrowserRouter, Route} from 'react-router-dom';
import Wrapper from 'boxes/Wrapper';

const App = () => (
    <BrowserRouter basename='/'>
        <Route path='/' component={Wrapper} />
    </BrowserRouter>
);

ReactDOM.render(
    <Provider store={store}>
        <App/>
    </Provider>,
    document.getElementById('container')
);
