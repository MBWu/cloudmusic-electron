import React, { Component } from "react";

import next from "../../../images/next.png";

export default class NextSong extends Component{
    render(){
        return (
          <a href='javascript:void(0)' className="Controler_PrevSong Controler_Button" onClick={this.props.NextSong} >
          <span className='Cover'></span>
          <span className='Controler_PrevSong_Background' style={{backgroundImage:`url(${next})`}} ></span>
        </a>
        )
    }
}