import React, { Component } from "react";
import { Route } from "react-keeper";
import "whatwg-fetch";
import fetchJsonp from "fetch-jsonp";

import { store } from "../store.js";

import "../../App.css";
import load from '../../images/load.png';
import RankInfo from "./RankInfo.js";
import List from "./List.js";
import Reviews from "./Reviews.js";
import Favoriter from "./Favoriter.js";

export default class RankDetailUI extends Component {
 
  constructor(props) {
    super(props);
  }

  componentDidMount(){


    this.historyGoBackToClearData();
    
    this.fetchSongListDetail(this.props.params.id);
  }
  
 async componentWillReceiveProps(nextProps){

    const hash = window.location.hash

    if(nextProps.params.id !== this.props.params.id && hash.includes('/home/songlistdetail') ){ 


     await store.dispatch({
        type: 'songListDetail_Recover'
      });

      this.fetchSongListDetail(nextProps.params.id);

    }

  }

      
  historyGoBackToClearData(){  //如果通过history对象的方法退回，或者前进，而不是卸载改组件，则手动清空fetch数据 

    if (window.history && window.history.pushState) { 

      window.addEventListener('popstate',()=>{
        store.dispatch({
          type:'songListDetail_Recover'
        });
      });
    }

  }

  fetchSongListDetail(id){
    
        store.dispatch({
          type: "songListDetail_Fetch",
          payload: fetchJsonp(
            `http://localhost:3000/playlist/detail?id=${this.props.params.id}`,{
              timeout: 10000
            }
          )
            .then(response => {
              return response.json();
            })
            .then(json => {
              return json;
            })
        });
    
      }

  render() {
    return (
      <div>
        <div>
          {this.props.isFetching ? (
            <div
              style={{ height: 540, textAlign: "center", lineHeight: "540px" }}
            >
              {
                //加载中
              }
              <img src={load} className='PageLoading' />
            </div>
          ) : (
            <div>
              {this.props.error ? (

                <div
                  style={{
                    height: 540,
                    textAlign: "center",
                    lineHeight: "540px"
                  }}
                >
                  服务器好像跪了 ˜-_-˜
                </div>
              ) : (

                <div>
                
                  {
                    //歌单信息
                  }
                  <RankInfo
                    data={this.props.data}
                    pathname={this.props.pathname}
                  />
                  <div>

                    {
                      //歌曲列表
                      //评论
                      //收藏
                    }
                    <Route
                      cache
                      data={this.props.data}
                      index
                      path="/songlist"
                      component={List}
                    />
                    <Route path="/reviews" component={Reviews} />
                    <Route path="/favoriter" component={Favoriter} />
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    );
  }
}
