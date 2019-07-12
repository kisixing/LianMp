/**
 * 页面layout wrapper包含返回按钮
 */
import React, { Component, Fragment } from 'react';
import router from 'umi/router';
import { WingBlank, WhiteSpace } from 'antd-mobile';
import Toolbar from '../Toolbar';
import styles from './index.less';

export default class Page extends Component {

  componentWillMount() {
    const scrollTop = document.body.scrollTop || document.documentElement.scrollTop;
    if (scrollTop) {
      document.body.scrollTop = 0;
      document.documentElement.scrollTop = 0;
    }
  }

  componentDidMount() {
    setTimeout(() => {
      this.setState({
        isShow: false
      })
    }, 250);
  }

  onClick = () => {
    const { link } = this.props;
    if (!link) {
      return router.goBack();
    }
    return router.push(link);
  };

  render() {
    const { children, goBack, title, buttonText } = this.props;

    return (
      <Fragment>
        {goBack ? <div className={styles.button} onClick={this.onClick}>{buttonText || '返回'}</div> : null}
        {title ? (
          <div>
            <WingBlank>
              <Toolbar title={title} />
            </WingBlank>
            <WhiteSpace style={{ background: '#f8f8f8' }} />
          </div>
        ) : null}
        {children}
      </Fragment>
    );
  }
}
