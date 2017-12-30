import React, { Component } from "react";
import { Link } from "react-keeper";

const someRoute = [
  { name: "歌曲列表", url: "songlist", index: true },
  { name: "評論", url: "reviews" },
  { name: "收藏者", url: "favoriter" }
];

export default class SongListInfo extends Component {
  render() {
    return (
      
      <div style={{ backgroundColor: "rgb(200, 225, 230)" }}>
        <div
          className="clearfix"
          style={{
            backgroundColor: "rgba(255,255,255,0.9)",
            width: 740,
            borderBottom: "2px solid #761A1B",
            padding: "30px 30px 50px 30px",
            position: "relative"
          }}
        >
          <div>
            <LeftSide playlist={this.props.playlist} />
            <RightSide playlist={this.props.playlist} />
          </div>
          <RouteLinks pathname={this.props.pathname} />
        </div>
      </div>
    );
  }
}

const LeftSide = (props) => {
  return (
    <div className="leftside" style={{ float: "left" }}>
      <img
        style={{
          width: 178,
          height: 178,
          border: "1px solid rgba(187,180,168,0.5)",
          marginRight: 33
        }}
        src={props.playlist.coverImgUrl}
      />
    </div>
  );
};

const RightSide = (props) => {
  return (
    <div className="rightside" style={{ float: "left", paddingTop: 3,maxWidth:525 }}>
      <div
        style={{
          fontSize: 22,
          lineHeight: "22px",
          height: 22,
          marginBottom: 10
        }}
      >
        <span
          style={{
            backgroundColor: "#D90000",
            width: 40,
            height: 20,
            lineHeight: "20px",
            textAlign: "center",
            borderTopLeftRadius: 3,
            borderBottomLeftRadius: 3,
            borderTopRightRadius: 3,
            borderBottomRightRadius: 3,
            marginRight: 10,
            marginTop: -1,
            display: "inline-block",
            color: "#fff",
            fontSize: 12
          }}
        >
          歌单
        </span>
        <span style={{ fontSize: 22 }}>{props.playlist.name}</span>
      </div>
      <div className="clearfix" style={{ height: 32, marginBottom: 30 }}>
        <span
          style={{
            float: "left",
            marginRight: 7,
            borderTopLeftRadius: "50%",
            borderTopRightRadius: "50%",
            borderBottomRightRadius: "50%",
            borderBottomLeftRadius: "50%",
            border: "1px solid #E2E2E2",
            width: 32,
            height: 32,
            overflow:'hidden',
          }}
        >
          <img style={{ width: 32, height: 32 }} src={props.playlist.creator.avatarUrl} />
        </span>
        <span
          style={{
            float: "left",
            fontSize: 14,
            lineHeight: "32px",
            height: 32
          }}
        >
        {props.playlist.creator.nickname}
        </span>
        <span
          style={{
            float: "left",
            color: "#E2E2E",
            marginLeft: 4,
            lineHeight: "32px",
            fontSize: 13
          }}
        >
          最后更新时间：
        </span>
      </div>
      <FuncBar playlist={props.playlist} />
      <div style={{ marginTop: 18, fontSize: 12,height:80,overflow:'hidden' }}>
        <span style={{ fontWeight: 800 }}>簡介：</span>
        <span>{props.playlist.description}</span>
      </div>
    </div>
  );
};

const FuncBar = (props) => {
  return (
    <div className="clearfix" style={{ height: 30, lineHeight: "30px" }}>
      <div
        style={{
          float: "left",
          width: 106,
          height: 28,
          marginRight: 10,
          lineHeight: "28px",
          border: "1px solid #C9C9C9",
          borderTopLeftRadius: 4,
          borderTopRightRadius: 4,
          borderBottomRightRadius: 4,
          borderBottomLeftRadius: 4,
          paddingLeft: 11,
          paddingRight: 8
        }}
      >
        <span
          style={{
            width: 14,
            height: 14,
            position: "relative",
            top: 7,
            display: "inline-block",
            borderTopLeftRadius: "50%",
            borderTopRightRadius: "50%",
            borderBottomRightRadius: "50%",
            borderBottomLeftRadius: "50%",
            border: "1px solid #821010"
          }}
        >
          <img src="#" />
        </span>
        <span
          style={{
            fontSize: 14,
            height: 28,
            display: "inline-block",
            marginLeft: 4,
            paddingRight: 9,
            borderRight: "1px solid #D9D9D9"
          }}
        >
          播放全部
        </span>
        <span>
          <img src="#" />
        </span>
      </div>
      <div
        style={{
          float: "left",
          marginRight: 10,
          fontSize: 14,
          height: 28,
          lineHeight: "28px",
          padding: "0px 10px",
          border: "1px solid #C9C9C9",
          borderTopLeftRadius: 4,
          borderTopRightRadius: 4,
          borderBottomRightRadius: 4,
          borderBottomLeftRadius: 4
        }}
      >
       
        <span>收藏({props.playlist.subscribedCount})</span>
      </div>
      <div
        style={{
          float: "left",
          marginRight: 10,
          fontSize: 14,
          height: 28,
          lineHeight: "28px",
          padding: "0px 10px",
          border: "1px solid #C9C9C9",
          borderTopLeftRadius: 4,
          borderTopRightRadius: 4,
          borderBottomRightRadius: 4,
          borderBottomLeftRadius: 4
        }}
      >
        
        <span>分享({props.playlist.shareCount})</span>
      </div>
      <div
        style={{
          float: "left",
          marginRight: 10,
          fontSize: 14,
          height: 28,
          lineHeight: "28px",
          padding: "0px 10px",
          border: "1px solid #C9C9C9",
          borderTopLeftRadius: 4,
          borderTopRightRadius: 4,
          borderBottomRightRadius: 4,
          borderBottomLeftRadius: 4
        }}
      >
        
        <span>下載全部</span>
      </div>
    </div>
  );
};

const RouteLinks = props => {
  return (
    <div style={{ position: "absolute", bottom: 0, left: 30 }}>
      <ul>
        {someRoute.map((value, index) => {
          return (
            <Link
              key={index}
              type="li"
              to={`${props.pathname}/${value.url}`}
              style={{
                height: 32,
                lineHeight: "32px",
                backgroundColor: "#F3F3F3",
                border: "1px solid #C8C6C7",
                padding: "0px 10px",
                fontSize: 14,
                display: "inline-block",
                marginRight: 4
              }}
              activeStyle={{
                backgroundColor: "#BD0000",
                borderColor: "#850909",
                color: "#fff"
              }}
            >
              {value.name}
            </Link>
          );
        })}
      </ul>
    </div>
  );
};
