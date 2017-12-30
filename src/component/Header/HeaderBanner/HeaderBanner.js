import React , {Component} from 'react';
import {Link} from 'react-keeper';
import 'whatwg-fetch';
import fetchJsonp from 'fetch-jsonp';
import {connect} from 'react-redux';

import {store} from '../../store.js';
import cloudLogo from '../../../images/cloudLogo.png';
import UserLog from './UserLog.js';

export default class HeaderBanner extends Component {

    _clickLogoToHome = () =>{

      store.dispatch({
        type: 'navigationBar_rank'
      });
    }
    render() {
      return (
        <div
          className="HeaderBanner_WrapBox clearFix "
        >

        {
          //logo
        }
          <div
            className="HeaderBanner_Logo"
            style={{backgroundImage: ` url(${cloudLogo}) `}}
            onClick = {
              this._clickLogoToHome.bind( this )
            }
          >
            <Link to="/home/found/rank/official">
              <span
                className='HeaderBanner_Name'
              >
                网易云音乐
              </span>
            </Link>
          </div>


          {
            //history返回前进盒子
          }
          <div className='HeaderBanner_Nav' >
            <span
              className = 'HeaderBanner_Nav_Key'
              onClick = {
                ()=>{

                  window.history.back();
                }
              }
            >
              {'<'}
            </span>
            <span
            className = 'HeaderBanner_Nav_Key'
            onClick = {
              ()=>{

                window.history.forward();
              }
            }
          >
            {'>'}
          </span>
          </div>


          {
            //搜索
          }
          <Search />

          {
            //用户登录
          }
          <UserLog />
        </div>
      );
    }
  }

  const Search = props => {

    return (
      <div
      className='HeaderBanner_SearchBox'
    >

      <input
        type="search"
        className='HeaderBanner_Search'
      />
      <span />
      <div className="searchResult" />
    </div>
    )

  }




