import React, { Component } from 'react';
//Manipular url querys
import queryString from 'querystring';

class Login extends Component {
    constructor() {
        super();
        this.state = { msg: '' }
    }

    componentDidMount() {
        //Capturar uma query string passado pela url.
        //As query string da url fica disponivel na props location.search
        //Para mapear, vamos usar o pacote querystring e a função parse
        let params = queryString.parse(this.props.location.search);
        if (params['?msg'])
            this.setState({ msg: params['?msg'] });
    }

    envia(e) {
        e.preventDefault();

        const requestInfo = {
            method: 'POST',
            body: JSON.stringify({ login: this.login.value, senha: this.password.value }),
            headers: new Headers({
                'Content-type': 'application/json'
            })
        };

        // Realizando requisição post
        fetch('https://instalura-api.herokuapp.com/api/public/login', requestInfo)
            .then(response => {
                if (response.ok) {
                    return response.text();
                } else {
                    throw new Error('Não foi possivel realizar o login');
                }
            })
            .then(token => {
                localStorage.setItem('auth-token', token);
                //Redirecionar para outra rota.
                this.props.history.push('/timeline');
            })
            .catch(err => {
                this.setState({ msg: err.message });
            });
    }
    render() {
        return (
            <div className="login-box">
                <h1 className="header-logo">Instalura</h1>
                <span>{this.state.msg}</span>
                <form onSubmit={this.envia.bind(this)}>
                    {/* Guardando o input em uma variavel. Para acessar o valor temos que chamar a prop value */}
                    <input type="text" ref={(input) => this.login = input} />
                    <input type="password" ref={(input) => this.password = input} />
                    <input type="submit" value="login" />
                </form>
            </div>
        );
    }
}

//Utilizamos o withRouter para que quando for roteado seja populado as props
// Exemplo do efeito, chamando a rota /login-teste
//export default withRouter(Login);

export default Login;