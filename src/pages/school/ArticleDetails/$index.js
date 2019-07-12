/**
 * title 内容详情
 */
import React, { PureComponent } from 'react';
import { connect } from 'dva';
import Page from '@/components/Page';

import styles from './index.less';

@connect(({ global, school }) => ({
  userid: global.userid,
  details: school.details
}))
class ArticleDetails extends PureComponent {
  state = {
    isShare: false
  };

  isShowMasking = () => {
    this.setState(state => {
      return {
        isShare: !state.isShare
      }
    })
  };

  handleLike = () => {
    const { dispatch, details, userid } = this.props;
    const { like, id } = details;
    if (like) {
      dispatch({
        type: 'school/undoFavor',
        payload: {
          id,
          userid,
          type: 'article'
        }
      })
    } else {
      dispatch({
        type: 'school/doFavor',
        payload: {
          id,
          userid,
          type: 'article'
        }
      })
    }
  };

  render() {
    const { isShare } = this.state;
    const { title, favorite, hits, like, content, id } = this.props.details;
    return (
      <Page goBack>
        {/* 分享蒙版 */}
        {isShare ? <div className={styles.shareMark} onClick={this.isShowMasking} /> : null}
        {/* article title */}
        <h2 className={styles.title}>{title}</h2>
        <div className={styles.tools}>
          <span
            className={like ? styles.liked : styles.like}
            onClick={this.handleLike}
          >
            {favorite}
          </span>
          <span className={styles.viewnums}>{hits}</span>
          <span className={styles.share} onClick={this.isShowMasking} >分享</span>
        </div>
        <div className={styles.html_view} dangerouslySetInnerHTML={{ __html: content }}></div>
      </Page>
    );
  }
}

export default ArticleDetails;
