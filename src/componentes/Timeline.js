import React, { Component } from 'react';
import FotoItem from './Foto';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import TimelineApi from '../logicas/TimelineApi';
import { connect } from 'react-redux';

class Timeline extends Component {
    constructor(props) {
        super(props);
        //this.state = { fotos: this.props.fotos }
        this.login = this.props.login
    }

    //Quando utilizamos o componentDidMount, temos problema se queremos renderizar 
    //novamente o componente, porque o ciclo de vida componentDidMount não vai ser executado novamente. 
    //O parametro nextProps são as novas props passadas
    // componentWillReceiveProps(nextProps) {
    //     //vamos verificar se as novas props passada tem a prop login e se ela esta preechida
    //     if (nextProps.login !== undefined) {
    //         this.login = nextProps.login;
    //         this.carregaFotos();
    //     }
    // }

    componentDidMount() {
        this.carregaFotos();
    }

    carregaFotos() {
        const urlPerfil = this.login
            ? `https://instalura-api.herokuapp.com/api/public/fotos/${this.login}`
            : `https://instalura-api.herokuapp.com/api/fotos?X-AUTH-TOKEN=${localStorage.getItem('auth-token')}`;

        // TimelineApi.lista(urlPerfil, this.props.store);
        // Como o carregamento é assincrono,
        // podemos adicionar ao dispatch a ação e o Redux gerenciar quando ela vai ser executada.
        this.props.dispatch(TimelineApi.lista(urlPerfil));
    }

    //Concentrar toda a logica de nogocio da aplicação na timeline
    like(fotoId) {
        this.props.dispatch(TimelineApi.like(fotoId));
    }

    comenta(fotoId, comentario) {
        this.props.dispatch(TimelineApi.comenta(fotoId, comentario));
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
                        this.props.fotos.map(foto => <FotoItem key={foto.id} foto={foto} likeEvent={this.like.bind(this)} comentaEvent={this.comenta.bind(this)} />)
                    }

                </ReactCSSTransitionGroup>
            </div>
        );
    }
}

// O mapStateToProps sempre vai ser executado quando um reducer ser alterado
// E no componente adicionaramos um ciclo de vida para setar o estado de fotos
// Quando o mapStateToProps injetar as props novas.
const mapStateToProps = (state, ownProps) => {
    //console.log(ownProps);

    //ownProps : Props passada por parametros.
    return ({
        login: ownProps.login,
        fotos: state.timeline
    })
}

export default connect(mapStateToProps)(Timeline);