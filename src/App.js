import React, { Component } from 'react';
import Header from './componentes/Header';
import Timeline from './componentes/Timeline';
//Utilizado para validar tipos e se existe objeto store ou outros na App ou outras componentes. 
//import PropTypes from 'prop-types';

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

// //Validar tudo o que esperamos no contexto global do react para que a App seja criada.
// App.contextTypes = {
//   //A App necessita ter a prop store no contexto global para ser criada
//   store: PropTypes.object.isRequired
// }

export default App;
