import React, { Component } from "react";
import "whatwg-fetch";
import fetchJsonp from "fetch-jsonp";

import styles from '../../../App.css';
import load from '../../../images/load.png';

export default class RecommandProgram extends Component {
  constructor(props) {
    super(props);
    this.state = {
      fetched: false,
      error: false,
      data: null
    };

    fetchJsonp("http://localhost:3000/program/recommend")
      .then(
        response => {
          return response.json();
        },
        error => {
          this.setState({
            fetched: true,
            error: true
          });
        }
      )
      .then(json => {
        if(!this.state.error){
          this.setState({
            fetched: true,
            error: false,
            data: json
          });
        }
      });
  }
  render() {
    return (
      <div>
          <div>
              <div>
                <div className='Radio_RecommandProgram_WrapBox'>
                  <div className='Radio_RecommandProgram_Title'>
                    推荐节目
                  </div>

                  {
                    //推荐节目盒子
                  }
                  <div className='Radio_RecommandProgram_ProgramBox'>
                    <div
                      className="clearfix"
                      style={{ paddingTop: 12, width: 760 }}
                    >
                    {this.state.fetched?
                      <div>
                        {this.state.error?
                          <div style={{height:224,lineHeight:'224px',textAlign:'center'}} >
                          服务器好像跪了 ˜-_-˜
                          </div>:
                          <div>

                            {this.state.data.programs.map((value,index)=>{
                              return <RecommandProgramItem key={index} value={value} />
                            })}

                          </div>
                        }
                      </div>:
                      <div style={{height:224,lineHeight:'224px',textAlign:'center'}} >
                        {
                          //加载中
                        }
                        <img src={load} className='PageLoading'  />
                     </div>
                    }
                    </div>
                  </div>
                </div>
              </div>
          </div>
      </div>
    );
  }
}

export const RecommandProgramItem = props => {
  return (
    <div className='Radio_RecommandProgram_ItemBox'>
    
      {
        //节目封面
      }
      <div className='Radio_RecommandProgram_ImgBox'>
        <img className='Radio_RecommandProgram_Img' src={props.value.coverUrl} />
      </div>

      {
        //节目信息
      }
      <div className='Radio_RecommandProgram_InfoBox'>
        <div className='Radio_RecommandProgram_Name'>{props.value.mainSong.name}</div>
        <div className='Radio_RecommandProgram_Reason'>{props.value.reason}</div>
      </div>
    </div>
  );
};
