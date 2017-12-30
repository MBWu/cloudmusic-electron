import React, { Component } from "react";
import { CacheLink } from "react-keeper";
import { connect } from "react-redux";
import "whatwg-fetch";
import fetchJsonp from "fetch-jsonp";
import classNames from "classnames/bind.js";

import { store } from "../store.js";
import styles from "../../App.css";
import load from '../../images/load.png';
import user from "../../images/user.png";
import play from '../../images/Play Icon.png';

class ListUI extends Component {
  componentDidUpdate() {
    if (
      this.props.isBottom &&
      this.props.pathname.indexOf("/home/found/songlist") !== -1
    ) {
      store.dispatch(dispatch => {
        dispatch({
          type: "songList_Upload_Fetch",
          payload: fetchJsonp(
            `http://localhost:3000/top/playlist?limit=16&offset=${this.props
              .nextPage * 16}`
          )
            .then(response => {
              return response.json();
            })
            .then(json => {
              return json.playlists;
            })
        });
        dispatch({
          type: "isBottom_N"
        });
      });
    }
  }

  render() {
    return (
      <div style={{ width: 740, overflow: "hidden" }}>
        {this.props.isFetching ? (

          <div
            style={{ height: 540, lineHeight: "540px", textAlign: "center" }}
          >
            {
              //加载
            }
            <img src={load} className='PageLoading' />
          </div>

        ) : (
          <div className="clearfix" style={{ width: 800 }}>

            {this.props.error ? (
              <div
                style={{
                  height: 406,
                  lineHeight: "540px",
                  textAlign:'center',
                }}
              >
                服务器好像跪了 ˜-_-˜
              </div>

            ) : (

              <div>
                <div>
                  {this.props.fetchData.playlists.map((value, index) => {
                    return <Item key={index} data={value} />;
                  })}
                </div>
                {
                  //当dispatch upload的type 后  显示该盒子，upload完成后隐藏
                }
                <div style={{ textAlign: "center" }}>

                {
                  //到达底部加载
                }
                  {this.props.isUploading ? <img src={load} className='PageLoading'/> : null}
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    );
  }
}

const mapStateToProps = state => {
  return { ...state.songList, ...state.isBottom };
};

const mapDispatchToProps = dispatch => {
  return {};
};

const List = connect(mapStateToProps, mapDispatchToProps)(ListUI);

class Item extends Component {

  render() {
    return (
      <div className="Songlist_List_Item_BoxWrap">
      
        <CacheLink
          type="div"
          to={`/home/songlistdetail/${this.props.data.id}/songlist`}
        > 
       
          <div style={{ position: "relative", height: 150 }}>

          {
            //顶部播放量
          }
            <div className="Songlist_List_Item_TopBanner Songlist_List_Item_Banner">
              {this.props.data.playCount > 100000 ? (
                `${this.props.data.playCount}`.substring(
                  0,
                  `${this.props.data.playCount}`.length - 4
                ) + "万"
              ) : (
                this.props.data.playCount
              )}
            </div>

            {
              //底部用户
            }
            <div className="Songlist_List_Item_Banner Songlist_List_Item_BottomBanner">
              <img
                src={user}
                className='Songlist_List_Item_UserImg'
                />

                {
                  //悬停时的播放按钮
                }
              <div className='Songlist_List_Item_PlayBtn' >
                <span className='Songlist_List_Item_Cir'>
                  <img src={play} />
                </span>
              </div>
              {" "}
              {this.props.data.creator.nickname}
            </div>

            {
              //歌单封面
            }
            <img
              style={{ width: 150, height: 150 }}
              src={this.props.data.coverImgUrl}
            />
          </div>

          {
            //歌单名字
          }
          <p className='Songlist_List_Item_UserName' >
            {this.props.data.name}
          </p>
        </CacheLink>
      </div>
    );
  }
}

export default List;
