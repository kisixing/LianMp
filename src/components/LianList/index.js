import React from 'react';
import { List } from 'antd-mobile';

import styles from './index.less';

const Item = List.Item;
const Brief = Item.Brief;

function LianList ({ children, ...rest }) {
  return (
    <List {...rest}>
      {children}
    </List>
  );
}

function ArticleItem({ title, likenums, isLike, brief, thumbnail, url, viewnums, onClick, ...rest }) {
  return (
    <Item
      multipleLine
      className={styles.item}
      onClick={onClick}
      extra={thumbnail ? <img alt={title} src={thumbnail} className={styles.thumbnail} /> : null}
    >
      <span className={styles.title}>{title}</span>
      {brief ? <Brief>{brief}</Brief> : <div className={styles.brief}/>}
      <div className={styles.tool}>
        <span className={isLike ? styles.liked : styles.like}>{likenums}</span>
        <span className={styles.viewnums}>{viewnums}</span>
      </div>
    </Item>
  );
}

function VideoItem({ title, likenums, isLike, brief, thumbnail, url, viewnums, onClick, ...rest }) {
  return (
    <Item
      multipleLine
      className={styles.item}
      onClick={onClick}
    >
      <div className={styles.video_view}>
        {url && (
          <video src={url}>
            您的浏览器不支持 video 标签。
          </video>
        )}
        <div className={styles.play} />
      </div>
      <div className={styles.tool}>
        <span className={styles.title}>{title}</span>
        <div style={{ float: 'right' }}>
          <span className={isLike ? styles.liked : styles.like}>{likenums}</span>
          <span className={styles.viewnums}>{viewnums}</span>
        </div>
      </div>
    </Item>
  );
}

LianList.ArticleItem = ArticleItem;
LianList.VideoItem = VideoItem;

export default LianList;
