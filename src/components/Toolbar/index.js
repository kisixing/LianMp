import React from 'react';
import PropTypes from 'prop-types';
import styles from './index.less';

function Toolbar({ title, more, subTitle, moreClick}) {
  return (
    <div className={styles.toolbar}>
      <span className={styles.title}>{title}</span>
      {more ? <span className={styles.more} onClick={moreClick}>{subTitle}</span> : null}
    </div>
  );
}

Toolbar.propTypes = {
  title: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.element,
  ]),
  onClick: PropTypes.func
};

Toolbar.defaultProps = {
  more: false,
  title: '标签卡title',
  subTitle: '更多',
  moreClick: null
};

export default Toolbar;
