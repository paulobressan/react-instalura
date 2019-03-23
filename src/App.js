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
          <Timeline />
        </div>
      </div>
    );
  }
}

export default withRouter(App);
