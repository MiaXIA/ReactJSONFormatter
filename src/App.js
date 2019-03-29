import React, { Component } from 'react';
import JSONFormatter from "./Component/JSONFormatter";

class App extends Component {
  render() {
    var response = {
      str: 'Test String',
      bool: true,
      num: 0,
      arr: [
        'Test Array',
        {
          key: 'Test Object Key'
        }
      ]
    }
    return (
      <JSONFormatter data={response} />
    );
  }
}

export default App;
