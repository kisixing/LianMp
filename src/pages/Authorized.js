/**
 * 登录判断hight component
 * created by ADMIN on 2019-07-10 14:51
 */

import React, { Fragment } from 'react';
import { connect } from 'dva';
import Redirect from 'umi/redirect';

const AuthComponent = ({
   children,
   location = {
     pathname: '',
   },
   user,
 }) => {
  // 是否登录
  const isLogin = user.openId;
  return (
    <Fragment>
      {!isLogin ? children : <Redirect to="/user/login" />}
    </Fragment>
  );
};

export default connect(({ loading, global }) => ({
  loading,
  user: global.user,
}))(AuthComponent);
