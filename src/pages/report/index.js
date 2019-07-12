/**
 * title: 产检报告
 */
import React, { Component } from 'react';
import { connect } from 'dva';
import router from 'umi/router';
import { List } from 'antd-mobile';

import PageWrapper from '@/components/PageWrapper';
import styles from './index.less';

const Item = List.Item;
const Brief = Item.Brief;

@connect(({ global, report }) => ({
  userid: global.userid,
  dataSource: report.bbsList,
}))
class BBSList extends Component {
  state = {};

  render() {
    const { loading, dataSource } = this.props;
    return (
      //  loading={loading.effects['report/queryBBSList']}
      <PageWrapper goBack title="bbs电子报告">
        <List>
          {dataSource && dataSource.length ? (
            dataSource.map((item) => {
              return (
                <Item
                  key={item.id}
                  arrow="horizontal"
                  thumb={
                    <div className={styles.thumb_bg}>
                      {item.num > 0 && <span>{item.num}</span>}
                    </div>
                  }
                  multipleLine
                  onClick={() => router.push({ pathname: '/report/pdfview', query: { url: item.url }})}
                >
                  <div>{item.title}</div>
                  <Brief>{item.dec}</Brief>
                </Item>
              );
            })
            ) : <div className={styles.no_record}>暂无记录...</div>}
        </List>
      </PageWrapper>
    );
  }
}

export default BBSList;
