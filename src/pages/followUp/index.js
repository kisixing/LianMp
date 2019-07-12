/**
 * title: 随访记录
 */
import React, { Component } from 'react';
import { connect } from 'dva';
import router from 'umi/router';
import { List, ActivityIndicator } from 'antd-mobile';

import PageWrapper from '@/components/PageWrapper';
import styles from './index.less';

const Item = List.Item;
const Brief = Item.Brief;

@connect(({ loading, global, followUp }) => ({
  loading: loading.effects['followUp/query'],
  userId: global.userid,
  dataSource: followUp.followUpList,
}))
class FollowUpList extends Component {
  state = {};

  componentDidMount() {
    const { dispatch } = this.props;
    dispatch({
      type: 'followUp/query',
    })
  }

  render() {
    const { loading, dataSource } = this.props;

    return (
      <PageWrapper goBack title="随访记录">
        <List>
          {loading ? (
            <div className={styles.loading}>
              <ActivityIndicator size="small" text="正在加载..."/>
            </div>
          ) : dataSource && dataSource.length ? (
            dataSource.map((item, i) => {
              return (
                <Item
                  key={`${item.title}-${i}`}
                  arrow="horizontal"
                  multipleLine
                  thumb={
                    <div className={styles.thumb_bg}>
                      {item.num > 0 && <span>{item.num}</span>}
                    </div>
                  }
                  onClick={() => router.push({ pathname: '/followUp/details', query: { url: item.url }})}
                >
                  <div>{item.title}</div>
                  <Brief>{item.time || ''}</Brief>
                </Item>
              );
            })
          ) : <div className={styles.no_record}>暂无记录...</div>}
        </List>
      </PageWrapper>
    );
  }
}

export default FollowUpList;
