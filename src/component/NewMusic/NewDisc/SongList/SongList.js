import React, { Component } from "react";

import '../../../../App.css';
export default class SongList extends Component {
  render() {
    return (
      <div>
        <div style={{ marginTop: 20, border: "1px solid #E7E7E7" }}>
          <div className='clearfix' style={{ lineHeight: '50px',padding:'0px 10px 0px 15px',height:50 }}>
            <div style={{float:'left'}} >
              <span style={{marginRight:17,float:'left'}}>
                <img style={{ width: 16, height: 16 }} src="#" />
              </span>
              <span  style={{fontSize:14,float:'left'}} >播放全部</span>
            </div>
            <div style={{float:'right',lineHeight:'18px'}} >
                <button style={{backgroundColor:'#fff',border:'1px solid #D9D9D9',borderTopLeftRadius:5,borderTopRightRadius:5,borderBottomRightRadius:5,borderBottomLeftRadius:5,outline:'none'}} ><span style={{width:16,height:14,float:'left'}} ><img src='#'/></span><span style={{fontSize:14,float:'left'}} >收藏全部</span></button>
            </div>
          </div>
          <div>
            <DoubleItem />
            <SingalItem />
            <DoubleItem />
            <SingalItem />
            <DoubleItem />
          </div>
        </div>
      </div>
    );
  }
}

const SingalItem = (props)=>{
    return(
        <div>
            <div className='clearfix' style={{padding:'0px 20px 0px 17px',lineHeight:'30px',height:30,overflow:'hidden'}} >
                <span style={{fontSize:12,float:'left',marginRight:19,color:'#888888'}} >01</span>
                <div style={{float:'left',overflow:'hidden',width:308,marginRight:22,fontSize:14}}><span>文字文字文字文字文字文字文字文字</span></div>
                <div style={{float:'left',overflow:'hidden',width:130,marginRight:22,fontSize:14}} ><span>歌手歌手</span></div>
                <div style={{float:'left',overflow:'hidden',width:132,marginRight:22,fontSize:14}} ><span>专辑名字</span></div>
                <span style={{float:'left',fontSize:12,color:'#888888'}} >01:00</span>
            </div>
        </div>
    )
}

const DoubleItem = (props)=>{
    return(
        <div>
            <div className='clearfix' style={{backgroundColor:'#F4F4F4',padding:'0px 20px 0px 17px',lineHeight:'30px',height:30,overflow:'hidden'}} >
                <span style={{fontSize:12,float:'left',marginRight:19,color:'#888888'}} >01</span>
                <div style={{float:'left',overflow:'hidden',width:308,marginRight:22,fontSize:14}}><span>文字文字文字文字文字文字文字文字</span></div>
                <div style={{float:'left',overflow:'hidden',width:130,marginRight:22,fontSize:14}} ><span>歌手歌手</span></div>
                <div style={{float:'left',overflow:'hidden',width:132,marginRight:22,fontSize:14}} ><span>专辑名字</span></div>
                <span style={{float:'left',fontSize:12,color:'#888888'}} >01:00</span>
            </div>
        </div>
    )
}
