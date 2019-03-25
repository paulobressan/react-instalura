import React, { Component } from 'react';
import FotoItem from './Foto';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import TimelineApi from '../logicas/TimelineApi';

export default class Timeline extends Component {
    constructor(props) {
        super(props);
        this.state = { fotos: [] }
        this.login = this.props.login;
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

    componentWillMount() {
        //A store do redux contem um metodo subscribe que vamos ficar "escutando" as ações da store.
        this.props.store.subscribe(() => {
            //Para capturar os dados da store, temos que chamar o getState que chama sempre o ultimo state retornado pela store.
            this.setState({ fotos: this.props.store.getState() });
        });
    }

    carregaFotos() {
        const urlPerfil = this.login
            ? `https://instalura-api.herokuapp.com/api/public/fotos/${this.login}`
            : `https://instalura-api.herokuapp.com/api/fotos?X-AUTH-TOKEN=${localStorage.getItem('auth-token')}`;

        TimelineApi.lista(urlPerfil, this.props.store);
        // Como o carregamento é assincrono,
        // podemos adicionar ao dispatch a ação e o Redux gerenciar quando ela vai ser executada.
        this.props.store.dispatch(TimelineApi.lista(urlPerfil));
    }

    //Concentrar toda a logica de nogocio da aplicação na timeline
    like(fotoId) {
        this.props.store.like(fotoId);
    }

    comenta(fotoId, comentario) {
        this.props.store.comenta(fotoId, comentario);
    }

    render() {
        return (
            <div className="fotos container">
                <ReactCSSTransitionGroup
                    // Nome base da classe CSS
                    transitionName="timeline"
                    //Mesmo tempo que foi definido na classe css é definido nesses parametros
                    transitionEnterTimeout={500}
                    transitionLeaveTimeout={300}>
                    {
                        this.state.fotos.map(foto => <FotoItem key={foto.id} foto={foto} likeEvent={this.like.bind(this)} comentaEvent={this.comenta.bind(this)} />)
                    }

                </ReactCSSTransitionGroup>
            </div>
        );
    }
}