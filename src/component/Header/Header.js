import React, { Component } from "react";

import HeaderBanner from './HeaderBanner/HeaderBanner.js';
import Contain from '../Contain/Contain.js';

export default class Header extends Component {
  render() {
    return (
          <div>

          {
            //头部通栏
          }
          <HeaderBanner />

          {
            //主要的内容区
          }
          <Contain />
          </div>
    )
  }
}
