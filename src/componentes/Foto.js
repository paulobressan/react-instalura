import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class FotoAtualizacoes extends Component {
    comenta(e) {
        e.preventDefault();
        this.props.comentaEvent(this.props.foto.id, this.comentario.value);
    }

    like(e) {
        e.preventDefault();
        this.props.likeEvent(this.props.foto.id);
    }

    render() {
        return (
            <section className="fotoAtualizacoes">
                <a onClick={this.like.bind(this)} className={this.props.foto.likeada ? "fotoAtualizacoes-like-ativo" : "fotoAtualizacoes-like"}>Likar</a>
                <form className="fotoAtualizacoes-form" onSubmit={this.comenta.bind(this)}>
                    <input type="text" placeholder="Adicione um comentário..." className="fotoAtualizacoes-form-campo" ref={input => this.comentario = input} />
                    <input type="submit" value="Comentar!" className="fotoAtualizacoes-form-submit" />
                </form>

            </section>
        );
    }
}

class FotoInfo extends Component {
    render() {
        return (
            <div className="foto-info">
                <div className="foto-info-likes">
                    Curtidas <br />
                    {
                        this.props.foto.likers.map(liker => <Link to={`/timeline/${liker.login}`} key={liker.login}>{liker.login}</Link>)
                    }
                </div>
                <p className="foto-info-legenda">
                    <a className="foto-info-autor">autor</a><br />
                    {this.props.foto.comentario}
                </p>
                <ul className="foto-info-comentarios">
                    {
                        this.props.foto.comentarios.map(comentario =>
                            <li key={comentario.id} className="comentario">
                                <Link className="foto-info-autor" to={`/timeline/${comentario.login}`} >{comentario.login}: </Link>
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
                <FotoAtualizacoes {...this.props} />
            </div>
        );
    }
}