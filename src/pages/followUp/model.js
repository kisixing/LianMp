import { queryFollowUp } from '@/services';

export default {
  namespace: 'followUp',
  state: {
    followUpList: []
  },

  effects: {
    *query({ payload }, { call, put }) {
      const res = yield call(queryFollowUp);
      yield put({
        type: 'updateState',
        payload: {
          followUpList: res.data
        }
      })
    }
  },

  reducers: {
    updateState(state, { payload }) {
      return {
        ...state,
        ...payload
      }
    }
  }
}
