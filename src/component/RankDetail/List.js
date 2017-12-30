import React, { Component } from "react";
import classNames from 'classnames/bind.js';

import {store} from '../store.js';
import styles from "../../App.css";
import love from "../../images/love.png";
import unlove from "../../images/unlove.png";
import download from "../../images/download.png";

let cx = classNames.bind(styles);

export default class List extends Component {
  constructor(props){
    super(props);
    this.state = {
      activeItem:null,
    }
  }
  onClickToActive(num){//点击item 激活该item显示背景颜色
    this.setState({
      activeItem:num
    })
  }
  render() {
    return (
      <div>
        <ul>
          {this.props.data.playlist.tracks.map((value, index) => {
              return <Item key={index} data={value} index={index} activeItem={this.state.activeItem} onClickToActive={this.onClickToActive.bind(this)} />;
          })}
        </ul>
      </div>
    );
  }
}

const Item = props => {
  let min = Math.floor(props.data.dt/1000/60);
  min = min<10?`0${min}`:min;
  let sec = Math.floor(props.data.dt/1000%60);
  sec = sec<10?`0${sec}`:sec;


  let Item = cx({
    Rank_List_DoubleItem: props.index%2 ===0,
    Rank_List_Item_Active:props.index === props.activeItem,
  })


  let doubleClickToPlay=async (itemData)=>{ //将双击的item 插入歌单列表
   await store.dispatch({
      type: 'songPlayer_Insert',
      payload : itemData
    });

    props.onClickToActive(null);
  }

  

  return (
    <li className={Item} 
    onClick={()=>{
      props.onClickToActive(props.index);
    }}
    onDoubleClick={()=>{
      doubleClickToPlay(props.data);
    }}
    >
    <div
      className='clearfix Rank_List_Item_WrapBox'>
      <div style={{height:30}} >

        {
          //歌曲的排序
        }
        <span className='Rank_List_Item_Index'>
          {props.index + 1 < 10 ? `0${props.index + 1}` : `${props.index + 1}`}
        </span>

        {
          //上升或者下降样式，没有找到对应数据
        }
        <span
          style={{
            float:'left',
            width: 12,
            fontSize: 12,
            color: "#8C8C8C"
          }}
        >
          -
        </span>

        {
          //是否喜爱和下载
        }
        <div className='Rank_List_Item_InterBox'>
          <img
            style={{ width: 18, height: 17, marginTop: 6, marginRight: 7 }}
            src={unlove}
          />
          <img style={{ width: 18, height: 17 }} src={download} />
        </div>

        {
          //歌曲名字
        }
        <div
          className="clearfix Rank_List_Item_Name">
          <span>{props.data.name}</span>
        </div>

        {
          //歌曲作者
        }
        <div
          className="clearfix Rank_List_Item_Artists">
          <span>
            {props.data.ar.map((value, index) => {
              if(index){
                return `,${value.name}`;
              }else{
                return `${value.name}`;
              }
            })}
          </span>
        </div>

        {
          //歌曲属于哪一个专辑
        }
        <div
          className="clearfix Rank_List_Item_Album">
          <span>{props.data.al.name}</span>
        </div>

        {
          //时长
        }
        <span className='Rank_List_Item_Duration'>
        {`${min}:${sec}`}
        </span>
      </div>
    </div>
    </li>
  );
};
