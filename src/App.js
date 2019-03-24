import React, { Component } from 'react';
import Header from './componentes/Header';
import Timeline from './componentes/Timeline';
import { withRouter } from 'react-router-dom';

class App extends Component {
  render() {
    return (
      <div id="root">
        <div className="main">
          <Header />
          {/* Os parametros coringa passado em uma rota, esta disponivel para acesso atraves das props, match, params */}
          <Timeline login={this.props.match.params.login} />
        </div>
      </div>
    );
  }
}

export default withRouter(App);
