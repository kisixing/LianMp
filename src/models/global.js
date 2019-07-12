/**
 * 全局state
 * created by ADMIN on 2019-07-10 18:58
 */

export default {
  namespace: 'global',
  state: {
    user: {},
  },
  effects: {},
  reducers: {},
  subscriptions: {
    setup({ history }) {
      // Subscribe history(url) change, trigger `load` action if pathname is `/`
      history.listen(({ pathname, search }) => {
        if (typeof window.ga !== 'undefined') {
          window.ga('send', 'pageview', pathname + search);
        }
      });
    },
  },
};
