import React, { Component } from "react";
import classNames from 'classnames/bind.js';

import {store} from '../store.js';
import styles from  "../../App.css";
import play from "../../images/Play Icon.png"; 
import play2 from "../../images/play2.png";
import good from "../../images/good.png";
import load from '../../images/load.png';

let cx = classNames.bind(styles);

export default class RadioDetailPrograms extends Component {
  constructor(props){
    super(props);

    this.state = {
      activeLink : ''
    }
  }
  clickToActiveLink(active){
    
    this.setState({
      activeLink : active
    });

  }
  render() {
    return (
      <div>
        {this.props.data.isFetching ? (
          
          <div
            style={{ height: 277, textAlign: "center", lineHeight: "277px" }}
          >

          {
            //加载
          }
            <img src={load} className='PageLoading' />
          </div>

        ) : (

          <div>
            {this.props.data.error ? (

              <div
                style={{
                  height: 277,
                  textAlign: "center",
                  lineHeight: "277px"
                }}
              >

                服务器好像跪了 ˜-_-˜
              </div>

            ) : (

              <div>

                {
                  //期数统计
                }
                <div className='RadioDetail_RadioDetailPrograms_TopBanner'>
                  共 {this.props.data.fetchData.count} 期
                </div>

                {
                  //item
                }
                <div style={{ backgroundColor: "#FAFAFA" }}>
                  {this.props.data.fetchData.programs.map((value, index) => {
                    return <Item key={index} index={index} programData={value} activeLink={this.state.activeLink} clickToActiveLink={this.clickToActiveLink.bind(this)} />;
                  })}
                </div>

                {this.props.data.isUploading ? (
                  <div style={{ textAlign: "center", fontSize: 12 }}>
                    加载中。。。
                  </div>
                ) : null}
              </div>

            )}
          </div>
        )}
      </div>
    );
  }
}


class Item extends Component{

  doubleClickToInsertSongList(){ //双击添加进歌单列表

    const itemData = this.dealWithDoubleClickItem(this.props.programData);
    
    store.dispatch({
      type:'songPlayer_Insert',
      payload: itemData
    })

  }

  dealWithDoubleClickItem(itemData){ //对双击的item数据进行处理

    const newData = {
      al: {
        id:itemData.mainSong.album.id,
        name: itemData.mainSong.album.name,
        pic: itemData.mainSong.album.pic,
        picUrl: itemData.mainSong.album.picUrl
      },
      name: itemData.mainSong.name,
      id: itemData.mainSong.id,
      dt: itemData.mainSong.duration,
      ar:[]
    }

    itemData.mainSong.artists.map((value,index) =>{
      const artist ={
        id: value.id,
        name : value.name
      }

      newData.ar.push(artist);

    });

    return newData;
  }

  render(){

      //分钟数
    let min = Math.floor(this.props.programData.duration / 1000 / 60);
    min < 10 ? (min = "0" + min) : null;

    //秒钟数
    let sec = Math.floor((this.props.programData.duration / 1000) % 60);
    sec < 10 ? (sec = "0" + sec) : null;

    //时间戳
    let date = new Date(this.props.programData.createTime);

    //Item的样式
    const ItemClassNames = cx({
      clearfix: true,
      RadioDetail_RadioDetailPrograms_Item: true,
      RadioDetail_RadioDetailPrograms_Item_Single: this.props.index %2 !==0 , //单数item 的样式
      RadioDetail_RadioDetailPrograms_Item_Active: this.props.activeLink === this.props.index, //激活时的样式
    })

    return (
      <div
        className={ItemClassNames}

        onClick ={
          () =>{
            this.props.clickToActiveLink(this.props.index);
          }
        }

        onDoubleClick={
          this.doubleClickToInsertSongList.bind(this)
        }
        >

        {
          //第几期
        }
        <span style={{ float: "left", marginRight: 20 }}>
          {this.props.programData.serialNum}
        </span>

        {
          //每期封面图
        }
        <div className='RadioDetail_RadioDetailPrograms_Item_Album'>
          <img
            src={this.props.programData.mainSong.album.picUrl}
            style={{ width: 40, height: 40 }}
          />
          <span className='RadioDetail_RadioDetailPrograms_Item_PlayBox' >
            <img
              src={play}
              className='RadioDetail_RadioDetailPrograms_Item_PlayIcon'
            />
          </span>
        </div>

        {
          //每期名字
        }
        <div style={{ float: "left", marginRight: 30 }}>
          <div className='RadioDetail_RadioDetailPrograms_Item_Name' >
            <span>{this.props.programData.mainSong.name}</span>
          </div>
        </div>

        {
          //播放数量
        }
        <div className='RadioDetail_RadioDetailPrograms_Item_PlayBox2'>
          <img
            src={play2}
            className='RadioDetail_RadioDetailPrograms_Item_PlayIcon2'
          />
          <span>{this.props.programData.listenerCount}</span>
        </div>

        {
          //点赞数量
        }
        <div className='RadioDetail_RadioDetailPrograms_Item_GoodBox' >
          <img
            src={good}
            className='RadioDetail_RadioDetailPrograms_Item_GoodIcon'
          />
          <span style={{lineHeight:'17px'}} > {this.props.programData.likedCount}</span>
        </div>

        {
          //上传时间
        }
        <div style={{ float: "left", marginRight: 45 }}>
          {`${date.getFullYear()}-${date.getMonth()}-${date.getDate()}`}
        </div>
        <div style={{ float: "left" }}>{min + ":" + sec}</div>
      </div>
    );

  }
}
