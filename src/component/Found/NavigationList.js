import React, { Component } from "react";
import {Link} from 'react-keeper';
import { connect } from 'react-redux';

import {store} from '../store.js';
import classNames from 'classnames/bind';
import styles from '../../App.css';

let cx = classNames.bind(styles);

const navigationList = [{name:"推荐",url:'rcm',active:'rcm'}, {name:"排行榜",url:'rank/official',active:'rank'}, {name:"歌单",url:'songlist',active:'songlist'}, {name:"主播电台",url:'radio',active:'radio'}, {name:"最新音乐",url:'newmusic/newsong',active:'newmusic'}];



class NavigationList extends Component{
  
 
  componentWillMount(){
    
        this.refreshWebToChangeActiveLink();
    
  }

  onClickToActiveLink(link){ //点击更新激活Link
    
    this.props.dispatch({
      type: `navigationBar_${link}`
    })
  }

  refreshWebToChangeActiveLink(){ //刷新网页后保证导航栏激活的Link 和 当前网址一致
    const hash = window.location.hash;
 
    if( hash.includes('/home/found/rcm') ){
       
        this.props.dispatch({
          type: 'navigationBar_rcm'
        });
    }else if( hash.includes('/home/found/songlist') ){

      this.props.dispatch({
        type: 'navigationBar_songlist'
      });

    }else if( hash.includes('/home/found/radio') ){

      this.props.dispatch({
        type: 'navigationBar_radio'
      });

    }else if( hash.includes('/home/found/newmusic') ){

      this.props.dispatch({
        type: 'navigationBar_newmusic'
      });

    }else {

      this.props.dispatch({
        type: 'navigationBar_rank'
      });

    }
  }
  render(){
     let NavigationListUl = cx({
       NavigationList_Ul:true,
     })
    return(
      <div>
      <ul
        className={NavigationListUl}
      >
        {navigationList.map((value, index) => {
          return (
            <LinkItem onClickToActiveLink={this.onClickToActiveLink.bind(this)} activeLink={this.props.activeLink}  key={index} value={value} /> 
          );
        })}
      </ul>
    </div>
    )
  }
}



class LinkItem extends Component{
  render(){
    let LinkItemLi = cx({
      NavigationList_LinkItem_Li :true
    })
    
    let LinkItemActiveLink = cx({
      NavigationList_LinkItem_ActiveLink: this.props.value.active === this.props.activeLink,
    })
    
    return(
      <li
      className={LinkItemLi}
      onClick={()=>{

        this.props.onClickToActiveLink(this.props.value.active);
      }}
      
    >
    
      <Link className={LinkItemActiveLink} to={`/home/found/${this.props.value.url}`} >{this.props.value.name}</Link>
    </li>
    )
  }
}

const mapStateToProps = state =>({
  activeLink: state.navigationBar.activeLink
})

export default connect( mapStateToProps )(NavigationList);