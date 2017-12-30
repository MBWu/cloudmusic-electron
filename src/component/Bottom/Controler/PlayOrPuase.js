import React, { Component } from "react";

import play from "../../../images/Play Icon.png";
import pause from '../../../images/pause.png';

export default class PlayOrPuase extends Component{
    render(){
        return(
            <a
            className="Controler_Button Controler_PlayOrPuase" onClick={this.props.TogglePlay}
          >
          <span className='Cover' style={{width:37,height:37}} ></span>
          <span className='Controler_PlayOrPuase_Background' style={{backgroundImage:`url(${this.props.isPlay?pause:play})`}} ></span>
          </a>
        )
    }
}