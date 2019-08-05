/* eslint-disable jsx-a11y/no-distracting-elements */
/**
 * 首页
 * created by ADMIN on 2019-07-10
 */

import React, { Component, Fragment } from 'react';
import { connect } from 'dva';
import Link from 'umi/link';
import { WingBlank, WhiteSpace, Grid } from 'antd-mobile';
import Toolbar from '@/components/Toolbar';
import LianList from '@/components/LianList';
import { toURL } from '@/utils';

import styles from './index.less';

const { ArticleItem } = LianList;

@connect(({ loading, home }) => ({
  loading,
  menuLists: home.menuLists,
  toolLists: home.toolLists,
  news: home.news,
}))
class HomePage extends Component {
  componentDidMount() {
    const { dispatch } =this.props;
    /*********************************************/
    dispatch({
      type: 'home/testFetch',
      payload: {}
    });
    /*********************************************/
    dispatch({
      type: 'home/fetchNews',
    });
  }
  render() {
    const { loading, menuLists, toolLists, news } = this.props;

    return (
      <Fragment>
        <WingBlank className={styles.banner}>
          <div className={styles.info}>
            <div>{`${'李公主'}`}</div>
            <div>{`孕 周 : ${'20'}`}</div>
            <div>{`距预产期 : ${'2019-07-02'}`}</div>
            <div>{`还有 : ${'100'} 天`}</div>
          </div>
          <div className={styles.hospital}>天河中医院</div>
          <img alt="banner" className={styles.bg} src={require('../../assets/baby/M1.png')} />
        </WingBlank>

        {/* 走马灯菜单 */}
        <div className={styles.carousel}>
          <ul className={styles.lists}>
            {menuLists.map((item, index) => {
              return (
                <li key={index} className={styles.item} onClick={() => toURL(item.url)}>
                  <div className={styles.icon}>
                    <img alt={item.title} src={item.icon} />
                  </div>
                  <div className={styles.title}>{item.title}</div>
                </li>
              );
            })}
          </ul>
        </div>

        {/* 消息提醒窗口 */}
        <WingBlank className={styles.remind}>
          <div className={styles.title}>提醒 |</div>
          <marquee className={styles.marquee}>
            <div>有新的消息推送...</div>
          </marquee>
        </WingBlank>
        <WhiteSpace style={{ background: '#f8f8f8' }} />

        <WingBlank className={styles.tool}>
          <Toolbar title="孕产工具" />
          <div className={styles.tipContent}>
            <h2>{`第${' 1 '}次产检将到`}</h2>
            <p>{`时间：${`2018-10-10`}`}</p>
          </div>
          <Grid
            data={toolLists}
            onClick={el => toURL(el.url)}
            columnNum={5}
            hasLine={false}
            className={styles.grid}
          />
        </WingBlank>
        <WhiteSpace style={{ background: '#f8f8f8' }} />

        <div className={styles.newsList}>
          <WingBlank>
            <Toolbar title="今日知识" more moreClick={() => toURL('/school')} />
          </WingBlank>
          <LianList>
            {news.map(item => {
              return (
                <ArticleItem
                  key={item.id}
                  title={item.title}
                  likenums={item.favorite}
                  isLike={item.like}
                  brief={item.brief}
                  thumbnail={item.thumbnail}
                  url={item.url}
                  viewnums={item.hits}
                  onClick={() => toURL(`/school/ArticleDetails/${item.id}`)}
                />
              );
            })}
            <div className={styles.more}>
              {loading.effects['home/fetchNews'] ? '正在加载...' : <Link to="/school">想要了解更多知识，请前往孕妇学校...</Link> }
            </div>
          </LianList>
        </div>
      </Fragment>
    );
  }
}

export default HomePage;
