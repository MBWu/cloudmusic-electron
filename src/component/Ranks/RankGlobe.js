import React ,{Component}from 'react';
import 'whatwg-fetch';
import fetchJsonp from "fetch-jsonp";

import {store} from '../store.js';  //store

import '../../App.css';

//rank Component
import RankUK from './RankContain/RankUK.js';
import RankUS from './RankContain/RankUS.js';
import RankFrench from './RankContain/RankFrench.js';
import RankiTunes from './RankContain/RankiTunes.js';
import RankAcg from './RankContain/RankAcg.js';
import RankBeatport from './RankContain/RankBeatport.js';
import RankOricon from './RankContain/RankOricon.js';
import RankMusical from './RankContain/RankMusical.js';
import RankHit from './RankContain/RankHit.js';
import RankKTV from './RankContain/RankKTV.js';
import RankHito from './RankContain/RankHito.js';
import RankTopHK from './RankContain/RankTopHK.js';
import RankTop from './RankContain/RankTop.js';
import RankHKRadio from './RankContain/RankHKRadio.js';
import RankHiphop from './RankContain/RankHiphop.js';

export default class RankGlobe extends Component{
    componentWillMount(){
        //fetch Uk排行榜
        store.dispatch({
            type: "rank_UK_Fetch",
            payload: fetchJsonp("http://localhost:3000/top/list?idx=5")
              .then(response => {
                return response.json();
              })
              .then(json => {
                return json;
              })
          });
        
        //fetch US周榜
        store.dispatch({
            type: "rank_US_Fetch",
            payload: fetchJsonp("http://localhost:3000/top/list?idx=6")
              .then(response => {
                return response.json();
              })
              .then(json => {
                return json;
              })
          });

        //fetch French周榜
        store.dispatch({
            type: "rank_French_Fetch",
            payload: fetchJsonp("http://localhost:3000/top/list?idx=19")
              .then(response => {
                return response.json();
              })
              .then(json => {
                return json;
              })
          });

        //fetch iTunes周榜
        store.dispatch({
            type: "rank_iTunes_Fetch",
            payload: fetchJsonp("http://localhost:3000/top/list?idx=8")
              .then(response => {
                return response.json();
              })
              .then(json => {
                return json;
              })
          });
        
        //fetch Beatport周榜
        store.dispatch({
            type: "rank_Beatport_Fetch",
            payload: fetchJsonp("http://localhost:3000/top/list?idx=21")
              .then(response => {
                return response.json();
              })
              .then(json => {
                return json;
              })
          });

        //fetch Oricon周榜
        store.dispatch({
            type: "rank_Oricon_Fetch",
            payload: fetchJsonp("http://localhost:3000/top/list?idx=10")
              .then(response => {
                return response.json();
              })
              .then(json => {
                return json;
              })
          });
        
        //fetch Hit周榜
        store.dispatch({
            type: "rank_Hit_Fetch",
            payload: fetchJsonp("http://localhost:3000/top/list?idx=9")
              .then(response => {
                return response.json();
              })
              .then(json => {
                return json;
              })
          });
        
        //fetch KTV周榜
        store.dispatch({
            type: "rank_KTV_Fetch",
            payload: fetchJsonp("http://localhost:3000/top/list?idx=7")
              .then(response => {
                return response.json();
              })
              .then(json => {
                return json;
              })
          });
        
        //fetch Hito周榜
        store.dispatch({
            type: "rank_Hito_Fetch",
            payload: fetchJsonp("http://localhost:3000/top/list?idx=20")
              .then(response => {
                return response.json();
              })
              .then(json => {
                return json;
              })
          });
        
        //fetch TopHK周榜
        store.dispatch({
            type: "rank_TopHK_Fetch",
            payload: fetchJsonp("http://localhost:3000/top/list?idx=14")
              .then(response => {
                return response.json();
              })
              .then(json => {
                return json;
              })
          });

        //fetch Top周榜
        store.dispatch({
            type: "rank_Top_Fetch",
            payload: fetchJsonp("http://localhost:3000/top/list?idx=15")
              .then(response => {
                return response.json();
              })
              .then(json => {
                return json;
              })
          });

        //fetch HKRadio周榜
        store.dispatch({
            type: "rank_HKRadio_Fetch",
            payload: fetchJsonp("http://localhost:3000/top/list?idx=16")
              .then(response => {
                return response.json();
              })
              .then(json => {
                return json;
              })
          });

        //fetch Hiphop周榜
        store.dispatch({
            type: "rank_Hiphop_Fetch",
            payload: fetchJsonp("http://localhost:3000/top/list?idx=18")
              .then(response => {
                return response.json();
              })
              .then(json => {
                return json;
              })
          });
    }
    render(){
        return(
            <div style={{padding: '0px 30px 30px 30px',overflow:'hidden',}} >
               <div style={{width:800}} className='clearfix' >
                      <RankUK  name='UK排行榜' />  
                      <RankUS  name='美國Billboard周榜' />
                      <RankFrench  name='法國NRJ Vos Hits周榜' />
                      <RankiTunes  name='iTunes榜' />
                      <RankBeatport  name='Beatport全球電子舞曲' />
                      <RankOricon  name='日本Oricon周榜' />
                      <RankHit  name='Hit FM Top榜' />
                      <RankKTV  name='KTV麦榜' />
                      <RankHito  name='台榜Hito排行榜'/>
                      <RankTopHK   name='中國Top排行榜（港台榜)' />
                      <RankTop  name='中國Top排行榜（內地榜)'/>
                      <RankHKRadio  name='香港電台中文歌曲龍虎榜' />
                      <RankHiphop  name='中國嘻哈榜' />
               </div>
            </div>
        )
    }
}

