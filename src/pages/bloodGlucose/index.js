/**
 * title: 血糖记录
 * created by ADMIN on 2019-07-10
 */
import React, { Component } from 'react';
import { connect } from 'dva';
import Link from 'umi/link';
import { WingBlank, Tabs, Button } from 'antd-mobile';
import moment from 'moment';
import PageWrapper from '@/components/PageWrapper';
import GaugeInput from '@/components/GaugeInput';

import styles from './index.less';

const tabs = [
  { title: '早餐前', name: 'beforeBreakfast', value: '' },
  { title: '早餐后', name: 'afterBreakfast', value: '' },
  { title: '午餐前', name: 'beforeLunch', value: '' },
  { title: '午餐后', name: 'afterLunch', value: '' },
  { title: '晚餐前', name: 'beforeDinner', value: '' },
  { title: '晚餐后', name: 'afterDinner', value: '' },
  { title: '睡前', name: 'beforeSleep', value: '' },
];

const scale = {
  value: {
    min: 0,
    max: 12,
    tickInterval: 3,
    nice: true,
  },
};

const label = {
  name: '',
  title: '血糖',
  unit: 'mmol/L'
};

@connect(({ global, bloodGlucose }) => ({
  userid: global.userid,
  bloodGlucose: bloodGlucose.bloodGlucose,
}))
class BloodGlucose extends Component {
  constructor(props) {
    super(props);
    this.state = {
      date: moment().format('YYYY-MM-DD'),
      bloodGlucose: {}
    }
  }

  componentDidMount() {
    const { userid, bloodGlucose, dispatch } = this.props;
    const { date } = this.state;
    const params = {
      userid,
      bTime: date,
      eTime: date
    };
    dispatch({
      type: 'bloodGlucose/query',
      payload: params,
    })
      .then(() => {
        this.setState({ bloodGlucose: this.props.bloodGlucose });
      });
  }

  onChange = (e) => {
    const value = e.target.value;
    const name = e.target.name;
    const newBloodGlucose = {
      ...this.state.bloodGlucose,
      [name]: value
    };
    this.setState({
      bloodGlucose: newBloodGlucose
    });
  };

  onSubmit = () => {
    const { userid, dispatch } = this.props;
    const { date, bloodGlucose } = this.state;
    const params = {
      ...bloodGlucose,
      userid,
      date,
    };
    dispatch({
      type: 'bloodGlucose/record',
      payload: params
    })
  };

  renderContent = tab => {
    const { bloodGlucose } = this.state;
    return (
      <div className={styles.content}>
        <GaugeInput name={tab.name} value={bloodGlucose[tab.name] || ''} scale={scale} label={label} onChange={this.onChange} />
      </div>
    );
  };

  render() {
    const { bloodGlucose } = this.state;
    return (
      <PageWrapper goBack title={moment().format('YYYY-MM-DD')}>
        <WingBlank style={{ position: 'relative '}}>
          <div className={styles.record}>
            <Link to="bloodGlucose/record">历史记录</Link>
          </div>
          <Tabs
            tabs={tabs}
            animated={false}
            tabBarActiveTextColor={"#FFCC4A"}
            tabBarUnderlineStyle={{ borderColor: '#FFCC4A' }}
            renderTabBar={props => <Tabs.DefaultTabBar {...props} page={5} />}
          >
            {this.renderContent}
          </Tabs>
          <Button
            type="primary"
            onClick={this.onSubmit}
          >
            保存
          </Button>
        </WingBlank>
      </PageWrapper>
    );
  }
}

export default BloodGlucose;
