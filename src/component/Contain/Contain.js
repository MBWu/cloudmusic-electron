import React, { Component } from "react";

import {Route} from 'react-keeper';

import Home from "../Home/Home.js";


const MvDetail = ()=>{
  return(<div>Mvdetail</div>)
}




export default class Contain extends Component {
  render() {
    return (
      <div>
        <Route path='/mvdetail/:id' component={MvDetail} />
        <Route index path='/home' component={Home} />
      </div>
    );
  }
}


