import React, { Component } from "react";

import styls from "../../../App.css";
import prev from "../../../images/prev.png";

export default class PrevSong extends Component {
  render() {
    return (
      <a
        onClick={this.props.PrevSong}
        href="javascript:void(0)"
        className="Controler_PrevSong Controler_Button"
      >
        <span className="Cover" />
        <span
          className="Controler_PrevSong_Background"
          style={{ backgroundImage: `url(${prev})` }}
        />
      </a>
    );
  }
}
