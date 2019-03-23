import React from 'react';
import ReactDOM from 'react-dom';
import './css/reset.css';
import './css/timeline.css';
import './css/login.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';
import Login from './componentes/Login';
import PrivateRouter from './core/components/PrivateRouter';
import NotFound from './core/components/NotFound';

ReactDOM.render(
    <BrowserRouter>
        <Switch>
            <Route exact path="/" component={Login} />

            {/* Rotas seguras com acesso somente se passar na regra de segurança */}
            <PrivateRouter path="/timeline" component={App} />

            {/* Exemplo de como usar a função render do react com trativas de renderização ou redirecionamento */}
            <Route path="/login-teste" render={props => {
                return false ? <Login /> : <Redirect to="/teste" />
            }} />

            {/* Exemplo de como funciona o metodo render dentro de um Route */}
            <Route path='/teste' render={(props) => {
                console.log(props);
                return (
                    <h1>Olas</h1>
                );
            }} />

            {/* Rota para representar uma pagina NotFound */}
            <Route path="*" component={NotFound} />
        </Switch>
    </BrowserRouter>
    , document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
