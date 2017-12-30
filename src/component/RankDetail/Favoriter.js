import React, { Component } from "react";

import "../../App.css";

export default class Favoriter extends Component {
  render() {
    return (
      <div>
        <div style={{ padding: "0px 41px 0px 30px" }}>
          <Item />
          <Item />
          <Item />
          <Item />
        </div>
      </div>
    );
  }
}

const Item = props => {
  return (
    <div
      className="clearfix"
      style={{
        display: "inline-block",
        width: 223,
        height: 60,
        padding: "18px 0px 20px 0px"
      }}
    >
      <span
        style={{
          backgroundColor: "red",
          float: "left",
          width: 60,
          height: 60,
          borderTopLeftRadius: "50%",
          borderTopRightRadius: "50%",
          borderBottomRightRadius: "50%",
          borderBottomLeftRadius: "50%"
        }}
      >
        <img src="#" />
      </span>
      <span
        style={{
          float: "left",
          height: 60,
          lineHeight: "60px",
          marginLeft: 10
        }}
      >
        用户名
      </span>
    </div>
  );
};
