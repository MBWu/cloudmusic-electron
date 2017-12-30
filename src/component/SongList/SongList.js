import React, { Component } from "react";
import 'whatwg-fetch';
import fetchJsonp from "fetch-jsonp";

import {store} from '../store.js';
import "../../App.css";

import SelectSongList from './SelectSongList.js';
import List from './List.js';
// <Link to={`/home/songlistdetail/1`} >songlist 1</Link>


export default class SongList extends Component {
  constructor(props){
    super(props);

    store.dispatch({
      type:'songList_Fetch',
      payload:fetchJsonp("http://localhost:3000/top/playlist?limit=16&offset=0")
      .then(response => {
        return response.json();
      })
      .then(json => {
          return json;
      })
    })
    
  }
  render() {
    return (
      <div>
      
        <div style={{ padding: 30 }}>
          <SelectSongList />
          <List pathname={this.props.pathname} />
        </div>
      </div>
    );
  }
}



