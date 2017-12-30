import React, { Component } from "react";

import "../../App.css";
import love from "../../images/love.png";
import unlove from "../../images/unlove.png";
import download from "../../images/download.png";

export default class List extends Component {
  render() {
    return (
      <div>
        <ul>
        {this.props.tracks.map((value, index) => {
            if (index % 2) {
              return <SingleItem key={index} data={value} index={index} />;
            } else {
              return <DoubleItem key={index} data={value} index={index} />;
            }
          })}
        </ul>
      </div>
    );
  }
}
// 
const DoubleItem = props => {
  return (
    <li style={{ backgroundColor: "#F4F4F4" }}>
      <Item index={props.index} data={props.data} />
    </li>
  );
};

const SingleItem = props => {
  return (
    <li>
      <Item index={props.index} data={props.data} />
    </li>
  );
};
const Item = props => {
  let min = Math.floor(props.data.dt/1000/60);
  min = min<10?`0${min}`:min;
  let sec = Math.floor(props.data.dt/1000%60);
  sec = sec<10?`0${sec}`:sec;
  return (
    <div
      className='clearfix'
      style={{
        padding: "0px 25px 0px 29px",
        height: 30,
        lineHeight: "30px",
        overflow: "hidden",
        fontSize: 14
      }}
    >
      <div style={{height:30}} >
        <span
          style={{
            float:'left',
            width: 22,
            fontSize: 12,
            color: "#8C8C8C"
          }}
        >
          {props.index + 1 < 10 ? `0${props.index + 1}` : `${props.index + 1}`}
        </span>
        <span
          style={{
            float:'left',
            width: 12,
            fontSize: 12,
            color: "#8C8C8C"
          }}
        >
          -
        </span>
        <div
          style={{
            float:'left',
            width: 58,
            textAlign: "center",
            lineHeight: "30px"
          }}
        >
          <img
            style={{ width: 18, height: 17, marginTop: 6, marginRight: 7 }}
            src={unlove}
          />
          <img style={{ width: 18, height: 17 }} src={download} />
        </div>
        <div
          className="clearfix"
          style={{
            float:'left',
            overflow: "hidden",
            width: 294,
            padding: "0px 9px",
            fontSize: 13
          }}
        >
          <span>{props.data.name}</span>
        </div>
        <div
          className="clearfix"
          style={{
            float:'left',
            overflow: "hidden",
            width: 148,
            padding: "0px 9px",
            fontSize: 13,
            color: "#8C8C8C"
          }}
        >
          <span>
            {props.data.ar.map((value, index) => {
              if(index){
                return `,${value.name}`;
              }else{
                return `${value.name}`;
              }
            })}
          </span>
        </div>
        <div
          className="clearfix"
          style={{
            float:'left',
            overflow: "hidden",
            width: 114,
            padding: "0px 9px",
            fontSize: 13,
            color: "#8C8C8C"
          }}
        >
          <span>{props.data.al.name}</span>
        </div>
        <span
          style={{
            float:'left',
            color: "#8C8C8C",
            fontSize: 12
          }}
        >
        {`${min}:${sec}`}
        </span>
      </div>
    </div>
  );
};
