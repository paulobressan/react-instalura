import React, { Component } from 'react';
import { connect } from 'react-redux';
import TimelineApi from '../logicas/TimelineApi';

class Header extends Component {
    constructor(props) {
        super(props);
        this.state = { msg: this.props.notificacao }
    }

    componentWillReceiveProps(nextProps) {
        this.setState({ msg: nextProps.notificacao })
    }

    pesquisa(e) {
        e.preventDefault();
        this.props.dispatch(TimelineApi.pesquisa(this.loginPesquisado.value));
    }

    render() {
        return (
            <header className="header container">
                <h1 className="header-logo">
                    Instalura
                </h1>

                <form className="header-busca" onSubmit={this.pesquisa.bind(this)}>
                    <input type="text" name="search" placeholder="Pesquisa" className="header-busca-campo" ref={input => this.loginPesquisado = input} />
                    <input type="submit" value="Buscar" className="header-busca-submit" />
                </form>

                <span>
                    {
                        this.state.msg
                    }
                </span>

                <nav>
                    <ul className="header-nav">
                        <li className="header-nav-item">
                            <a href="#">
                                {/* Quem deu like nas minhas fotos */}
                            </a>
                        </li>
                    </ul>
                </nav>
            </header>
        );
    }
}

const mapStateToProps = (state, ownProps) => {
    //ownProps : Props passada por parametros.
    return ({
        notificacao: state.notificacao
    });
}

export default connect(mapStateToProps)(Header)