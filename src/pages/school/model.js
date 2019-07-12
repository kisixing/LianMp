import pathToRegexp from 'path-to-regexp';
import { querySchoolNews } from '@/services';

export default {
  namespace: 'school',

  state: {
    tabs: [
      {
        key: 'article',
        type: 'article',
        title: '文章',
        defaultIcon: require('../../assets/tab/xj_g1.png'),
        activeIcon: require('../../assets/tab/xj_y1.png'),
      },
      {
        key: 'video',
        type: 'video',
        title: '视频',
        defaultIcon: require('../../assets/tab/xj_g.png'),
        activeIcon: require('../../assets/tab/xj_y.png'),
      },
    ],
    article: [
      {

      }
    ],
    video: [],
    details: {},
  },

  effects: {
    *queryArticle({ payload }, { call, put }) {
      const res = yield call(querySchoolNews, payload);
      yield put({
        type: 'updateState',
        payload: {
          article: res.data,
        },
      });
    },
    *queryVideo({ payload }, { call, put }) {
      const res = yield call(querySchoolNews, payload);
      yield put({
        type: 'updateState',
        payload: {
          video: res.data,
        },
      });
    },
    // *queryDetails({ payload }, { call, put, select }) {
    //   const userid = yield select(state => state.global.userid);
    //   const params = { userid, ...payload };
    //   const res = yield call(queryDetails, params);
    //   if (res) {
    //     yield put({
    //       type: 'updateState',
    //       payload: {
    //         details: res,
    //       },
    //     });
    //   }
    // },
    // *doFavor({ payload }, { call, put, select }) {
    //   const res = yield call(doFavor, payload);
    //   if (res) {
    //     const details = yield select(state => state.school.details);
    //     details['like'] = true;
    //     yield put({
    //       type: 'updateState',
    //       payload: {
    //         details,
    //       },
    //     });
    //   }
    // },
    // *undoFavor({ payload }, { call, put, select }) {
    //   const res = yield call(cancelFavor, payload);
    //   if (res) {
    //     const details = yield select(state => state.school.details);
    //     details['like'] = false;
    //     yield put({
    //       type: 'updateState',
    //       payload: {
    //         details,
    //       },
    //     });
    //   }
    // },
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
