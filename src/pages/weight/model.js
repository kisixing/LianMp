import router from 'umi/router';
import { recordWeight, getWeight } from '@/services';

export default {
  namespace: 'weight',
  state: {
    // 体重
    value: {},
    // 体重监测列表
    dataLists: []
  },

  subscriptions: {

  },

  effects: {
    *recordWeight({ payload }, { call, put, select }) {
      const res = yield call(recordWeight, payload);
      if (res && res.weight) {
        // 体重保存成功跳转体重记录可视化页面
        router.push('weight/recordForm');
      }
      yield put({
        type: 'updateState',
        payload: {
          value: res
        },
      });
    },
    *queryWeight({ payload }, { call, put }) {
      const res = yield call(getWeight, payload);
      const dataLists = res.map(item => {
        return {
          date: item.date,
          value: item.weight,
          reference: item.weight - 2,
        }
      });
      yield put({
        type: 'updateState',
        payload: {
          dataLists
        },
      });
    }
  },

  reducers: {
    updateState(state, {payload }) {
      return {
        ...state,
        ...payload
      }
    },
  }
}
