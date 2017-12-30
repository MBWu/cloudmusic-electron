import React, { Component } from "react";
import { connect } from "react-redux";
import "whatwg-fetch";
import fetchJsonp from "fetch-jsonp";

import styles from '../../App.css';
import { store } from "../store.js";
import RadioDetailInfo from "./RadioDetailInfo.js"; //电台信息组件
import RadioDetailPrograms from "./RadioDetailPrograms.js"; //电台节目组件
import load from '../../images/load.png'; //加载png

class RadioDetailUI extends Component {
  
  constructor(props) {
    super(props);

    this.fetchRadioInfo();
    
    this.fetchRadioPrograms();
    
  } 

  componentDidUpdate() {

    
    this.fetchUploadRadioPrograms();
  }

  fetchRadioInfo(){ //获取电台信息

    store.dispatch({
      type: "radioDetailInfo_Fetch",
      payload: fetchJsonp(
        `http://localhost:3000/dj/detail?rid=${this.props.params.id}`,{
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

  fetchRadioPrograms(){ //获取电台节目

    store.dispatch({
      type: "radioDetailPrograms_Fetch",
      payload: fetchJsonp(
        `http://localhost:3000/dj/program?rid=${this.props.params
          .id}&limit=10&offset=${this.props.nextPage * 10}`,{
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

  fetchUploadRadioPrograms(){ //到达页面底部加载电台节目

    //到达页面底部，且位于radio详情时
    if (this.props.isBottom && this.props.pathname.indexOf('/home/radioProgramsDetail') !==-1) {

      store.dispatch(dispatch => {

        dispatch({
          type: "radioDetailPrograms_Upload_Fetch",
          payload: fetchJsonp(
            `http://localhost:3000/dj/program?rid=${this.props.params
              .id}&limit=10&offset=${this.props.nextPage * 10}`
          )
            .then(response => {
              return response.json();
            })
            .then(json => {
              return json;
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
      <div>
        <div>
          <div>
            {this.props.data.radioDetailInfo.isFetching || this.props.data.radioDetailPrograms.isFetching ? (
              <div
                style={{
                  height: 277,
                  textAlign: "center",
                  lineHeight: "277px"
                }}
              >
                <img src={load} className='PageLoading' />
              </div>
            ) : (
              <div>
                {this.props.data.radioDetailInfo.error || this.props.data.radioDetailPrograms.error ? (
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
                    //电台的详细信息
                  }
                    <RadioDetailInfo
                    djRadio={this.props.data.radioDetailInfo.fetchData.djRadio}
                    tracks={ this.props.data.radioDetailPrograms.fetchData}
                    />


                    {
                      //电台的节目
                    }
                    <RadioDetailPrograms
                      data={this.props.data.radioDetailPrograms}
                    />
                  </div>
                )}
              </div>
            )}
          </div>
          <div />
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    data: {
      radioDetailInfo: state.radioDetailInfo,
      radioDetailPrograms: state.radioDetailPrograms
    },
    ...state.isBottom
  };
};

const mapDispatchToProps = dispatch => {
  return {};
};

const RadioDetail = connect(mapStateToProps, mapDispatchToProps)(RadioDetailUI);

export default RadioDetail;
