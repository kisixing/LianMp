/**
 * title: 内容详情
 */
import React, { PureComponent } from 'react';
import { connect } from 'dva';
import { Player, BigPlayButton, LoadingSpinner, ControlBar, ReplayControl } from 'video-react';
import Page from '@/components/Page';
import 'video-react/dist/video-react.css';
import styles from '../ArticleDetails/index.less';

@connect(({ global, school }) => ({
  userid: global.userid,
  details: school.details
}))
class VideoDetails extends PureComponent {
  state = {};

  handleLike = () => {
    const { dispatch, details, userid } = this.props;
    const { like, id } = details;
    if (like) {
      dispatch({
        type: 'school/undoFavor',
        payload: {
          id,
          userid,
          type: 'video'
        }
      })
    } else {
      dispatch({
        type: 'school/doFavor',
        payload: {
          id,
          userid,
          type: 'video'
        }
      })
    }
  };

  render() {
    const location = this.props.location;
    const { title, favorite, hits, like, content, url, id } = location.state;
    return (
      <Page>
        <h2 className={styles.title}>{title}</h2>
        <div className={styles.tools}>
          <span
            className={like ? styles.liked : styles.like}
            onClick={this.handleLike}
          >
            {favorite}
          </span>
          <span className={styles.viewnums}>{hits}</span>
          <div className={styles.html_view}>
            <Player autoPlay src={url}>
              <BigPlayButton position="center" />
              <LoadingSpinner />
              <ControlBar autoHide={false} className="my-class">
                <ReplayControl seconds={5} order={2.1} />
              </ControlBar>
              {/*<source src={url} />*/}
            </Player>
          </div>

          {/*<span className={styles.share} onClick={this.isShowMasking} >分享</span>*/}
        </div>
        <div>

        </div>
      </Page>
    );
  }
}

export default VideoDetails;
