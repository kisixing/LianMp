/**
 * title: 体重监测
 * created by ADMIN on 2019-07-10
 */
import React, { Component } from 'react';
import { connect } from 'dva';
import Link from 'umi/link';
import { WingBlank, Toast, Modal, Button } from 'antd-mobile';
import moment from 'moment';
import PageWrapper from '@/components/PageWrapper';
import GaugeInput from '@/components/GaugeInput';

import styles from './index.less';
const alert = Modal.alert;

const scale = {
  value: {
    min: 0,
    max: 80,
    tickInterval: 10,
    nice: true,
  },
};

@connect(({ global, weight }) => ({
  userid: global.userid,
  value: weight.value,
}))
class WeightInput extends Component {
  constructor(props) {
    super(props);
    this.state = {
      date: moment().format('YYYY-MM-DD'),
      value: ''
    }
  }

  onSubmit = () => {
    const { userid, dispatch } = this.props;
    const { value, date } = this.state;
    const params = {
      userid,
      date,
      weight: value,
    };
    if (!value || value === '0') {
      Toast.info('请输入监测体重值！', 1);
    } else if (parseInt(value) < 30 ) {
      alert('提示', '您输入的体重值过低，是否继续？', [
        { text: '否', onPress: () => {}, style: 'default' },
        { text: '是', onPress: () => {
            dispatch({
              type: 'weight/recordWeight',
              payload: params
            });
        }},
      ]);
    } else {
      dispatch({
        type: 'weight/recordWeight',
        payload: params
      });
    }
  };

  onChange = (e) => {
    const value = e.target.value;
    this.setState({ value });
  };

  render() {
    const { date, value } = this.state;
    return (
      <PageWrapper goBack title={date}>
        <WingBlank className={styles.record}>
          <Link to="weight/record">历史纪录</Link>
        </WingBlank>
        {/* 图形化输入界面 */}
        <GaugeInput value={value} scale={scale} onChange={this.onChange} />
        <WingBlank>
          <Button type="primary" onClick={this.onSubmit}>保存</Button>
        </WingBlank>
      </PageWrapper>
    );
  }
}

export default WeightInput;
