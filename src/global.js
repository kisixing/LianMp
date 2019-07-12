/**
 * 此文件会在入口文件的最前面被自动引入，可以在这里加载补丁，做一些初始化的操作等
 * created by ADMIN on 2019-07-10 14:31
 */

import '@babel/polyfill';
import router from 'umi/router';
import { Modal } from 'antd-mobile';

const Alert = Modal.alert;

function isWeixn() {
  const ua = navigator.userAgent.toLowerCase();
  return ua.includes('microMessenger');
}

if (isWeixn()) {
  Alert('提示', '请在微信客户端打开', [
    { text: '确定', onPress: () => router.replace('/404') },
  ]);
  // alert('请在微信客户端打开');
  // window.location.replace('/404');
} else {
  console.log('debug')
}
