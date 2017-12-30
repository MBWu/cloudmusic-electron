import React, { Component } from "react";
import 'whatwg-fetch';
import fetchJsonp from "fetch-jsonp";

import {store} from '../store.js';
import RankUpToUp from './RankContain/RankUpToUp.js';
import RankNewSong from './RankContain/RankNewSong.js';
import RankCreateSong from './RankContain/RankCreateSong.js';
import RankHotSong from './RankContain/RankHotSong.js';
import RankAudio from './RankContain/RankAudio.js';

import up_to_up from './up-to-up.png';
import createSong from './createSong.jpg';
import newSong from './newSong.jpg';
import hotSong from './hotSong.jpeg';
import audio from './audio.jpeg';

export default class RankOfficial extends Component {
  constructor(props){
    
    super(props);
    this.state = {
      activeType: null,
      activeLink: null
    }
  }
  componentWillMount() {
    //fetch 飆升榜 
    store.dispatch({
      type: "rank_upToUp_Fetch",
      payload: fetchJsonp("http://localhost:3000/playlist/detail?id=19723756")
        .then(response => {
          return response.json();
        })
        .then(json => {
          return json;
        })
    });

    //fetch 新歌榜 
    store.dispatch({
      type: "rank_newSong_Fetch",
      payload: fetchJsonp("http://localhost:3000/playlist/detail?id=3779629")
        .then(response => {
          return response.json();
        })
        .then(json => {
          return json;
        })
    });

    //fetch 原創榜 
    store.dispatch({
      type: "rank_createSong_Fetch",
      payload: fetchJsonp("http://localhost:3000/playlist/detail?id=2884035")
        .then(response => {
          return response.json();
        })
        .then(json => {
          return json;
        })
    });

    //fetch 熱歌榜 
    store.dispatch({
      type: "rank_hotSong_Fetch",
      payload: fetchJsonp("http://localhost:3000/playlist/detail?id=3778678")
        .then(response => {
          return response.json();
        })
        .then(json => {
          return json;
        })
    });

    //fetch 電音榜 
    store.dispatch({
      type: "rank_audio_Fetch",
      payload: fetchJsonp("http://localhost:3000/playlist/detail?id=10520166")
        .then(response => {
          return response.json();
        })
        .then(json => {
          return json;
        })
    });
  }

  clickToActive(type,index){ //点击某一首，显示阴影背景

    this.setState({
      activeType:type,
      activeLink: index
    });
  }
  render() {
    return (
      <div style={{ padding: "0 30px 0 16px" }}>
        <RankUpToUp imageUrl={up_to_up} activeType={this.state.activeType} activeLink={this.state.activeLink} clickToActive={this.clickToActive.bind(this)} />
        <RankNewSong imageUrl={newSong} activeType={this.state.activeType} activeLink={this.state.activeLink} clickToActive={this.clickToActive.bind(this)} />
        <RankCreateSong imageUrl={createSong} activeType={this.state.activeType} activeLink={this.state.activeLink} clickToActive={this.clickToActive.bind(this)} />
        <RankHotSong imageUrl={hotSong} activeType={this.state.activeType} activeLink={this.state.activeLink} clickToActive={this.clickToActive.bind(this)} />
        <RankAudio imageUrl={audio} activeType={this.state.activeType} activeLink={this.state.activeLink} clickToActive={this.clickToActive.bind(this)} />
      </div>
    );
  }
}
