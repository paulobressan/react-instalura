import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PubSub from 'pubsub-js';

class FotoAtualizacoes extends Component {
    constructor(props) {
        super(props);
        this.state = { likeada: this.props.foto.likeada }
    }
    like(e) {
        e.preventDefault();
        const requestInfo = {
            method: 'POST',
            headers: new Headers({
                'X-AUTH-TOKEN': localStorage.getItem('auth-token')
            })
        };
        fetch(`https://instalura-api.herokuapp.com/api/fotos/${this.props.foto.id}/like`, requestInfo)
            .then(resposta => {
                if (resposta.ok) {
                    return resposta.json()
                } else {
                    throw new Error('Não foi possivel realizar o liker na foto')
                }
            })
            .then(liker => {
                this.setState({ likeada: !this.state.likeada });
                PubSub.publish('atualiza-liker', { fotoId: this.props.foto.id, liker })
            });
    }

    render() {
        return (
            <section className="fotoAtualizacoes">
                <a onClick={this.like.bind(this)} className={this.state.likeada ? "fotoAtualizacoes-like-ativo" : "fotoAtualizacoes-like"}>Likar</a>
                <form className="fotoAtualizacoes-form">
                    <input type="text" placeholder="Adicione um comentário..." className="fotoAtualizacoes-form-campo" />
                    <input type="submit" value="Comentar!" className="fotoAtualizacoes-form-submit" />
                </form>

            </section>
        );
    }
}

class FotoInfo extends Component {
    constructor(props) {
        super(props);
        this.state = { likers: this.props.foto.likers }
    }

    componentWillMount() {
        PubSub.subscribe('atualiza-liker', (topico, infoLiker) => {
            if (this.props.foto.id === infoLiker.fotoId) {
                const possivelLiker = this.state.likers.find(liker => liker.login === infoLiker.liker.login);
                if (!possivelLiker) {
                    const novosLikers = this.state.likers.concat(infoLiker.liker);
                    this.setState({ likers: novosLikers });
                } else {
                    const novosLikers = this.state.likers.filter(liker => liker.login !== infoLiker.liker.login);
                    this.setState({ likers: novosLikers });
                }
            }
        });
    }

    render() {
        return (
            <div className="foto-info">
                <div className="foto-info-likes">
                    Curtidas <br />
                    {
                        this.state.likers.map(liker => <Link to={`/timeline/${liker.login}`} key={liker.login}>{liker.login}</Link>)
                    }
                </div>
                <p className="foto-info-legenda">
                    <a className="foto-info-autor">autor</a><br />
                    {this.props.foto.comentario}
                </p>
                <ul className="foto-info-comentarios">
                    {
                        this.props.foto.comentarios.map(comentario =>
                            <li className="comentario">
                                <Link className="foto-info-autor" to={`/timeline/${comentario.login}`}>{comentario.login}: </Link>
                                {comentario.texto}
                            </li>
                        )
                    }
                </ul>
            </div>
        );
    }
}

class FotoHeader extends Component {
    render() {
        return (
            <header className="foto-header">
                <figure className="foto-usuario">
                    <img src={this.props.foto.urlPerfil} />
                    <figcaption className="foto-usuario">
                        <Link to={`/timeline/${this.props.foto.loginUsuario}`}>
                            {this.props.foto.loginUsuario}
                        </Link>
                    </figcaption>
                </figure>
                <time className="foto-data">{this.props.foto.horario}</time>
            </header>
        );
    }
}

export default class FotoItem extends Component {
    render() {
        return (
            <div className="foto">
                <FotoHeader foto={this.props.foto} />
                <img alt="foto" className="foto-src" src={this.props.foto.urlFoto} />
                <FotoInfo foto={this.props.foto} />
                <FotoAtualizacoes foto={this.props.foto} />
            </div>
        );
    }
}