/**
 * 孕产档案列表
 * created by ADMIN on 2019-07-11 15:50
 */

import React, { PureComponent } from 'react';
import { connect } from 'dva';
import router from 'umi/router';
import classNames from 'classnames';
import { Modal } from 'antd-mobile';
import PageWrapper from '@/components/PageWrapper';

import styles from './index.less';

const alert = Modal.alert;

@connect(({ global, perinatal }) => ({
  dataSource: perinatal.dataSource,
}))
class perinatalList extends PureComponent {
  router = (item, index) => {
    const { dataSource } = this.props;

    if (index === 0) {
      return router.push(item.route);
    }

    if (index === 1) {
      if (!dataSource[0].finished) {
        return alert('提示', '基本信息还没有完成，请完成。', [
          { text: '取消', onPress: () => null, style: 'default' },
          { text: '确定', onPress: () => router.push(dataSource[0].route) },
        ]);
      }
      return router.push(item.route);
    }
    if (index === 2) {
      if (!dataSource[0].finished) {
        return alert('提示', '基本信息还没有完成，请完成。', [
          { text: '取消', onPress: () => null },
          { text: '确定', onPress: () => router.push(dataSource[0].route) },
        ]);
      }
      if (!dataSource[1].finished) {
        return alert('提示', '本孕信息还没有完成，请完成。', [
          { text: '取消', onPress: () => null },
          { text: '确定', onPress: () => router.push(dataSource[1].route) },
        ]);
      }
      return router.push(item.route);
    }
  };

  render() {
    const { dataSource } = this.props;

    return (
      <PageWrapper goBack>
        <ul>
          {dataSource.map((item, i) => {
            return (
              <li key={item.title} className={styles.item} onClick={() => this.router(item, i)}>
                <div>
                  <img alt={item.title} className="img" src={item.img} />
                  <div>
                    <h3 className={styles.title}>{item.title}</h3>
                    <p
                      className={classNames({
                        [styles.status]: true,
                        [styles.finished]: item.finished,
                      })}
                    >
                      {item.finished ? '资料已完成' : '资料未完善，请立即前往 >'}
                    </p>
                  </div>
                </div>
                <span className={styles.arrow} />
              </li>
            );
          })}
        </ul>
      </PageWrapper>
    );
  }
}

export default perinatalList;
