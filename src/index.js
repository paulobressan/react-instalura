import React from 'react';
import ReactDOM from 'react-dom';
import * as serviceWorker from './serviceWorker';

import './css/reset.css';
import './css/timeline.css';
import './css/login.css';
import AppRoutes from './router';

//INTEGRAÇÃO REACT-REDUX
import { Provider } from 'react-redux';

//START REDUX
//Criando uma store no redux
import { createStore, applyMiddleware, combineReducers } from 'redux';
import thunkMiddleware from 'redux-thunk';
//reducers
import { timeline } from './reducers/timeline';
import { notificacao } from './reducers/header';

//Combinar os reducers para que uma store tenha mais de um reducer
const reducers = combineReducers({
    timeline,
    notificacao
});

// O redux vai ficar entre o redux e o react e vai facilitar o gerenciamento de estados.
const store = createStore(reducers, applyMiddleware(thunkMiddleware));

//END REDUX

ReactDOM.render(
    //O Provider vai disponibilizar a store em todos os componentes
    <Provider store={store}>
        <AppRoutes />
    </Provider>
    , document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
