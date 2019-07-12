/**
 * 登录界面
 * created by ADMIN on 2019-07-10 13:02
 */

import React, { Component } from 'react';
import { connect } from 'dva';
import { List, InputItem, Picker, DatePicker, Button, Toast } from 'antd-mobile';
import { createForm } from 'rc-form';
import { checkMobile, checkIdno } from '@/utils';
import styles from './styles.less';

const nowTimeStamp = Date.now();
const minDate = new Date(nowTimeStamp - 1000 * 60 * 60 * 24 * 365);
const maxDate = new Date(nowTimeStamp + 1e7);

@connect(({ loading, login }) => ({
  loading: loading.effects['login/fetchLogin'],
  user: login.user,
  hospitals: login.hospitals,
}))
class Login extends Component {
  state = {
    disabled: false,
  };

  onSubmit = e => {
    e.preventDefault();
    const { form, dispatch } = this.props;
    form.validateFields((error, values) => {
      if (!error) {
        const { userName, gesmoc, mobile, IDNo } = values;
        if (!userName) {
          return Toast.info('请输入姓名!', 2);
        }
        if (!gesmoc) {
          return Toast.info('请输入末次月经时间!', 2);
        }
        const phoneCheckResult = checkMobile(mobile);
        if (!phoneCheckResult.status) {
          return Toast.info(phoneCheckResult.msg, 2);
        }
        const idCheckResult = checkIdno(IDNo);
        if (idCheckResult.ret > 0) {
          return Toast.info(idCheckResult.msg, 2);
        }
        // 全部验证后fetch bind user
        const payload = {
          userName,
          gesmoc,
          mobile,
          IDNo,
          openId: sessionStorage.getItem('openId'),
        };
        dispatch({
          type: 'login/fetchLogin',
          payload,
        });
      }
    });
  };

  render() {
    const { loading, hospitals, form } = this.props;
    const { disabled } = this.state;
    const { getFieldProps } = form;

    return (
      <div className={styles.wrapper}>
        <h1>用户登录</h1>
        <List.Item>
          <InputItem
            {...getFieldProps('userName', {
              initialValue: '李师师',
              rules: [{ required: false }],
            })}
            clear
            type="text"
            placeholder="输入姓名"
          >
            姓名
          </InputItem>
        </List.Item>
        <List.Item>
          <DatePicker
            {...getFieldProps('gesmoc', {
              initialValue: new Date(),
              rules: [{ required: false }],
            })}
            clear
            mode="date"
            title="输入末次月经"
            extra="输入末次月经"
            minDate={minDate}
            maxDate={maxDate}
          >
            <List.Item arrow="horizontal">末次月经</List.Item>
          </DatePicker>
        </List.Item>
        <List.Item>
          <InputItem
            {...getFieldProps('mobile', {
              initialValue: '13657721212',
              rules: [{ required: false }],
            })}
            clear
            type="phone"
            placeholder="输入手机号码"
            disabled={disabled}
          >
            手机号
          </InputItem>
        </List.Item>
        <List.Item>
          <InputItem
            {...getFieldProps('IDNo', {
              initialValue: '450301198709213381',
              rules: [{ required: false }],
            })}
            clear
            type="digit"
            placeholder="输入身份证"
            disabled={disabled}
          >
            身份证号
          </InputItem>
        </List.Item>
        <List.Item>
          <Picker
            cols={1}
            extra="请选择医院"
            data={hospitals}
            title="请选择医院"
            {...getFieldProps('hospital', {
              rules: [{ required: false }],
            })}
          >
            <List.Item arrow="horizontal">医院</List.Item>
          </Picker>
        </List.Item>
        <List.Item className={styles.button}>
          <Button type="primary" loading={loading} onClick={this.onSubmit}>
            登录
          </Button>
        </List.Item>
      </div>
    );
  }
}

export default createForm()(Login);
