import React, { Component } from "react";
import { Link } from "react-keeper";
import classNames from "classnames/bind.js";

import styles from "../../App.css";
import {store} from '../store.js';
import add from '../../images/add.png';
import play from '../../images/play_#D90000.png';

let cx = classNames.bind(styles);

const someRoute = [
  { name: "歌曲列表", url: "songlist", index: true },
  { name: "評論", url: "reviews" },
  { name: "收藏者", url: "favoriter" }
];



const LeftSide = props => {
  return (
    <div className="leftside" style={{ float: "left" }}>

    {
      //歌单封面
    }
      <img
        className="RankInfo_LeftSide_Img"
        src={props.data.playlist.coverImgUrl}
      />
    </div>
  );
};




const RightSide = props => {
  return (
    <div
      className="rightside"
      style={{ float: "left", paddingTop: 3, maxWidth: 525 }}
    >
      <div className="RankInfo_RightSide_ContainBox">
        <span className="RankInfo_RightSide_ListType">歌单</span>
        <span style={{ fontSize: 22 }}>{props.data.playlist.name}</span>
      </div>
      <div className="clearfix" style={{ height: 32, marginBottom: 30 }}>
        <span className="RankInfo_RightSide_AvatarImg">
          <img
            style={{ width: 32, height: 32 }}
            src={props.data.playlist.creator.avatarUrl}
          />
        </span>
        <span className="RankInfo_RightSide_CreatorNickname">
          {props.data.playlist.creator.nickname}
        </span>
        <span className="RankInfo_RightSide_LastUpTime">最后更新时间：</span>
      </div>
      <FuncBar data={props.data} />
      <SonglistTagAndDes pathname={props.pathname} tags={props.data.playlist.tags} description={props.data.playlist.description} />
    </div>
  );
};

class FuncBar extends Component{
  ClickToPlayAll(){ //播放全部
    store.dispatch({
      type:'songPlayer_PlayAll',
      payload :this.props.data.playlist.tracks
    });
  }
  ClickToAddAll(){ //添加全部
    store.dispatch({
      type:'songPlayer_AddAll',
      payload: this.props.data.playlist.tracks
    });
  }
  render(){
    return(
      <div className="clearfix" style={{ height: 30, lineHeight: "30px" }}>
        <div className="RankInfo_FuncBar_PlayAllWrapBox clearfix">
          <a className='RankInfo_FuncBar_Play'
            onClick={this.ClickToPlayAll.bind(this)}
          >
            <span className="RankInfo_FuncBar_PlayImg" style={{backgroundImage:`url(${play})`}} >
            </span>
            <span className="RankInfo_FuncBar_PlayFont">播放全部</span>
          </a>
          
          <a className='RankInfo_FuncBar_AddImg' style={{backgroundImage:`url(${add})`}} 
            onClick={this.ClickToAddAll.bind(this)}
          >
          </a>
        </div>
        <a className="RankInfo_FuncBar_Subscribed">
          <span>收藏({this.props.data.playlist.subscribedCount})</span>
        </a>
        <a className="RankInfo_FuncBar_Subscribed">
          <span>分享({this.props.data.playlist.shareCount})</span>
        </a>
        <a className="RankInfo_FuncBar_Subscribed">
          <span>下载全部</span>
        </a>
      </div>
    )
  }
}



class SonglistTagAndDes extends Component{
  constructor(props){
    super(props);
    this.state = {
      descriptionState:'short',
      showDiscription: false
    }
  }
  componentDidMount(){
    //如果简介盒子的高度大于100则定义为过长
    if(this.description.offsetHeight>100){
      this.setState({
        descriptionState:'long'
      })
    }
  }
  ClickToShow(){
    //通过点击改变状态，然后再根据状态改变简介盒子的类名
    this.setState((prev)=>{
      return {
        showDiscription:!prev.showDiscription
      }
    })
  }
  render(){

    //如果简介过长，descriptionState = 'long'
    //当点击箭头后，showDiscription会等于前一个状态的相反值，如果为true时，去掉overflow
    let descriptionClassname=cx({
      RankInfo_SonglistTagAndDes_Description:true,
      RankInfo_SonglistTagAndDes_Description_Long:this.state.descriptionState === 'long',
      RankInfo_SonglistTagAndDes_Description_Long_Active: this.state.showDiscription
    })
    let clickShowClassname = cx({
      RankInfo_SonglistTagAndDes_Description_ClickShow:true,
      RankInfo_SonglistTagAndDes_Description_ClickShow_Active:this.state.showDiscription
    })
    return(
      <div  style={{ marginTop: 18, fontSize: 12 }}>
      {this.props.pathname.indexOf('/home/songlistdetail') !==-1?
        <div className='clearfix' style={{marginBottom:10}} >
          <span className='RankInfo_SonglistTagAndDes_Labe'>标签：</span>
          {this.props.tags.map((value,index)=>{
            return (
              <span key={index} className='RankInfo_SonglistTagAndDes_Tags' >{value} {index ===this.props.tags.length-1? null:'/'}</span>
            )
          })}
        </div>:null
      }
      <div className='clearfix' >
        <span className='RankInfo_SonglistTagAndDes_Des'>簡介：</span>
        {
          //根据url的不同选择简介不同的显示方式
          //然后在判断简介是否过长，选择是否隐藏部分简介并且提供显示全部简介的箭头
        }
        {this.props.pathname.indexOf('/home/songlistdetail') !== -1?
        <pre className={descriptionClassname} ref={(input) => { this.description = input; }} >{this.props.description}</pre>:
        <p className={descriptionClassname} ref={(input) => { this.description = input; }} >{this.props.description}</p>
        }
        {
          //箭头点击事件
        }
        {this.state.descriptionState === 'long'?<div className={clickShowClassname} onClick={this.ClickToShow.bind(this)} ><span></span></div>:null}
      </div>
    </div>
    )
  }
}

class RouteLinks extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activeLink: "songlist"
    };
  }
  onClickToActive(active) {
    this.setState({
      activeLink: active
    });
  }
  render() {
    return (
      <div style={{ position: "absolute", bottom: 0, left: 30 }}>
        <ul>
          {someRoute.map((value, index) => {
            return (
              <LinkItem
                key={index}
                pathname={this.props.pathname}
                value={value}
                activeLink={this.state.activeLink}
                onClickToActive={this.onClickToActive.bind(this)}
              />
            );
          })}
        </ul>
      </div>
    );
  }
}

const LinkItem = props => {
  //点击过后将自身url传递到上层，上层改变激活的链接，然后再在这里判断该组件的url是否为激活的链接。
  let RankInfo_RouteLinks_Link = cx({
    RankInfo_RouteLinks_Link: true,
    RankInfo_RouteLinks_Link_Active: props.value.url === props.activeLink
  });
  return (
    <li
      className={RankInfo_RouteLinks_Link}
      onClick={() => {
        props.onClickToActive(props.value.url);
      }}
    >
      <Link key={props.index} to={`${props.pathname}/${props.value.url}`}>
        {props.value.name}
      </Link>
    </li>
  );
};

export default class RankInfo extends Component {
  render() {
    return (
      <div style={{ backgroundColor: "rgb(200, 225, 230)" }}>
        <div className="clearfix RankInfo_WrapBox">
          <div>

          {
            //左侧组件
          }
            <LeftSide data={this.props.data} />

            {
              //右侧组件
            }
            <RightSide pathname={this.props.pathname} data={this.props.data} />
          </div>
          <RouteLinks pathname={this.props.pathname} />
        </div>
      </div>
    );
  }
}