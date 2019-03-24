import React, { Component } from 'react';
import FotoItem from './Foto';

export default class Timeline extends Component {
    constructor(props) {
        super(props);
        this.state = { fotos: [] }
        this.login = this.props.login;
    }

    carregaFotos() {
        const urlPerfil = this.login
            ? `https://instalura-api.herokuapp.com/api/public/fotos/${this.login}`
            : `https://instalura-api.herokuapp.com/api/fotos?X-AUTH-TOKEN=${localStorage.getItem('auth-token')}`;

        fetch(urlPerfil)
            .then(response => response.json())
            .then(fotos => this.setState({ fotos }));
    }

    //Quando utilizamos o componentDidMount, temos problema se queremos renderizar 
    //novamente o componente, porque o ciclo de vida componentDidMount não vai ser executado novamente. 
    //Para isso, existe o componentWillReceiveProps que sempre que passamos uma props e renderizamos o componente novamente,
    //Esse ciclo de vida vai ser executado
    //O parametro nextProps são as novas props passadas
    //O nextProps não é populado para as props do this(contexto)i
    componentWillReceiveProps(nextProps) {
        //vamos verificar se as novas props passada tem a prop login e se ela esta preechida
        if (nextProps.login !== undefined) {
            this.login = nextProps.login;
            this.carregaFotos();
        }
    }

    componentDidMount() {
        this.carregaFotos();
    }

    render() {
        return (
            <div className="fotos container">
                {
                    this.state.fotos.map(foto => <FotoItem key={foto.id} foto={foto} />)
                }
            </div>
        );
    }
}