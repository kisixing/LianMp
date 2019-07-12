/*
 * @Description: 孕妇学校
 * @Author: Zhong Jun
 * @Date: 2019-07-10 09:56:22
 */

import React, { Component } from 'react';
import { connect } from 'dva';
import router from 'umi/router';
import { Tabs } from 'antd-mobile';
import classNames from 'classnames';
import PageWrapper from '@/components/PageWrapper';
import styles from './Layout.less';

@connect(({ loading, global, school }) => ({
  loading: loading,
  userId: global.userid,
  tabs: school.tabs,
}))
class Layout extends Component {
  handleChange = tab => {
    router.push(`/school/${tab.type}`);
  };

  renderTab = tab => {
    const {
      location: { pathname },
    } = this.props;
    const currentType = pathname.split('/').slice(-1)[0];
    const { type, title, defaultIcon, activeIcon } = tab;
    return (
      <div
        className={classNames(styles.tab, {
          [styles.active_tab]: type === currentType,
        })}
      >
        <img src={type === currentType ? activeIcon : defaultIcon} alt={title} />
        <span>{title}</span>
      </div>
    );
  };

  render() {
    const { children, tabs, location: { pathname }, } = this.props;
    const currentPage = pathname.split('/').slice(-1)[0];
    return (
      <PageWrapper goBack link="/home">
        <div className={styles.tabs}>
          <Tabs
            tabs={tabs}
            page={currentPage}
            tabBarUnderlineStyle={{ borderColor: '#FFCC4A' }}
            tabBarActiveTextColor="#FFCC4A"
            onChange={this.handleChange}
            renderTab={tab => this.renderTab(tab)}
          >
            {children}
          </Tabs>
        </div>
      </PageWrapper>
    );
  }
}

export default Layout;
