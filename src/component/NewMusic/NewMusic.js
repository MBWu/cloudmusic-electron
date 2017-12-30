import React, { Component } from "react";
import { Link, Route } from "react-keeper";
import classNames from "classnames/bind.js";

import styles from "../../App.css";

let cx = classNames.bind(styles);

const links = [
  { name: "新歌速递", url: "newsong" },
  { name: "新碟上架", url: "newdisc" }
];

const NewSong = props => {
  return (
    <div>
      <div style={{ height: 450, lineHeight: "450px", textAlign: "center" }}>
        没有对应的api @ '' @
      </div>
    </div>
  );
};
const NewDisc = props => {
  return (
    <div>
      <div style={{ height: 450, lineHeight: "450px", textAlign: "center" }}>
        没有对应的api @ '' @
      </div>
    </div>
  );
};

const RouteLink = props => {
  let linkClassname = cx({
    NewMusic_Link: true,
    NewMusic_Link_Newsong: props.value.url === "newsong",
    NewMusic_Link_Newdisc: props.value.url === "newdisc",
    NewMusic_Link_Active: props.activeLink === props.value.url
  });
    {
        //一样是点击将url传到上层，进行修改activeLink的值
    }
  return (
    <span style={{display:'inline-block'}} onClick={()=>{props.ClickToActive(props.value.url)}} >
      <Link className={linkClassname} type="button" to={`${props.pathname}/${props.value.url}`}>
        {props.value.name}
      </Link>
    </span>
  );
};

export default class NewMusic extends Component {
    constructor(props){
        super(props);
        this.state ={
            activeLink: 'newsong'
        }
    }
    ClickToActive(active){
        this.setState({
            activeLink: active
        })
    }
  render() {
    return (
      <div>
        <div style={{ textAlign: "center", paddingTop: 20 }}>
          {links.map((value, index) => {
            return (
              <RouteLink
                key={index}
                pathname={this.props.pathname}
                value={value}
                index={index}
                ClickToActive={this.ClickToActive.bind(this)}
                activeLink ={this.state.activeLink}
              />
            );
          })}
        </div>
        <div>
          <Route index path="/newsong" component={NewSong} />
          <Route path="/newdisc" component={NewDisc} />
        </div>
      </div>
    );
  }
}
