/*
 * @Description: 文章列表
 * @Author: Zhong Jun
 * @Date: 2019-07-10 10:12:24
 */

import React, { PureComponent } from 'react';
import router from 'umi/router';
import { connect } from 'dva';
import { ActivityIndicator } from 'antd-mobile';
import LianList from '@/components/LianList';
import styles from './Layout.less';

const { VideoItem } = LianList;

@connect(({ loading, school }) => ({
  loading: loading.effects['school/queryVideo'],
  dataSource: school.video,
}))
class Video extends PureComponent {
  componentDidMount() {
    const { dispatch } = this.props;
    dispatch({
      type: 'school/queryVideo',
      payload: {
        type: 'video'
      }
    })
  }
  handleClick = item => {
    router.push({
      pathname: `/school/VideoDetails/${item.id}`,
      state: item
    });
  };

  render() {
    const { loading, dataSource } = this.props;

    if (loading) {
      return (
        <div className={styles.loading}>
          <ActivityIndicator size="small" text="正在加载..."/>
        </div>
      );
    }
    if (dataSource && dataSource.length === 0) {
      return <div className={styles.loading}>暂无数据...</div>;
    }
    return (
      <LianList>
        {dataSource.map((item) => (
          <VideoItem
            key={item.id}
            title={item.title}
            likenums={item.favorite}
            isLike={item.like}
            brief={item.brief}
            thumbnail={item.thumbnail}
            url={item.url}
            viewnums={item.hits}
            onClick={() => this.handleClick(item)}
          />
        ))
        }
      </LianList>
    );
  }
}

export default Video;
