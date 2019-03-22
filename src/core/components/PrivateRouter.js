import React from 'react';
import { Route, Redirect } from 'react-router-dom';

function validarToken(){
    if(localStorage.getItem('auth-token'))
        return true;
    return false;
}

const PrivateRouter = ({ component: Component, ...rest }) => (
    <Route {...rest} render={(props) => (
        validarToken()
            ? <Component {...props} />
            : <Redirect to='/?msg=Acesse sua conta!' />
    )} />
)

export default PrivateRouter