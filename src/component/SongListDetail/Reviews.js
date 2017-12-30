import React, { Component } from "react";

import "../../App.css";

export default class Reviews extends Component {
  render() {
    return (
      <div>
        <div className="clearfix" style={{ padding: "20px 30px" }}>
          <ReviewComponent />
          <InterestingReviews />
          <NewReviews />
        </div>
      </div>
    );
  }
}

class ReviewComponent extends Component {
  render() {
    return (
      <div
        style={{
          height: 83,
          border: "1px solid #D1D1D3",
          backgroundColor: "#F9F9FB",
          padding: "10px"
        }}
      >
        <textarea
          style={{
            height: 37,
            border: "1px solid #D1D1D3",
            outline: 0,
            display: "block",
            width: "100%",
            resize: "none",
            padding: 0
          }}
        />
        <input
          type="button"
          style={{ float: "right", marginTop: 10 }}
          value="评论"
        />
      </div>
    );
  }
}

const InterestingReviews = props => {
  return (
    <div style={{ marginTop: 20 }}>
      <h6 style={{ fontSize: 14, padding: "10px 0px", fontWeight: 800 }}>
        精彩评论
      </h6>
      <ul>
        <li
          className="clearfix"
          style={{
            paddingTop: 15,
            paddingBottom: 17,
            borderTop: "1px dotted #E0E0E0"
          }}
        >
          <span
            style={{
              float: "left",
              width: 32,
              height: 32,
              borderTopLeftRadius: "50%",
              borderTopRightRadius: "50%",
              borderBottomRightRadius: "50%",
              borderBottomLeftRadius: "50%",
              marginRight: 6
            }}
          >
            <img style={{ width: 32, height: 32 }} src="#" />
          </span>
          <div style={{ float: "left", padding: "0px 4px" }}>
            <div style={{ fontSize: 14 }}>用户名:</div>
            <div style={{ fontSize: 12, color: "#878785" }}>时间</div>
          </div>
        </li>
        <li
          className="clearfix"
          style={{
            paddingTop: 15,
            paddingBottom: 17,
            borderTop: "1px dotted #E0E0E0"
          }}
        >
          <span
            style={{
              float: "left",
              width: 32,
              height: 32,
              borderTopLeftRadius: "50%",
              borderTopRightRadius: "50%",
              borderBottomRightRadius: "50%",
              borderBottomLeftRadius: "50%",
              marginRight: 6
            }}
          >
            <img style={{ width: 32, height: 32 }} src="#" />
          </span>
          <div style={{ float: "left", padding: "0px 4px" }}>
            <div style={{ fontSize: 14 }}>用户名:</div>
            <div style={{ fontSize: 12, color: "#878785" }}>时间</div>
          </div>
        </li>
      </ul>
    </div>
  );
};

const NewReviews = props => {
  return (
    <div style={{ marginTop: 25 }}>
      <h6 style={{ fontSize: 14, padding: "10px 0px", fontWeight: 800 }}>
        最新评论(评论数)
      </h6>
      <ul>
        <li
          className="clearfix"
          style={{
            paddingTop: 15,
            paddingBottom: 17,
            borderTop: "1px dotted #E0E0E0"
          }}
        >
          <span
            style={{
              float: "left",
              width: 32,
              height: 32,
              borderTopLeftRadius: "50%",
              borderTopRightRadius: "50%",
              borderBottomRightRadius: "50%",
              borderBottomLeftRadius: "50%",
              marginRight: 6
            }}
          >
            <img style={{ width: 32, height: 32 }} src="#" />
          </span>
          <div style={{ float: "left", padding: "0px 4px" }}>
            <div style={{ fontSize: 14 }}>用户名:</div>
            <div style={{ fontSize: 12, color: "#878785" }}>时间</div>
          </div>
        </li>
        <li
          className="clearfix"
          style={{
            paddingTop: 15,
            paddingBottom: 17,
            borderTop: "1px dotted #E0E0E0"
          }}
        >
          <span
            style={{
              float: "left",
              width: 32,
              height: 32,
              borderTopLeftRadius: "50%",
              borderTopRightRadius: "50%",
              borderBottomRightRadius: "50%",
              borderBottomLeftRadius: "50%",
              marginRight: 6
            }}
          >
            <img style={{ width: 32, height: 32 }} src="#" />
          </span>
          <div style={{ float: "left", padding: "0px 4px" }}>
            <div style={{ fontSize: 14 }}>用户名:</div>
            <div style={{ fontSize: 12, color: "#878785" }}>时间</div>
          </div>
        </li>
      </ul>
    </div>
  );
};
