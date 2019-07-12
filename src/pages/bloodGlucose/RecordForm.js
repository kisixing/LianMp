/**
 * title:血糖记录
 * created by ADMIN on 2019-07-10
 */
import React, { Component } from 'react';
import { connect } from 'dva';
import { Accordion, WingBlank, WhiteSpace } from 'antd-mobile';
import { Axis, Chart, Geom, Legend, Tooltip } from 'bizcharts';
import DataSet from '@antv/data-set';
import moment from 'moment';
import classNames from 'classnames';

import PageWrapper from '@/components/PageWrapper';
import Toolbar from '@/components/Toolbar';
import styles from './RecordForm.less';

// 初始化chart数据
const tabs = [
  {
    time: "早餐前",
    name: 'beforeBreakfast',
    min: 3.3,
    max: 5.3
  },
  {
    time: "早餐后",
    name: 'afterBreakfast',
    min: 4.4,
    max: 6.7
  },
  {
    time: "午餐前",
    name: 'beforeLunch',
    min: 3.3,
    max: 5.8
  },
  {
    time: "午餐后",
    name: 'afterLunch',
    min: 4.4,
    max: 6.7
  },
  {
    time: "晚餐前",
    name: 'beforeDinner',
    min: 3.3,
    max: 5.8
  },
  {
    time: "晚餐后",
    name: 'afterDinner',
    min: 4.4,
    max: 6.7
  },
  {
    time: "睡前",
    name: 'beforeSleep',
    min: 4.4,
    max: 6.7
  }
];

@connect(({ global, bloodGlucose }) => ({
  userid: global.userid,
  bloodGlucose: bloodGlucose.bloodGlucose,
  dataLists: bloodGlucose.dataLists,
  defaultActiveKey: bloodGlucose.defaultActiveKey,
}))
class RecordForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      date: moment().format('YYYY-MM-DD'),
      dataSource: tabs,
      currentBloodGlucose: {}
    }
  }

  componentDidMount() {
    const { userid, dispatch } = this.props;
    dispatch({
      type: 'bloodGlucose/query',
      payload: { userid }
    })
      .then(() => {
        const currentBloodGlucose = this.props.bloodGlucose;
        const dataSource = this.state.dataSource;
        const data = this.transformChart(currentBloodGlucose, dataSource);
        this.setState({
          currentBloodGlucose,
          dataSource: data
        })
      })
  }

  listItem = (item) => {
    const data = tabs.map((e, i) => {
      return {
        key: i,
        title: e.time,
        name: e.name,
        value: item[e.name],
        status: this.checkBloodGlucoses(i, item[e.name])
      }
    });
    return (
      <Accordion.Panel
        key={item.id}
        header={<div onClick={() => this.onClick(item)}>{item.date}</div>}
      >
        <ol className={styles.content}>
          {data.map(e => {
            return (
              <li key={e.key} className={classNames(styles.item, {[styles.abnormalItem]: !e.status})}>
                <span className={styles.title}>{e.title}</span>
                <span>{`${e.value} mmol/L`}</span>
                <span>{e.status ? '正常' : '异常'}</span>
              </li>
            );
          })}
        </ol>
      </Accordion.Panel>
    );
  };

  /**
   * 血糖值正常判断
   * 正常值如下：
   * 空腹血糖正常值为3.3-5.3mmol/L（早餐前）
   * 餐后1小时正常血糖值不得超过6.7mmol/L
   * 餐后2小时正常血糖值规定不得超过5.8mmol/L
   * */
  checkBloodGlucoses = (key, data) => {
    if (key === 0) {
      // 空腹 早餐前
      return data >= 3.3 && data <= 5.3;
    } else if (key !== 0 && key % 2 === 0) {
      // 餐前
      return data >= 3.3 && data <= 5.8;
    } else {
      // 餐后
      return data >= 4.4 && data <= 6.7;
    }
  };

  /**
   *
   * @param currentBloodGlucose {array}
   * @param dataSource {array}
   */
  transformChart = (currentBloodGlucose, dataSource) => {
    return dataSource.map(e => ({
      ...e,
      value: currentBloodGlucose[e.name],
    }));
  };

  onChange = (e) => {
    // console.log('onChange', e)
  };

  onClick = (item) => {
    const dataSource = this.transformChart(item, this.state.dataSource);
    this.setState({
      dataSource,
      currentBloodGlucose: item
    });
  };

  render() {
    const { dataLists, defaultActiveKey } = this.props;

    const ds = new DataSet();
    const dv = ds.createView().source(this.state.dataSource);
    dv.transform({
      type: "fold",
      fields: ["min", "max", "value"],
      // 展开字段集
      key: "type",
      // key字段
      value: "temperature"
      // value字段
    });
    const cols = {
      value: {
        alias: '检测值',
        range: [0, 1]
      }
    };

    return (
      <PageWrapper goBack>
        <div>
          <WingBlank>
            <Toolbar
              more
              title={<div>今日血糖曲线<span className={styles.units}>（单位：mmol/L）</span></div>}
              subTitle={<span className={styles.units}>{this.state.currentBloodGlucose.date}</span>}
            />
          </WingBlank>

          <Chart height={280} data={dv} scale={cols} padding={['auto', 'auto', 'auto', 'auto']} forceFit>
            <Legend
              itemFormatter={val => {
                const obj = {"value": "实测数据", "max": "最大值", "min": "最小值"};
                return obj[val]; // val 为每个图例项的文本值
              }}
            />
            <Axis name="time" />
            <Axis
              name="temperature"
              label={{
                formatter: val => `${val}`
              }}
            />
            <Tooltip
              crosshairs={{
                type: "y"
              }}
            />
            <Geom
              type="line"
              position="time*temperature"
              size={2}
              color={["type", ["#ddd", "#ddd", "#ff6084"]]}
              shape={"smooth"}
              style={["type*temperature", {
                lineWidth: 1,
                lineDash: (type, temperature) => {
                  if(type !== 'value') {
                    return [4, 4];
                  }
                },
              }]}
              tooltip={['type*temperature', (type, temperature) => {
                const obj = {"value": "实测数据", "max": "最大值", "min": "最小值"};
                return {
                  name: obj[type],
                  value: `${temperature} kg`
                }
              }]}
            />
            <Geom
              type="point"
              position="time*temperature"
              size={3}
              shape={"circle"}
              color={["type", ["#ddd", "#ddd", "#ff6084"]]}
              style={{
                stroke: "#fff",
                lineWidth: 1
              }}
              tooltip={['type*temperature', (type, temperature) => {
                const obj = {"value": "实测数据", "max": "最大值", "min": "最小值"};
                return {
                  name: obj[type],
                  value: `${temperature} kg`
                }
              }]}
            />
          </Chart>
        </div>
        <WhiteSpace style={{ backgroundColor: 'f8f8f8' }} />
        <WingBlank>
          <Toolbar
            more
            title={'历史记录'}
            subTitle={<span className={styles.units}>{`共 ${dataLists.length} 条`}</span>}
          />
          {dataLists && dataLists.length ? (
            <Accordion defaultActiveKey={defaultActiveKey} className={styles.accordion} onChange={this.onChange}>
              {dataLists.map(item => {
                return this.listItem(item);
              })}
            </Accordion>
          ) : (<div className={styles.blank}>暂无数据...</div>)}
        </WingBlank>
      </PageWrapper>
    );
  }
}

export default RecordForm;
