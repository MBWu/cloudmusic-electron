import React, { Component } from "react";

export default class HotRadio extends Component {
  render() {
    return (
      <div>
        <div style={{ padding: "0px 30px", marginTop: 18 }}>
          <div
            style={{
              fontSize: 20,
              lineHeight: "32px",
              borderBottom: "3px solid #E1E1E1",
              width: 84,
              textAlign: "center"
            }}
          >
            熱門電台
          </div>
          <div
            style={{
              borderTop: "1px solid #E1E1E1",
              overflow: "hidden"
            }}
          >
            <div className="clearfix" style={{ paddingTop: 20, width: 760 }}>
              <Item />
              <Item />
              <Item />
              <Item />
              <Item />
              <Item />
              <Item />
              <Item />
              <Item />
              <Item />
              <Item />
              <Item />
              <Item />
              <Item />
              <Item />
              <Item />
              <Item />
              <Item />
              <Item />
              <Item />
              <Item />
              <Item />
              <Item />
              <Item />
              <Item />
              <Item />
              <Item />
              <Item />
              <Item />
              <Item />
              <Item />
              <Item />
              <Item />
              <Item />
              <Item />
              <Item />
              <Item />
              <Item />
              <Item />
              <Item />
              <Item />
              <Item />
              <Item />
              <Item />
              <Item />
              <Item />
              <Item />
              <Item />
              <Item />
              <Item />
              <Item />
              <Item />
              <Item />
              <Item />
              <Item />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const Item = props => {
  return (
    <div style={{ float: "left", width: 140, marginRight: 10 }}>
      <div>
        <img style={{ width: 140, height: 140 }} src="#" />
      </div>
      <p style={{ marginTop: 7, lineHeight: "22px", fontSize: 14 }}>
        文字文字文字文字文字文字文字
      </p>
    </div>
  );
};
