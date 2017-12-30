import React, { Component } from "react";
import { Link } from "react-keeper";
import classNames from "classnames/bind.js";

import styles from "../../../App.css";
import wait from "../../../images/wait.png";

import { store } from "../../store.js";

let cx = classNames.bind(styles);

export default class RankContain extends Component {

  render() {
    return (
      <div style={{ float: "left" }}>
        <div className="RankContain_ContainBox">
          {
            //fetch
          }
          {this.props.isFetching ? (
            <RankWait />
          ) : (
            <div>
              {this.props.error ? (
                <div style={{height:360,lineHeight:'360px',textAlign:'center'}} >error</div>
              ) : (
                <div>
                  {
                    //排行榜
                  }
                  <img
                    style={{ width: 237, height: 80 }}
                    src={this.props.imageUrl}
                    alt="..."
                  />

                  {
                    //榜单歌曲
                  }
                  {this.props.fetchData.playlist ? (
                    <div className="RankContain_RankItemContain">
                      {this.props.fetchData.playlist.tracks.map(
                        (value, index) => {
                          if (index < 8) {
                            if (index % 2) {
                              return (
                                <Item
                                  key={index + 1}
                                  index={index + 1}
                                  data={value}
                                  type={this.props.imageUrl}
                                  activeType={this.props.activeType}
                                  activeLink={this.props.activeLink}
                                  clickToActive={this.props.clickToActive}
                                />
                              );
                            } else {
                              return (
                                <Item
                                  key={index + 1}
                                  index={index + 1}
                                  data={value}
                                  type={this.props.imageUrl}
                                  activeType={this.props.activeType}
                                  activeLink={this.props.activeLink}
                                  clickToActive={this.props.clickToActive}
                                />
                              );
                            }
                          }
                          return null;
                        }
                      )}
                    </div>
                  ) : null}

                  {
                    //查看全部
                  }
                  <div className="RankContain_SeeAllBox">
                    <Link
                      to={`/home/rankdetail/${this.props.fetchData.playlist
                        .id}/songlist`}
                    >
                      查看全部 >
                    </Link>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    );
  }
}

const RankWait = () => (
  <div className="RankContain_RankWait_Box">
    <img alt='' className="PageLoading RankContain_RankWait_Img" src={wait} />
  </div>
);

class Item extends Component {
  render() {
    let className = cx({
      RankContain_Item_Box: true,
      RankContain_Item_Box_Single: (this.props.index - 1) % 2 !== 0,
      RankContain_Item_Box_Active:
        this.props.index === this.props.activeLink &&
        this.props.type === this.props.activeType
    });

    let dealWithDoubleClickItemData = (data)=>{ //对双击Item的数据进行处理

      const newItemData = {
        al:{
          id:data.al.id,
          name:data.al.name,
          pic:data.al.pic,
          picUrl:data.al.picUrl
        },
        name:data.name,
        id:data.id,
        dt:data.dt,
        ar:data.ar.map((value,index)=>{
          return {
            name:value.name,
            id:value.id
          }
        })
      }


      return newItemData;
    }

    let doubleClickToPlay = ()=>{ //双击Item进行播放

      const item = dealWithDoubleClickItemData(this.props.data);

      store.dispatch({  //向歌单列表插入歌曲
        type:'songPlayer_Insert',
        payload: item
      });

    }

    

    return (
      <div
        onClick={() => {
          //单击Item 就会将单击的Item的index传到父级组建，修改activeItem
          this.props.clickToActive(this.props.type, this.props.index);
        }}

        onDoubleClick={doubleClickToPlay.bind(this)}
      >
        <div className={className}>
          {
            //榜单排名
          }
          <span className="RankContain_Item_Num">
            <span style={{ float: "left", marginRight: 5 }}>
              {this.props.index}
            </span>{" "}
            <div
              style={{
                float: "left",
                height: 30,
                overflow: "hidden",
                width: 116
              }}
            >
              {" "}
              <span>{this.props.data.name}</span>
            </div>
          </span>

          {
            //专辑
          }
          <div className="RankContain_Item_Artists">
            <span>
              {this.props.data.ar.length > 1
                ? `${this.props.data.ar[0].name},...`
                : `${this.props.data.ar[0].name}`}
            </span>
          </div>
        </div>
      </div>
    );
  }
}
