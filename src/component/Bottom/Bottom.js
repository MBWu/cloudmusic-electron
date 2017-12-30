import React, { Component } from "react";

import Controler from './Controler/Controler.js';

export default class Bottom extends Component {
    render() {
      return (
        <div
          className = 'Bottom_WrapBox'
        >
          <Controler />
          
          <div className="songInfo" />
        </div>
      );
    }
  }