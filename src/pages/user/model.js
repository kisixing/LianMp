/**
 * created by ADMIN on 2019-07-10 15:18
 */

import router from 'umi/router';
import { login, captcha, bind } from '@/services';

export default {
  namespace: 'login',
  state: {
    // 短信验证码
    captcha: '',
    // 用户基本信息
    user: {},
    hospitals: [
      {
        label: '华侨医院',
        value: '020001',
      },
      {
        label: '广东省妇幼',
        value: '020002',
      },
      {
        label: '天河区妇幼',
        value: '020003',
      },
      {
        label: '天河区中医院',
        value: '020004',
      },
    ],
    captchaStatus: {
      status: 1
    },
  },
  effects: {
    *fetchLogin({ payload }, { call, put }) {
      const res = yield call(login, payload);
      if (res.status === 'OK') {
        yield put({
          type: 'updateState',
          payload: {
            user: res.data,
          },
        });
        yield router.push('/user/bind');
      }
    },
    *fetchCaptcha({ payload }, { call, put }) {
      const res = yield call(captcha, payload);
      yield put({
        type: 'updateState',
        payload: {
          captcha: res.data,
        },
      });
    },
    *bindUser({ payload }, { call, put }) {
      const res = yield call(bind, payload);
      if (res && res.status === 'OK') {
        yield router.push('/home');
      }
    },
  },
  reducers: {
    updateState(state, { payload }) {
      return {
        ...state,
        ...payload,
      };
    },
  },
};
