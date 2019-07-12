import router from 'umi/router';
import { recordBloodGlucose, getBloodGlucose } from '@/services';

export default {
  namespace: 'bloodGlucose',
  state: {
    // 一天的血糖记录值
    bloodGlucose: {},
    // 血糖记录列表
    dataLists: [],
    // 手风琴默认激活key
    defaultActiveKey: '',
  },

  subscriptions: {

  },

  effects: {
    *record({ payload }, { call, put }) {
      const res = yield call(recordBloodGlucose, payload);
      console.log('result', res);
      if (res && res.id) {
        router.push('bloodGlucose/recordForm');
      }
    },
    *query({ payload }, { call, put }) {
      const res = yield call(getBloodGlucose, payload);
      if (res && res.length) {
        const dataLists = res.reverse();
        const key = dataLists[0]['id'];
        yield put({
          type: 'updateState',
          payload: {
            dataLists,
            bloodGlucose: dataLists[0],
            defaultActiveKey: key.toString()
          },
        });
      } else {
        yield put({
          bloodGlucose: {}
        })
      }
    }
  },

  reducers: {
    updateState(state, {payload }) {
      return {
        ...state,
        ...payload
      }
    }
  }
}
