import React, { Component } from "react";
import { Link } from "react-keeper";

import styles from  '../../App.css';
import {store} from '../store.js';

import add from '../../images/add.png';
import play from '../../images/play_#D90000.png';

export default class RadioDetailInfo extends Component {
  render() {
    return (
      <div style={{ backgroundColor: "rgb(200, 225, 230)" }}>
        <div
          className="clearfix RadioDetail_RadioDetailInfo_WrapBox">
          <div>
            <LeftSide djRadio={this.props.djRadio} />
            <RightSide djRadio={this.props.djRadio} tracks={this.props.tracks} />
          </div>
        </div>
      </div>
    );
  }
}

const LeftSide = (props) => {
  return (
    <div className="leftside" style={{ float: "left" }}>
      {
        //电台封面图
      }
      <img 
        className='RadioDetail_RadioDetailInfo_LeftSide_Img'
        src={props.djRadio.picUrl}
      />
    </div>
  );
};

const RightSide = (props) => {
  return (
    <div className="rightside" style={{ float: "left", paddingTop: 3,maxWidth:525 }}>

      {
        //电台名字
      }
      <div className='RadioDetail_RadioDetailInfo_RightSide_Img' >
        <span className='RadioDetail_RadioDetailInfo_RightSide_Title' >
          电台
        </span>
        <span style={{ fontSize: 22 }}>{props.djRadio.name}</span>
      </div>

      {
        //用户头像和名字
      }
      <div className="clearfix" style={{ height: 32, marginBottom: 30 }}>
        <span className='RadioDetail_RadioDetailInfo_RightSide_Avatar' >
          <img style={{ width: 32, height: 32 }} src={props.djRadio.dj.avatarUrl} />
        </span>
        <span className='RadioDetail_RadioDetailInfo_RightSide_Nickname'>
        {props.djRadio.dj.nickname}
        </span>
        
      </div>

      {
        //功能栏
      }
      <FuncBar djRadio={props.djRadio} tracks={props.tracks} />

      {
        //电台种类 和 电台描述
      }
      <div className='clearfix RadioDetail_RadioDetailInfo_RightSide_DesWrapBox'>
        <span className='RadioDetail_RadioDetailInfo_RightSide_Category'>{props.djRadio.category}</span>
        <span className='RadioDetail_RadioDetailInfo_RightSide_Desc' >{props.djRadio.desc}</span>
      </div>
    </div>
  );
};

const FuncBar = (props) => { //功能栏

  const dealWithTrackData = ( data )=>{
    
        const newData=[];
        let i =0,len=data.length;
    
        for(;i<len;i++){
    
          const newItem = {
            al: {
              id:data[i].mainSong.album.id,
              name: data[i].mainSong.album.name,
              pic: data[i].mainSong.album.pic,
              picUrl: data[i].mainSong.album.picUrl
            },
            name: data[i].mainSong.name,
            id: data[i].mainSong.id,
            dt: data[i].mainSong.duration,
            ar:[]
          }
    
          newData.push( newItem );
        }
    
        return newData;
    
      }
    
      const ClickToPlayAll = () => { //播放全部
    
        if ( props. tracks.programs ){
    
          store.dispatch({
            type:'songPlayer_PlayAll',
            payload : dealWithTrackData( props.tracks.programs)
          });
        }
        
      }
      const ClickToAddAll = () => { //添加全部
        
        if ( props. tracks.programs ){
      
            store.dispatch({
              type:'songPlayer_AddAll',
              payload : dealWithTrackData( props.tracks.programs)
            });
          }
      }
      
  return (
     
      <div className="clearfix RadioDetail_RadioDetailInfo_FunBar_WrapBox">
      
            {
              //订阅
            }
            <div className='RadioDetail_RadioDetailInfo_FunBar_SubBox'>
            <span>订阅({props.djRadio.subCount})</span>
            </div>
      
            {
              //播放全部
            }
            <div className="RankInfo_FuncBar_PlayAllWrapBox clearfix">
              <a className='RankInfo_FuncBar_Play'
                onClick={ClickToPlayAll.bind(this)}
              >
                <span className="RankInfo_FuncBar_PlayImg" style={{backgroundImage:`url(${play})`}} >
                </span>
                <span className="RankInfo_FuncBar_PlayFont">播放全部</span>
              </a>
              
              <a className='RankInfo_FuncBar_AddImg' style={{backgroundImage:`url(${add})`}} 
                onClick={ClickToAddAll.bind(this)}
              >
              </a>
            </div>
      
            {
              //分享
            }
            <div className='RadioDetail_RadioDetailInfo_FunBar_Share' >
              <span>分享({props.djRadio.shareCount})</span>
            </div>
          </div>
  );
};
