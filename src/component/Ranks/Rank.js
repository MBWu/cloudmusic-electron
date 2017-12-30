import React, { Component } from "react";
import {Route,Link} from 'react-keeper';
import classNames from 'classnames/bind.js';

import styles from '../../App.css';
import RankOfficial from './RankOfficial.js';
import RankGlobe from './RankGlobe.js';

let cx = classNames.bind(styles);

class LinkItem extends Component{
  render(){
    let LinkItem_Link = cx({
      Rank_LinkItem_Link:true,
      Rank_LinkItem_Link_Active: this.props.value.url === this.props.activeLink,
    })
    return (
      <li 
      onClick={()=>{
        this.props.onClickToActiveLink(this.props.value.url);
      }} 
      style={{display:'inline-block'}} >
        <Link  className={LinkItem_Link} to={`/home/found/rank/${this.props.value.url}`}>
          {this.props.value.name}
        </Link>
      </li>
      
    )
  }
}


export default class Rank extends Component {
  constructor(props){
    super(props);
    this.state ={
      activeLink: 'official'
    }
  }
  componentDidMount(){

    this.checkActiveLink();

  }
  onClickToActiveLink(link){
    this.setState({
      activeLink : link
    });
  }

  checkActiveLink(){ //刷新网页后保证激活的Link是正常的

    if(window.location.hash.includes('/home/found/rank/globe')){

      this.setState({
        activeLink: 'globe'
      });
    }

  }

  render() {
    let RankUl = cx({
      clearfix:true,
      Rank_Ul:true,
    })
    return (
      <div>
        <div className="navigator" style={{ height: 59 ,width: 740, padding: "0 0 0 30px"}}>
          <ul  
            className={RankUl}
          >
            {[{name:"官方榜",url:'official'}, {name:"全球榜",url:'globe'}].map((value, index) => {
              return (
                <LinkItem onClickToActiveLink={this.onClickToActiveLink.bind(this)} activeLink={this.state.activeLink} key={index} value={value} />
              );
            })}
          </ul>
        </div>
        <Route path='/globe' component={RankGlobe}  />
        <Route index path='/official' component={RankOfficial}  />
      </div>
    );
  }
}


