import React, { Component } from "react";
import {Route} from 'react-keeper';

import "../../App.css";
import RadioList from './RadioList/RadioList.js';
import RecommandProgram from './RecommandProgram/RecommandProgram.js';
import RecommandRadio from './RecommandRadaio/RecommandRadaio.js';
import HotRadio from './HotRadio/HotRadio.js';
import Categories from './Categories/Categories.js';

const indexComponent = props=>{
  return (
    <div>
    <RecommandProgram />
    <RecommandRadio />
    <HotRadio />
    </div>
  )
}


export default class Radio extends Component {
  render() {
    return (
      <div >
        <RadioList pathname={this.props.pathname} />
        <Route index path='/home' component={indexComponent}/>
        <Route cache path='/categories/:id' component={Categories}/>
      </div>
    );
  }
}



