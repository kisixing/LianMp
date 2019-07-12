import pathToRegexp from 'path-to-regexp';
import * as service from '@/services';

export default {
  namespace: 'report',
  state: {
    bbsList: [{
      id: '20190415007',
      num: 0,
      title: '电子产检本',
      date: '2019-04-15',
      dec: '产检本示例',
      url: 'http://mp.lian-med.com/eobbook.pdf',
    }, {
      id: '20190501007',
      num: 1,
      date: '2019-05-01',
      title: '第一次产检',
      dec: '检查项目相对最多，全面检查准妈妈的健康情况',
      url: 'http://mp.lian-med.com/eobbook.pdf',
    }]
  },

  subscriptions: {

  },

  effects: {

  },

  reducers: {

  }
}
