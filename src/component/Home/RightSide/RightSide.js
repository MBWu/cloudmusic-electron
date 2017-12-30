import React, { Component } from "react";
import {Route,Link} from 'react-keeper';

import {store} from '../../store.js';
import Found from '../../Found/Found.js';
import RankDetail from '../../RankDetail/RankDetai.js';
import RadioDetail from '../../RadioDetail/RadioDetail.js';

const Download = ()=>{
  return(<div>Download</div>)
}

const ITunes = ()=>{
  return(<div>iTunes</div>)
}

const MVlist = ()=>{
  return(<div><Link to='/mvdetail/1' >1</Link></div>)
}

const Friend = ()=>{
  return(<div>Friend</div>)
}

const Private = ()=>{
  return(<div>Private</div>)
}

export class RightSide extends Component{
  componentDidMount(){
    this.contentnode.addEventListener('scroll',this.onScrollToBottom);
  }
  componentWillUnmount(){
    this.contentnode.addEventListener('scroll',this.onScrollToBottom);
  }
  
  onScrollToBottom(e){
    const clientHeight = e.target.clientHeight;
    const scrollTop = e.target.scrollTop;
    const scrollHeight = e.target.scrollHeight;
    const isBottom = (clientHeight+scrollTop === scrollHeight);

    const specialHref = window.location.href.includes('/home/found/songlist') || window.location.href.includes('/home/radioProgramsDetail');


    if(isBottom && specialHref){//不仅需要到达组件底部，而且需要当组件是 特殊的某个组件时 时才会发出达到底部的dispatch
      store.dispatch({
        type:'isBottom_Y',
      })
    }
  }

  render(){
    return(
      <div
      ref={node =>this.contentnode =node}
      className="rightSide"
      style={{
        width: 800,
        height: 540,
        overflow: "auto",
        float: "right"
      }}
    >
      <div
        style={{
          width: 800,
          paddingBottom: 5,
          backgroundColor: ""
        }}
      >
        <Route path="/download" component={Download} />
        <Route path="/itunes" component={ITunes} />
        <Route path="/mvlist" component={MVlist} />
        <Route path="/friend" component={Friend} />
        <Route path="/private" component={Private} />
        <Route path="/rankdetail/:id" component={RankDetail} />
        <Route path="/songlistdetail/:id" component={RankDetail} />
        <Route path="/radioProgramsDetail/:id" component={RadioDetail}/>
        <Route index path="/found" component={Found} />
      </div>
    </div>
    )
  }
}


