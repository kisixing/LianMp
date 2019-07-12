// perinatal

export default {
  namespace: 'history',

  state: {
    list: [{
      img: require('../../../assets/icon/icon_wc_jiben.png'),
      tlt: '基本信息',
      route: '/filePerinatal/perinatalBaseInfo',
      finished: false,
    }, {
      img: require('../../../assets/icon/icon_wc_benyun.png'),
      tlt: '本孕信息',
      route: '/filePerinatal/perinatalBaseInfo',
      finished: false,
    }, {
      img: require('../../../assets/icon/icon_wc_changshi.png'),
      tlt: '孕产史信息',
      route: '/filePerinatal/perinatalBaseInfo',
      finished: true,
    }]
  },
  effects: {},
  reducers: {}
}
