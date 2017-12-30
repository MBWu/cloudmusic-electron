import React, { Component } from "react";
import {Link} from 'react-keeper';

import {store} from '../../store.js';
import styles from '../../../App.css';
import load from '../../../images/load.png';

export default class RCMRadio extends Component {
  render() {
    return (
      <div>
        <div className='Radio_RCMRadio_Title'>
          优秀新电台
        </div>
        <div className='Radio_RCMRadio_Content' >
          <div className="clearfix" style={{paddingTop:20, width: 760 }}>
            {this.props.data.isFetching ? (
              <div style={{ height: 196, textAlign: "center" }}>

              {
                //加载中
              }
              <img alt='' src={load} className='PageLoading' />

              </div>
            ) : (
              <div>
                {this.props.data.error ? (
                  <div style={{ height: 196, textAlign: "center" }}>
                  服务器好像跪了 ˜-_-˜
                  </div>
                ) : (
                  <div>
                    {this.props.data.fetchData.djRadios.map(
                      (value, index) => {
                        return index < 5 ? (
                          <Item value={value} key={index} />
                        ) : null;
                      }
                    )}
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    );
  }
}


const Item = props => {
    return (
      <div className='Radio_RCMRadio_Item_WrapBox' 
        onClick={()=>{
          store.dispatch({
            type:'isBottom_clearPage'
          })
        }}
      >
      <Link type='div' style={{cursor:'pointer'}} to={`/home/radioProgramsDetail/${props.value.id}`}>

        {
          //电台封面
        }
        <div>
          <img alt='' style={{ width: 140, height: 140 }} src={props.value.picUrl} />
        </div>

        {
          //电台信息
        }
        <p className='Radio_RCMRadio_Item_Name'>
          {props.value.name}
        </p>
        <p className='Radio_RCMRadio_Item_Rcmdtext' >{props.value.rcmdtext}</p>
        </Link>
      </div>
    );
  };