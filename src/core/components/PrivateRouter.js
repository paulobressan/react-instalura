import React from 'react';
import { Route, Redirect, matchPath } from 'react-router-dom';


function validarRota(props) {
    //console.log(props);

    //Verificar a existencia do parametro opcional login da rota
    let resultado = matchPath(props.location.pathname, '/timeline/:login?')

    //Se o corginga opcional a rota :login? estiver populado, quer dizer que é uma rota publica, se não é uma rota privada
    let enderecoPrivadoTimeline = resultado.params.login === undefined

    if (enderecoPrivadoTimeline && !localStorage.getItem('auth-token'))
        return false;
    return true;
}

const PrivateRouter = ({ component: Component, ...rest }) => (
    <Route {...rest} render={(props) => (
        validarRota(props)
            ? <Component {...props} />
            : <Redirect to='/?msg=Acesse sua conta para navegar para Timeline!' />
    )} />
)

export default PrivateRouter