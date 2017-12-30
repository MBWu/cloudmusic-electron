import React, { Component } from "react";

import {Route,Link} from 'react-keeper';

import {LeftSide} from './LeftSide/LeftSide.js';
import {RightSide} from './RightSide/RightSide.js';

export default class Home extends Component {
  render() {
    return (
      <div
        className="clearfix"
        style={{
          width: 1000,
          height: 540
        }}
      >
        <LeftSide />
        <RightSide />
       
      </div>
      
    );
  }
}
// <Route path={`${this.props.match.url}`} component={RightSide} />
