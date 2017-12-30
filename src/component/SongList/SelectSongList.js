import React ,{Component} from 'react';
import classNames from 'classnames/bind.js';

import styles from '../../App.css';

let cx = classNames.bind(styles);

const hotlabels = [
    "华语",
    "流行",
    "摇滚",
    "民谣",
    "电子",
    "轻音乐",
    "影视原声",
    "ACG",
    "怀旧",
    "治愈"
  ];

export default class SelectSongList extends Component{
    render(){
      
        return(
            <div>
            <div>
              <input
                type="button"
                className='Songlist_SelectSongList_ListButton'
                value="全部歌单"
              />
            </div>
            <div className="clearfix" style={{ marginTop: 14 }}>
              <span style={{ float: "left", fontSize: 14, marginTop: 1 }}>热门标签:</span>
              <div style={{ float: "left" }}>
                {hotlabels.map((value, index) => {
                  return (
                    <HotLabel key={index} index={index} value={value} len={hotlabels.length} />
                  );
                })}
              </div>
            </div>
          </div>
        )
    }
}
const HotLabel = props=>{

  // 判断是否有右侧竖线
  let hotLabel=cx({
    Songlist_SelectSongList_HotLabel:true,
    Songlist_SelectSongList_HotLabel_NotLast:props.index !== (props.len-1)
  });
  
  return (
    <span
    className={hotLabel}
  >
    {props.value}{" "}
  </span>
  )
}