import React, { Component } from 'react';
import FotoItem from './Foto';
import PubSub from 'pubsub-js';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';

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
        PubSub.subscribe('timeline', (topico, infoFotos) => {
            if (infoFotos.fotos.length > 0)
                this.setState({ fotos: infoFotos.fotos });
        });

        // MANTENDO REGRA DE NEGOCIO DOS COMPONENTES DE FOTO NA TIMELINE
        PubSub.subscribe('atualiza-liker', (topico, infoLiker) => {
            const fotoAchada = this.state.fotos.find(foto => foto.id === infoLiker.fotoId)

            const possivelLiker = fotoAchada.likers.find(liker => liker.login === infoLiker.liker.login);

            fotoAchada.likeada = !fotoAchada.likeada;

            if (!possivelLiker) {
                //Alterar o likers de uma das fotos da timeline
                fotoAchada.likers.push(infoLiker.liker);
            } else {
                const novosLikers = fotoAchada.likers.filter(liker => liker.login !== infoLiker.liker.login);
                fotoAchada.likers = novosLikers;
            }
            // Alterar o estado das fotos porque uma das fotos esta alterada
            this.setState({ fotos: this.state.fotos });
        });

        PubSub.subscribe('novos-comentarios', (topico, infoComentario) => {
            const fotoAchada = this.state.fotos.find(foto => foto.id === infoComentario.fotoId)
            fotoAchada.comentarios.push(infoComentario.novoComentario)
            // Alterar o estado das fotos porque uma das fotos esta alterada
            this.setState({ fotos: this.state.fotos });
        });
    }

    carregaFotos() {
        const urlPerfil = this.login
            ? `https://instalura-api.herokuapp.com/api/public/fotos/${this.login}`
            : `https://instalura-api.herokuapp.com/api/fotos?X-AUTH-TOKEN=${localStorage.getItem('auth-token')}`;

        fetch(urlPerfil)
            .then(response => response.json())
            .then(fotos => this.setState({ fotos }));
    }

    //Concentrar toda a logica de nogocio da aplicação na timeline
    like(fotoId) {
        const requestInfo = {
            method: 'POST',
            headers: new Headers({
                'X-AUTH-TOKEN': localStorage.getItem('auth-token')
            })
        };

        fetch(`https://instalura-api.herokuapp.com/api/fotos/${fotoId}/like`, requestInfo)
            .then(resposta => {
                if (resposta.ok) {
                    return resposta.json()
                } else {
                    throw new Error('Não foi possivel realizar o liker na foto')
                }
            })
            .then(liker => {
                PubSub.publish('atualiza-liker', { fotoId, liker })
            });
    }

    comenta(fotoId, comentario) {
        const requestInfo = {
            method: 'POST',
            body: JSON.stringify({ texto: comentario }),
            headers: new Headers({
                'Content-type': 'application/json',
                'X-AUTH-TOKEN': localStorage.getItem('auth-token')
            })
        };

        fetch(`https://instalura-api.herokuapp.com/api/fotos/${fotoId}/comment`, requestInfo)
            .then(resposta => {
                if (resposta.ok) {
                    return resposta.json();
                } else {
                    throw new Error("Não foi possivel comentar");
                }
            })
            .then(novoComentario => {
                PubSub.publish('novos-comentarios', { fotoId, novoComentario })
            });
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
                        this.state.fotos.map(foto => <FotoItem key={foto.id} foto={foto} likeEvent={this.like} comentaEvent={this.comenta} />)
                    }

                </ReactCSSTransitionGroup>
            </div>
        );
    }
}