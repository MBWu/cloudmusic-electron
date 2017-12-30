import React, { Component } from "react";

import "./App.css";

import Header from "./component/Header/Header.js";
import Bottom from './component/Bottom/Bottom.js';

class App extends Component {
  
  render() {
    return (
      <div>
          <div
            style={{
              width: 1000,
              height: 670,
              marginTop:-1,
            }}
          >
            <Header />
            <Bottom />
          </div>
      </div>
    );
  }
}

export default App;
