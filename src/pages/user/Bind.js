/**
 * 用户绑定
 * created by ADMIN on 2019-07-10 15:18
 */

import React, { Component } from 'react';
import { connect } from 'dva';
import { List, InputItem, Button, Toast } from 'antd-mobile';
import { createForm, formShape } from 'rc-form';
import { checkMobile, checkIdno } from '@/utils';
import styles from './styles.less';

@connect(({ login, loading }) => ({
  loading: loading.effects['login/bindUser'],
  user: login.user,
  captcha: login.captcha,
}))
class Bind extends Component {
  static propTypes = {
    form: formShape,
  };

  state = {
    mobile: '',
    captcha: '',
    IDNo: '',
    count: 0,
    disabled: false,
  };

  componentDidMount() {
    const { form, user } = this.props;
    form.setFieldsValue({ ...user });
  }

  componentWillUnmount() {
    clearInterval(this.timer);
  }

  onChange = value => {
    console.log('55555555', value);
  };

  onSubmit = e => {
    e.preventDefault();
    const { form, dispatch } = this.props;
    form.validateFields((error, values) => {
      if (!error) {
        const phoneCheckResult = checkMobile(values.mobile);
        if (!phoneCheckResult.status) {
          return Toast.info(phoneCheckResult.msg, 2);
        }
        if (!values.captcha || values.captcha.length < 3) {
          return Toast.info('请输入四位数字的短信验证码!', 2);
        }
        const idCheckResult = checkIdno(values.IDNo);
        if (idCheckResult.ret > 0) {
          return Toast.info(idCheckResult.msg, 2);
        }
        // 全部验证后fetch bind user
        dispatch({
          type: 'login/bindUser',
          payload: values,
        });
      }
    });
  };

  getCaptcha = () => {
    const { form, dispatch } = this.props;
    const mobile = form.getFieldValue('mobile');
    if (!mobile) {
      return Toast.info('请输入电话号码！', 1);
    }
    dispatch({
      type: 'login/fetchCaptcha',
      payload: {
        mobile,
      },
    }).then(() => {
      form.setFieldsValue({ captcha: this.props.captcha });
    });
    this.countDown(60);
  };

  countDown = second => {
    this.setState({
      disabled: true,
      count: second,
    });
    this.timer = setInterval(() => {
      let count = this.state.count;

      if (count === 1) {
        clearInterval(this.timer);
        this.setState({ disabled: false });
      } else {
        this.setState({
          disabled: true,
          count: --count,
        });
      }
    }, 1000);
  };

  render() {
    const { getFieldProps, captcha, loading } = this.props.form;
    const { disabled, count } = this.state;

    return (
      <div className={styles.wrapper}>
        <h1>用户绑定</h1>
        <List.Item>
          <InputItem
            {...getFieldProps('mobile', {
              rules: [{ required: false }],
            })}
            clear
            type="phone"
            placeholder="输入手机号码"
          >
            手机
          </InputItem>
        </List.Item>
        <List.Item>
          <div className={styles.captcha}>
            <InputItem
              {...getFieldProps('captcha', {
                initialValue: captcha,
                rules: [{ required: false }],
              })}
              type="digit"
              placeholder="输入验证码"
              className={styles.input}
            >
              验证码
            </InputItem>
            <Button size="small" disabled={disabled} onClick={this.getCaptcha}>
              {disabled ? `重新发送(${count}s)` : '获取验证码'}
            </Button>
          </div>
        </List.Item>
        <List.Item>
          <InputItem
            {...getFieldProps('IDNo', {
              rules: [{ required: true }],
            })}
            clear
            type="digit"
            placeholder="输入身份证"
          >
            身份证
          </InputItem>
        </List.Item>
        <List.Item className={styles.button}>
          <Button type="primary" loading={loading} onClick={this.onSubmit}>
            立即绑定
          </Button>
        </List.Item>
      </div>
    );
  }
}

export default createForm()(Bind);
