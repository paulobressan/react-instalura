import React, { Component } from 'react';
import Header from './componentes/Header';
import Timeline from './componentes/Timeline';
import { withRouter } from 'react-router-dom';

//START REDUX
//Criando uma store no redux
import { createStore, applyMiddleware, combineReducers } from 'redux';
import thunkMiddleware from 'redux-thunk';
//reducers
import { timeline } from './reducers/timeline';
import { notificacao } from './reducers/header';

//Combinar os reducers para que uma store tenha mais de um reducer
const reducers = combineReducers({
  timeline,
  notificacao
});

// O redux vai ficar entre o redux e o react e vai facilitar o gerenciamento de estados.
const store = createStore(reducers, applyMiddleware(thunkMiddleware));


//END REDUX

class App extends Component {
  render() {
    return (
      <div id="root">
        <div className="main">
          <Header store={store} />
          {/* Os parametros coringa passado em uma rota, esta disponivel para acesso atraves das props, match, params */}
          <Timeline login={this.props.match.params.login} store={store} />
        </div>
      </div>
    );
  }
}

export default withRouter(App);
