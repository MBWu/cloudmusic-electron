import React, { Component } from "react";
import "whatwg-fetch";
import fetchJsonp from "fetch-jsonp";
import { Link } from "react-keeper";
import classNames from "classnames/bind.js";

import { store } from "../../store.js";
import styles from "../../../App.css";
import load from '../../../images/load.png';

let cx = classNames.bind(styles);


class RadioCatalog extends Component {
  render() {
    return (
      <div className="clearfix Radio_RadioListRadioCatalog">
        {
          //将获取到的电台类型数组遍历，并且将每种的数据传入
        }
        {this.props.categories.map((value, index) => {
          return (
            <RadioListItem
              pathname={this.props.pathname}
              key={index}
              value={value}
              ClickToActive={this.props.ClickToActive}
              activeLink={this.props.activeLink}
            />
          );
        })}
      </div>
    );
  }
}

class RadioListItem extends Component {
  clickToFetchData() {
    this.props.ClickToActive(this.props.value.id);

    //清空到底部信息
    store.dispatch({
      type: "isBottom_clearPage"
    });

    //获取优质电台
    store.dispatch({
      type: "radioCategoriesRCM_Fetch",
      payload: fetchJsonp(
        `http://localhost:3000/dj/recommend/type?type=${this.props.value.id}`
      )
        .then(response => {
          return response.json();
        })
        .then(json => {
          return json;
        })
    });

    //获得所有电台
    store.dispatch({
      type: "radioCategoriesProgram_Fetch",
      payload: fetchJsonp(
        `http://localhost:3000/dj/program?rid=${this.props.value
          .id}&limit=10&offet=0`
      )
        .then(response => {
          return response.json();
        })
        .then(json => {
          return json;
        })
    });
  }
  render() {
    //还是根据点击将该组件的id传到上层，使上层改变激活的link，然后再判断activeLink 和 每一个组件的id是否匹配，匹配的Active
    let ItemBoxClassname = cx({
      Radio_RadioList_RadioListItem_ItemBox: true,
      Radio_RadioList_RadioListItem_ItemBox_Active:
        this.props.value.id === this.props.activeLink
    });
    let ItemImgClassname = cx({
      Radio_RadioList_RadioListItem_ItemImg: true,
      Radio_RadioList_RadioListItem_ItemImg_Active:
        this.props.value.id === this.props.activeLink
    });
    return (
      <div onClick={this.clickToFetchData.bind(this)} style={{ float: "left" }}>
        <Link
          type="div"
          to={`${this.props.pathname}/categories/${this.props.value.id}`}
        >
          {
            //active 时ItemBox 变颜色
          }
          <div className={ItemBoxClassname}>
            <div style={{ textAlign: "center" }}>
              {
                //active 时ItemImg 精灵图位置改变
              }
              <div
                className={ItemImgClassname}
                style={{
                  backgroundImage: `url(${this.props.value.picWebUrl})`
                }}
              />
            </div>
            <h6 className="Radio_RadioList_RadioListItem_Name">
              {this.props.value.name}
            </h6>
          </div>
        </Link>
      </div>
    );
  }
}

const IndexBall = props => {
  let className = cx({
    Radio_RadioList_IndexBall_First: props.index === 0,
    Radio_RadioList_IndexBall: true,
    Radio_RadioList_IndexBall_Active: props.radiosPage === props.index
  });
  return (
    <span
      className={className}
      onMouseOver={() => {
        props.HoverToChange(props.index);
      }}
    />
  );
};

export default class RadioList extends Component {
  constructor(props) {
    super(props);

    //activeLink表示当前激活的是哪一种电台类型
    //radiosPage表示的是当前处于电台列表的第几页
    this.state = {
      fetched: false,
      error: false,
      data: null,
      activeLink: null,
      radiosPage: 0
    };

    //fetch 获取电台类型列表，成功后将数据传入this.state.data
    fetchJsonp("http://localhost:3000/dj/catelist")
      .then(
        response => {
          return response.json();
        },
        error => {
          this.setState({
            fetched: true,
            error: true
          });
        }
      )
      .then(json => {
        if (!this.state.error) {
          this.setState({
            fetched: true,
            error: false,
            data: json
          });
        }
      });
  }
  ClickToActive(active) {
    //点击事件改变接受下层id，改变activeLink
    this.setState({
      activeLink: active
    });
  }
  HoverToChange(num) {
    //将这个事件传入IndexBall，当悬停时，切换当前浏览的电台页
    this.setState({
      radiosPage: num
    });
  }
  render() {
    let Radio_RadioList_WrapBox_Scroll = cx({
      clearfix: true,
      Radio_RadioList_WrapBox_Scroll: true,
      Radio_RadioList_WrapBox_Scroll_ToLeft: this.state.radiosPage === 1,
      Radio_RadioList_WrapBox_Scroll_ToRight: this.state.radiosPage === 0
    });
    return (
      <div>
      
        {this.state.fetched ? (
          <div>
            {this.state.error ? (
              <div
                style={{
                  textAlign: "center",
                  height: 262,
                  lineHeight: "262px"
                }}
              >
              服务器好像跪了 ˜-_-˜
              </div>
            ) : (
              <div>
                <div className="Radio_RadioList_WrapBox">
                  <div className={Radio_RadioList_WrapBox_Scroll}>

                  {
                    //电台类型索引盒子1
                  }
                    <RadioCatalog
                      categories={this.state.data.categories.slice(0, 18)}
                      pathname={this.props.pathname}
                      ClickToActive={this.ClickToActive.bind(this)}
                      activeLink={this.state.activeLink}
                    />

                    {
                      //电台类型索引盒子2
                    }
                    <RadioCatalog
                      categories={this.state.data.categories.slice(18)}
                      pathname={this.props.pathname}
                      ClickToActive={this.ClickToActive.bind(this)}
                      activeLink={this.state.activeLink}
                    />
                  </div>
                </div>
                <div style={{ textAlign: "center" }}>
                  {
                    //底部索引小球,鼠标悬停在小球上面改变当且电台页码，并且根据不同的页码使对应的小球变红（radiosPage）
                  }
                  {[0, 1].map((value, index) => {
                    return (
                      <IndexBall
                        key={index}
                        index={index}
                        HoverToChange={this.HoverToChange.bind(this)}
                        radiosPage={this.state.radiosPage}
                      />
                    );
                  })}
                </div>
              </div>
            )}
          </div>
        ) : (
          <div
            style={{ textAlign: "center", height: 262, lineHeight: "262px" }}
          >
            <img src={load} className='PageLoading'  />
          </div>
        )}
      </div>
    );
  }
}