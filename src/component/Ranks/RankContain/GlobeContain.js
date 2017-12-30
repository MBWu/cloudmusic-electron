import React, { Component } from "react";
import {Link} from 'react-keeper';

import styles from '../../../App.css';
import listen from "../../../images/listen.png";
import wait from "../../../images/wait.png";


export default class RankGlobeContain extends Component {
  clickUploadRankData(){
    // store.dispatch({
    //   type: 'songListDetail_add',
    //   payload: this.props.fetchData
    // })
  }

  render() {
    
    return (
      <div className='GlobeContain_WrapBox' onClick={this.clickUploadRankData.bind(this)}>
          <div
            className='GlobeContain_Contain'
          >

          {
            //fetch
          }
          {this.props.isFetching ? <GlobeContainWait /> : (
            <div>
            
            
            {this.props.error ? 
              <div
              style={{

                height:150,
                lineHeight:'150px',
                textAlign:'center',
                border:'1px solid rgba(0,0,0,.3)'
              }}
              >error</div>: (
              
              <Link type='div' to={`/home/rankdetail/${this.props.fetchData.result.id}/songlist`} >
  
              {
                //封面
              }
              <img alt='' style={{ width: 150, height: 150 }} src={this.props.fetchData.result.coverImgUrl} />
              <div
                className='GlobeContain_Infomation'
              >
  
              {
                //播放数量
              }
                <div
                  className='GlobeContain_TopBanner'>
                  <img alt='' src={listen} style={{ width: 14, height: 14,paddingRight: 10,position:'relative',top:'2px', }} />
                  {this.props.fetchData.result.playCount > 100000 ? `${this.props.fetchData.result.playCount}`.slice(0,`${this.props.fetchData.result.playCount}`.length-4)+' 万': this.props.fetchData.result.playCount}
                </div>
              </div>
              <div style={{ width: 150, fontSize: 14, height: 40 }}>
              {this.props.fetchData.result.name}
              </div>
              </Link>

            )}
            
            </div>
          )}
          </div>

        
      </div>
    );
  }
}

const GlobeContainWait = props => {
  return (
      <div
        className='GlobeContain_Wait_WrapBox'
      >
        <img
          alt=''
          className='PageLoading GlobeContain_Wait_WrapImg'
          src={wait}
        />
      </div>
  );
};
