import React, { Component } from "react";
import {Link,Route,Control} from 'react-keeper';
import 'whatwg-fetch';
import fetchJsonp from "fetch-jsonp";

import "../../App.css";
import {store} from '../store.js';
import SongListInfo from './SongListInfo.js';
import List from './List.js';
import Reviews from './Reviews.js';
import Favoriter from './Favoriter.js';



export default class SongListDetailUI extends Component {
  constructor(props){
    super(props);
    store.dispatch({
      type:'songListDetail_Fetch',
      payload: fetchJsonp(`http://localhost:3000/playlist/detail?id=${this.props.params.id}`)
      .then((response)=>{
        return response.json();
      }).then((json)=>{
        return json;
      })
    })
  }
  render() {
    return (
      <div>
        <div >
        {Object.keys(this.props.data).length?(
          <div>
          <SongListInfo playlist={this.props.data.playlist} pathname={this.props.pathname} />
          <div>
               <Route tracks={this.props.data.playlist.tracks} index path='/songlist' component={List} />
               <Route path='/reviews' component={Reviews} />
               <Route path='/favoriter' component={Favoriter} />
           </div>
          </div>
        ):'wait'}
            {console.log(this.props)}
        </div>
      </div>
    );
  }
}
// <SongListInfo data={this.props.data} pathname={this.props.pathname} />
// <div>
//     <Route data={this.props.data} index path='/songlist' component={List} />
//     <Route path='/reviews' component={Reviews} />
//     <Route path='/favoriter' component={Favoriter} />
// </div>