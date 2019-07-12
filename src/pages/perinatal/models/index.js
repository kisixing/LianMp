/**
 * created by ADMIN on 2019-07-11 16:17
 */

export default {
  namespace: 'perinatal',

  state: {
    dataSource: [
      {
        img: require('../../../assets/icon/icon_wc_jiben.png'),
        title: '基本信息',
        route: '/perinatal/user',
        finished: true,
      },
      {
        img: require('../../../assets/icon/icon_wc_benyun.png'),
        title: '本孕信息',
        route: '/perinatal/info',
        finished: false,
      },
      {
        img: require('../../../assets/icon/icon_wc_changshi.png'),
        title: '孕产史信息',
        route: '/perinatal/history',
        finished: false,
      },
    ],
  },
  effects: {},
  reducers: {},
};
