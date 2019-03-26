import React from 'react';
import App from './App';
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';
import Login from './componentes/Login';
import PrivateRouter from './core/components/PrivateRouter';
import NotFound from './core/components/NotFound';

export default () => {
    return (
        <BrowserRouter>
            <Switch>
                <Route exact path="/" component={Login} />

                {/* Rotas seguras com acesso somente se passar na regra de segurança */}
                {/* Rota com parametro opcional coringa(/:login?) */}
                <PrivateRouter path="/timeline/:login?" component={App} />
                {/* <Route path="/timeline/:login" component={App} /> */}

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
    );
}