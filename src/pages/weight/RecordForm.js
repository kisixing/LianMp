/**
 * title:体重记录
 * created by ADMIN on 2019-07-10
 */
import React, { Component } from 'react';
import { connect } from 'dva';
import { WingBlank, WhiteSpace } from 'antd-mobile';
import { Chart, Geom, Axis, Tooltip, Legend } from "bizcharts";
import DataSet from "@antv/data-set";
import moment from 'moment';
import classNames from 'classnames';

import PageWrapper from '@/components/PageWrapper';
import Toolbar from '@/components/Toolbar';
import styles from './RecordForm.less';

@connect(({ global, weight }) => ({
  userid: global.userid,
  dataLists: weight.dataLists,
}))
class RecordForm extends Component {
  state = {
    date: moment().format('YYYY-MM-DD'),
  };
  componentDidMount() {
    const { userid, dispatch } = this.props;
    dispatch({
      type: 'weight/queryWeight',
      payload: { userid }
    })
  }

  listItem = (item) => {
    return (
      <div className={classNames(styles.item, {[styles.unusualItem]: !!item.status})}>
        <div className={styles.left}>
          <div>{item.date}</div>
          <p>{item.status ? '正常' : '异常'}</p>
        </div>
        <div className={styles.right}>
          {`${item.value} kg`}
        </div>
      </div>
    );
  };

  render() {
    const data = this.props.dataLists;
    const amount = data && data.length;
    const ds = new DataSet();
    const dv = ds.createView().source(data);
    dv.transform({
      type: "fold",
      fields: ["value", "reference"],
      // 展开字段集
      key: "type",
      // key字段
      value: "weight"
      // value字段
    });
    const cols = {
      weight: {
        type: "linear",
        min: 20, // 定义数值范围的最小值
        max: 80, // 定义数值范围的最大值
      }
    };
    return (
      <PageWrapper goBack>
        <div className={styles.chart}>
          <WingBlank>
            <Toolbar
              title={
                <div>
                  体重曲线<span className={styles.units}>（单位：kg）</span>
                </div>
              }
            />
          </WingBlank>

          <Chart
            height={280}
            data={dv}
            scale={cols}
            padding={['auto', 'auto', 'auto', 'auto']}
            placeholder={'暂无数据'}
            forceFit
          >
            <Legend
              itemFormatter={val => {
                const obj = { value: '实测数据', reference: '参考数据' };
                return obj[val]; // val 为每个图例项的文本值
              }}
            />
            <Axis
              name="date"
              label={{
                formatter: val => val.slice(5),
              }}
              grid={{
                type: 'line',
                lineStyle: {
                  stroke: '#eee', // 网格线的颜色
                  lineWidth: 1, // 网格线的宽度复制代码
                  lineDash: [4, 4],
                },
              }}
            />
            <Axis
              name="weight"
              label={{
                formatter: val => `${val}`,
              }}
              line={{
                lineWidth: 1,
                stroke: '#ccc',
              }}
              tickLine={{
                lineWidth: 1, // 刻度线宽
                stroke: '#ccc', // 刻度线的颜色
                length: 5,
              }}
            />
            <Tooltip
              crosshairs={{
                type: 'y',
              }}
            />
            <Geom
              type="line"
              position="date*weight"
              size={2}
              color={['type', ['#ff6084', '#ddd']]}
              shape={'smooth'}
              style={[
                'type*weight',
                {
                  lineWidth: 1,
                  stroke: (type, weight) => {
                    if (type === 'reference') {
                      return '#ff0000';
                    }
                    return '#00ff00';
                  },
                  lineDash: (type, weight) => {
                    if (type === 'reference') {
                      return [4, 4];
                    }
                  },
                },
              ]}
              tooltip={[
                'type*weight',
                (type, weight) => {
                  const obj = { value: '实测数据', reference: '参考数据' };
                  return {
                    name: obj[type],
                    value: `${weight} kg`,
                  };
                },
              ]}
            />
            <Geom
              type="point"
              position="date*weight"
              size={3}
              shape={'circle'}
              color={'#ddd'}
              style={{
                stroke: '#fff',
                lineWidth: 1,
              }}
              tooltip={[
                'type*weight',
                (type, weight) => {
                  const obj = { value: '实测数据', reference: '参考数据' };
                  return {
                    name: obj[type],
                    value: `${weight} kg`,
                  };
                },
              ]}
            />
          </Chart>
        </div>
        <WhiteSpace style={{ backgroundColor: '#f8f8f8' }} />
        <WingBlank>
          <Toolbar title="历史记录" subTitle={`共 ${amount} 条`} more />
          {data && data.length ? (
            data.map(item => {
              return this.listItem(item);
            })
          ) : (
            <div className={styles.blank}>暂无数据...</div>
          )}
        </WingBlank>
      </PageWrapper>
    );
  }
}

export default RecordForm;
