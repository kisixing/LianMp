/**
 * 首页state
 * created by ADMIN on 2019-07-10 19:03
 */
import { queryNews, testFetch } from '@/services';

export default {
  namespace: 'home',

  state: {
    menuLists: [
      {
        title: '围产档案',
        icon: require('../../assets/index/i1.png'),
        url: '/perinatal',
      },
      { title: '产检记录', icon: require('../../assets/index/i2.png'), url: '/record' },
      { title: '电子报告', icon: require('../../assets/index/i4.png'), url: '/report' },
      { title: '孕妇学校', icon: require('../../assets/index/i5.png'), url: '/school' },
      { title: '随访记录', icon: require('../../assets/index/i6.png'), url: '/followUp' },
      { title: '远程监护', icon: require('../../assets/index/i3.png'), url: '' },
    ],
    toolLists: [
      { text: '体重管理', icon: require('../../assets/index/i001.png'), url: '/weight' },
      { text: '血糖管理', icon: require('../../assets/index/i002.png'), url: '/bloodGlucose' },
      { text: '血压管理', icon: require('../../assets/index/i007.png'), url: '' },
      { text: '胎动计数', icon: require('../../assets/index/i003.png'), url: '' },
      { text: '我的收藏', icon: require('../../assets/index/i004.png'), url: '' },
      { text: '我的提醒', icon: require('../../assets/index/i005.png'), url: '' },
      { text: '其他', icon: require('../../assets/index/i008.png'), url: '' },
    ],
    news: [
      // {
      //   id: '897676767',
      //   likenums: 22,
      //   isLike: 0,
      //   viewnums: 399,
      //   url: '',
      //   title: '孕早期注意事项',
      //   brief: '孕早期疾病注意事项,孕早期饮食注意事项,孕早期同房注意事项,孕早期护理注意事项',
      //   thumbnail:
      //     'https://ss2.baidu.com/6ONYsjip0QIZ8tyhnq/it/u=3984789086,518106745&fm=58&bpow=668&bpoh=504',
      // },
      // {
      //   id: 'gdfdf6899',
      //   likenums: 42,
      //   isLike: 1,
      //   viewnums: 19,
      //   url: '',
      //   title: '孕妇皮肤干燥怎么办',
      //   brief: '怀孕中皮肤变干燥的原因还不清楚，孕期激素分泌量的变化很可能是罪魁祸首之一。孕妇干燥怎么办？解决孕妇皮肤干燥问题，最好从生活护理、饮食等做起。',
      //   thumbnail:
      //     'https://img.pcbaby.com.cn/images/upload/upc/tx/baby_baike/1409/25/c0/38982674_1411633505522.jpg',
      // },
    ],
  },

  effects: {
    *testFetch({ payload }, { call, put, select }) {
      const res = yield call(testFetch);
      console.log('代理测试成功！', res);
    },
    *fetchNews(_, { call, put }) {
      const res = yield call(queryNews);
      console.log('news', res);
      yield put({
        type: 'updateState',
        payload: {
          news: res.data,
        },
      });
    }
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
