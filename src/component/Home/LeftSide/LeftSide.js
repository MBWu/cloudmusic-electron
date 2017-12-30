import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-keeper";
import classNames from "classnames/bind.js";
import "whatwg-fetch";
import fetchJsonp from "fetch-jsonp";

import styles from "../../../App.css";

const initialFunbar = {
  recommend: {
    title: "推荐",
    list: [
      {
        icon: require("../../../images/foundMusic.png"),
        name: "发现音乐",
        url: "/home/found"
      },
      {
        icon: require("../../../images/privateMv.png"),
        name: "私人FM",
        url: "/home/private"
      },
      {
        icon: require("../../../images/Mv.png"),
        name: "MV",
        url: "/home/mvlist"
      },
      {
        icon: require("../../../images/friend.png"),
        name: "朋友",
        url: "/home/friend"
      }
    ]
  },
 myMusic: {
    title: "我的音乐",
    list: [
      {
        icon: require("../../../images/itunes.png"),
        name: "iTunes音乐",
        url: "/home/itunes"
      },
      {
        icon: require("../../../images/download2.png"),
        name: "下载的音乐",
        url: "/home/download"
      }
    ]
  },
 createList: {
    title: "创建的歌单",
    list: [
    ]
  },
 favoriteList: {
    title: "收藏的歌单",
    list: []
  }
}

let cx = classNames.bind(styles);

class LeftSideUI extends Component {
    
  constructor(props) {
    super(props);

    this.state = {
      //侧栏的数据
      funcbar: initialFunbar,
      activeLink: "" //当前激活的链接
    };
  }

  componentWillReceiveProps(nextProps){
    
            //首次登录或者登录状态改变
            if(nextProps.isLog !== this.props.isLog){
    
                if (nextProps.isLog) {
                  
                  //获取用户的歌单
                    fetchJsonp(
                      `http://localhost:3000/user/playlist?uid=${nextProps.userLogData.account.id}`
                    )
                      .then(response => response.json())
                      .then(json => {
                          //对fetch的歌单进行处理并且加入到对应的频道
                         const funcbar =  this.DealWithFetchSongList(json);
                          
                          this.setState({
                              funcbar :funcbar
                          })
                      });
                    
                  }else {

                    //推出登录还原funbar

                    this.setState({
                      funcbar: initialFunbar
                    })

                  }
    
            }
        }


  componentWillMount() {

    //已经登录过，并且没有退出，就获取收藏歌单

    if (this.props.isLog) {
      fetchJsonp(
          `http://localhost:3000/user/playlist?uid=${this.props.userLogData.account.id}`
      )
          .then(response => response.json())
          .then(json => {
          
              //对fetch的歌单进行处理并且加入到对应的频道
              const funcbar =  this.DealWithFetchSongList(json);
              
              this.setState({
                  funcbar :funcbar
              })
          });
    }

  }

  componentDidMount() {
    //初始化activeLink
    this.setState({
      activeLink: window.location.hash
    });

    //检测hash 是否发生改变
    this.CheckHash();
  }
  componentWillUnmount() {
    clearInterval(this.timer); //解挂时清除定时器
  }

  CheckHash() {
    //用于检测hash 是否 被 改变
    clearInterval(this.timer);

    let oldHash = window.location.hash;

    this.timer = setInterval(() => {
      if (oldHash !== window.location.hash) {
        this.setState({
          activeLink: window.location.hash
        });

        this.CheckHash();
      }
    }, 150);
  }
  DealWithFetchSongList(json){

    //获取旧的funbar
    const funcbar = this.state.funcbar;


    //对fetch的歌单 数据进行处理
    for (let i = 0 ;i<json.playlist.length;i++){
        let Item = {icon:null,name:'',url:''}

        //如果歌单创造者的id是本用户 添加入创建歌单 ， 如果不是添加入收藏歌单
        if(json.playlist[i].creator.userId === this.props.userLogData.account.id){

            if(json.playlist[i].specialType === 5){
                Item.icon = require("../../../images/love2.png");
                Item.name = '我喜欢的音乐';
            }else {
                Item.icon = require('../../../images/songlist2.png');
                Item.name = json.playlist[i].name;
            }

            Item.url = `/home/songlistdetail/${json.playlist[i].id}/songlist`;
            
            funcbar.createList.list.push(Item);
            

        }else{

            let Item = {icon:null,name:'',url:''}
            Item.icon = require('../../../images/songlist2.png');
            Item.name = json.playlist[i].name;
            Item.url = `/home/songlistdetail/${json.playlist[i].id}/songlist`;

            funcbar.favoriteList.list.push(Item);
            
        }

    }

    return funcbar;
  }
  render() {

    return (
      <div className="Home_LeftSide_WrapBox">
        {
          //左边侧栏
        }
        <div className="Home_LeftSide_FuncBarBox">
          {Object.values(this.state.funcbar).map((value, index) => {
            
            //如果登录了，才会显示搜藏列表和创造列表
            if(value.title === '创建的歌单' || value.title === '收藏的歌单'){

                if(this.props.isLog && value.list.length){

                    return (
                        <Section
                          key={`${value.title}${index}`}
                          title={value.title}
                          value={value}
                          activeLink={this.state.activeLink}
                        />
                      );

                }

            }else{

                return (
                    <Section
                      key={`${value.title}${index}`}
                      title={value.title}
                      value={value}
                      activeLink={this.state.activeLink}
                    />
                  );

            }
            
          })}
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return state.userLog;
};

const mapDispatchToProps = dispatch => {
  return {};
};

export const LeftSide = connect(mapStateToProps, mapDispatchToProps)(
  LeftSideUI
);

const Section = props => {
  return (
    <div>
      {
        //每一部分的标题
      }
      <h6 className="Home_LeftSide_Section_Title">{props.value.title}</h6>
      {
        //每一部分的内容
      }
      <ul>
        {props.value.list.map((value, index) => {
          return (
            <Item
              key={value.name}
              value={value}
              activeLink={props.activeLink}
            />
          );
        })}
      </ul>
    </div>
  );
};

const Item = props => {

    let ItemClassNames = null,ItemLinkClassNames = null;

    //如果是创建歌单和收藏歌单下的 Item是不会有激活效果的

    if(props.title === '创建的歌单' || props.title === '收藏的歌单'){

       ItemClassNames = cx({
            Home_LeftSide_Section_Item: true,
           
          });
        
        ItemLinkClassNames = cx({
            Home_LeftSide_Section_ItemLink: true,
            
          });

    }else {

        ItemClassNames = cx({
            Home_LeftSide_Section_Item: true,
            Home_LeftSide_Section_Item_Active: props.activeLink.includes(
              props.value.url
            )
          });
        
        ItemLinkClassNames = cx({
            Home_LeftSide_Section_ItemLink: true,
            Home_LeftSide_Section_ItemLink_Active: props.activeLink.includes(
              props.value.url
            )
          });

    }
  

  return (
    <li key={props.value.name} className={ItemClassNames}>
      <Link className={ItemLinkClassNames} to={props.value.url}>
        {props.value.name}{" "}
        <img
          src={props.value.icon}
          className="Home_LeftSide_Section_ItemIcon"
        />{" "}
      </Link>
    </li>
  );
};
