/**
 * title: 围产档案-基本信息
 */

import React, { Component } from 'react';
import { connect } from 'dva';
import classNames from 'classnames';
import { createForm, formShape } from 'rc-form';
import createDOMForm from 'rc-form/lib/createDOMForm';

import { WingBlank, WhiteSpace, Toast, Button } from 'antd-mobile';

import { List, InputGroup, PickerGroup, TextareaGroup, MixPickerGroup } from '@/components/LianForm';
import PageWrapper from '@/components/PageWrapper';
import StepsBar from '@/components/StepsBar';

import styles from './index.less';

const Item = List.Item;

@connect(({ perinatal, perinatalUser }) => ({
  fieldLabels: perinatalUser.fieldLabels,
  perinatalList: perinatal.dataSource
}))
class UserBaseInfo extends Component {
  static propTypes = {
    form: formShape,
  };
  state = {};

  componentDidMount () {
    this.setFieldsValue();
  }

  setFieldsValue = () => {
    this.props.form.setFieldsValue({
      userconstant: '北京市,东城区'.split(','),
    }, () => console.log('after'));
    console.log('before');
  };

  submit = () => {
    this.props.form.validateFieldsAndScroll((error, value) => {
      const { formList } = this.props;
      console.log(error, value);
      if (error) {
        for (let index = 0; index < formList.length; index++) {
          if (formList[index]['required']) {
            const valueKey = formList[index]['name'];
            const message = error[valueKey]['errors'][0]['message'];
            Toast.info(message, 2);
            return;
          }
        }
        return;
      }

      // if (!this.checkValueRequired(value, formList)) {
      //   return console.log('取消submit')
      // };
      console.log('表单通过验证')
    });
  };

  checkValueRequired = (endList, initList) => {
    for (let index = 0; index < initList.length; index++) {
      if (initList[index]['required']) {
        const valueKey = initList[index]['name'];
        const value = endList[valueKey];
        if (value === undefined) {
          const message = initList[index]['placeholder'];
          Toast.info(message, 2);
          document.getElementById(valueKey).scrollIntoView(true);
          return false;
        }
        return true;
      }
    }
  };

  renderItem = (item, i) => {
    const form = this.props.form;
    switch (item.inputType) {
      case 'line':
        return <WhiteSpace key={i} style={{ backgroundColor: '#f8f8f8'}} />;
      case 'input':
        return (
          <InputGroup
            key={item.name}
            form={form}
            labelProps={{
              title: item.title,
              required: item.required
            }}
            inputProps={{
              name: item.name,
              type: item.type,
              placeholder: item.placeholder
            }}
          />
        );
      case 'textarea':
        return (
          <TextareaGroup
            key={item.name}
            form={form}
            labelProps={{
              title: item.title,
              required: item.required
            }}
            textareaProps={{
              name: item.name,
              type: item.type,
              placeholder: item.placeholder
            }}
          />
        );
      case 'picker':
        return (
          <PickerGroup
            key={item.name}
            form={form}
            labelProps={{
              title: item.title,
              required: item.required,
              type: item.required,
            }}
            pickerProps={{
              placeholder: item.placeholder,
              type: item.type,
              name: item.name,
              initialValue: item.value ? item.value.split(','): '',
              data: item.specialProps ? item.specialProps.list : null,
            }}
          />
        );
      case 'mixPicker':
        return (
          <MixPickerGroup
            key={item.name}
            form={form}
            labelProps={{
              title: item.title,
              required: item.required,
              type: item.required,
            }}
            pickerProps={{
              placeholder: item.placeholder,
              type: item.type, // 单选多选判断
              name: item.name,
              initialValue: item.value,
              data: item.specialProps ? item.specialProps : null,
            }}
          />
        );
      default:
        return;
    }
  };

  render () {
    const { perinatalList, fieldLabels} = this.props;
    return (
      <PageWrapper goBack>
        <WingBlank >
          <StepsBar dataSource={perinatalList} current={0} />
        </WingBlank>


        <WhiteSpace style={{ backgroundColor: '#f8f8f8'}} />
        <List>
          {fieldLabels.map((item, i) => {
            return this.renderItem(item, i);
          })}
        </List>

        <WhiteSpace style={{ backgroundColor: '#f8f8f8'}} />

        <WingBlank className={styles.button}>
          <Button type="primary" onClick={this.submit}>保存</Button>
        </WingBlank>
      </PageWrapper>
    );
  }
}

export default createDOMForm()(UserBaseInfo);
