import React, { Component } from "react";
import { Link } from "react-keeper";

import "../../../App.css";
import SongList from './SongList/SongList.js';

const links = [
  { name: "全部", url: "all" },
  { name: "华语", url: "cn" },
  { name: "欧美", url: "eu" },
  { name: "韩国", url: "ko" },
  { name: "日本", url: "jp" }
];

export default class NewDisc extends Component {
  render() {
    return (
      <div>
        <div style={{ padding: "0 30px" }}>
          <ul
            className="clearfix"
            style={{ borderBottom: "1px solid #E1E1E1", marginTop: 14 }}
          >
            {links.map((value, index) => {
              return (
                <Link
                  key={index}
                  type="li"
                  style={{
                    float: "left",
                    color: "#66666D",
                    marginRight: 27,
                    width: 39,
                    fontSize: 16,
                    lineHeight: "32px",
                    borderBottom: "3px solid rgba(0,0,0,0)"
                  }}
                  activeStyle={{
                    fontSize: 18,
                    borderBottom: "3px solid #E1E1E1"
                  }}
                  to={`${this.props.pathname}/${value.url}`}
                >
                  {value.name}
                </Link>
              );
            })}
          </ul>
          <div>
            xxx
          </div>
        </div>
      </div>
    );
  }
}
