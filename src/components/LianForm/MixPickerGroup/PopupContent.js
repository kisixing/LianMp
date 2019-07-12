import React, { Component } from 'react';
import { TextareaItem } from 'antd-mobile';
import classNames from 'classnames';

import styles from './PopupContent.less';

class PopupContent extends Component {
  state = {
    dataSource: [],
    value: [],
    textarea: ''
  };

  componentDidMount() {
    const { value, data } = this.props;
    // data --> [{ label: '', value: '', selected: boole }]
    const dataSource = data.map((item) => {
      let selected = false;
      value.forEach((i) => {
        if (i === item) {
          selected = true;
        }
      });
      return {
        value: item,
        selected,
      }
    });

    // init data是否有value，如没有则赋值text area
    let textarea = '';
    value.forEach((item) => {
      const isHave = data.find(e => e === item);
      if (!isHave) {
        textarea = item;
      }
    })

    this.setState({ dataSource, value, textarea });
  }

  onClick = (item) => {
    const { dataSource, value } = this.state;
    const { type } = this.props;
    let newDataSource = [];
    let newValue = [];

    if (type === 'multiple') {
      // 多选
      if (item.value === '无') {
        // tab === '无'
        if (item.value === value[0] ) {
          return
        }
        newDataSource = dataSource.map(({ value }) => {
          let selected = false;
          if (value === '无') {
            selected = true;
          }
          return {
            value,
            selected,
          }
        });
        newValue = ['无'];
        console.log('multiple 选择‘无’', newDataSource, newValue)
      } else {
        // 确定current tab
        // const index = dataSource.findIndex(({ value }) => value === item.value);
        // dataSource[index] = { value: item.value, selected: !item.selected };
        // dataSource[0] = { value: '无', selected: false };
        // newDataSource = dataSource;
        newDataSource = dataSource.map((e) => {
          let selected = e.selected;
          if (e.value === '无') {
            // 剔除tab='无'
            selected = false;
          }
          if (e.value === item.value) {
            selected = !selected;
          }
          return {
            value: e.value,
            selected,
          }
        });
        // 取选中的array value
        let filterValue = newDataSource.filter(({ selected }) => selected);
        newValue = filterValue.map(({ value }) => value);
        console.log('multiple onchange', dataSource, newValue);
      }
      // this.setState({ dataSource, value: newValue });
    } else {
      // 单选 不可取消选择，若无选择，请选择‘无’
      if (item.value === value[0]) {
        // 是否为已经选中的tab,true则不可继续
        return;
      }
      newDataSource = dataSource.map(({ value }) => {
        let selected = false;
        if (value === item.value) {
          selected = true;
        }
        return {
          value,
          selected,
        }
      });
      newValue = [item.value];
      console.log('radio onchange', newDataSource, [item.value] );
    }

    this.setState({ dataSource: newDataSource, value: newValue });
  }

  onChange = (value) => {
    console.log('text area', value);
    this.setState({ textarea: value });
  };

  render () {
    const { dataSource, textarea } = this.state;
    return (
      <div>
        <div className={styles.wrapper}>
          {dataSource.length && dataSource.map(({ value, selected }) => (
            <div
              key={value}
              className={classNames(styles.item, {[styles.selected]: selected })}
              onClick={() => this.onClick({ value, selected })}
            >
              {value}
            </div>
          ))}
        </div>
        <div className={styles.textarea}>
          <TextareaItem
            rows={3}
            labelNumber={3}
            placeholder={'可输入补充...'}
            value={textarea}
            onChange={this.onChange}
          />
        </div>
      </div>
    );
  }
}

export default PopupContent;
