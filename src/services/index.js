/**
 * 所有异步请求都放在这里
 * created by ADMIN on 2019-07-10 15:18
 */

/**
 ***************************************************************************************************
 * 登录模块接口
 * *************************************************************************************************
 */

import { stringify } from 'qs';
import request from '@/utils/request';

 /**
 ***************************************************************************************************
 * 测试proxy
 * *************************************************************************************************
 */

export async function testFetch() {
  return request('/test/api/users');
}

/*************************************************************************************/

export async function login(params) {
  return request('/api/login', {
    method: 'POST',
    data: {
      ...params,
    },
  });
}

export async function captcha(params) {
  return request('/api/captcha', {
    method: 'POST',
    data: {
      ...params,
    },
  });
}

export async function bind(params) {
  return request('/api/bind', {
    method: 'POST',
    data: {
      ...params,
    },
  });
}

/**
 * 今日知识推送
 */
export async function queryNews() {
  return request('/api/news/personalized');
}

/**
 ***************************************************************************************************
 * 孕妇学校（宣教）模块接口
 * *************************************************************************************************
 */

/**
 * 孕妇学校
 * @param params
 * @returns {Promise<*>}
 */
export async function querySchoolNews(params) {
  return request(`/api/schoolNews?${stringify(params)}`);
}

export async function queryFollowUp() {
  return request('/api/followUp/lists');
}

/**
 ***************************************************************************************************
 * 体重模块接口
 * *************************************************************************************************
 */

/**
 * 记录用户体重监测值
 * @params {object} params
 * @userid {string} userid 用户id
 * @weight {string} weight 体重值
 * @date { string} date 记录日期
 */
export function recordWeight(params) {
  return request({
    url: 'api/recordUserWeight',
    method: 'post',
    data: params,
  })
}

/**
 * 获取体重列表
 * @params {object} params { userid }
 */
export function getWeight(params) {
  return request({
    url: 'api/retrieveUserWeight',
    method: 'post',
    data: params,
  });
}

/**
 ***************************************************************************************************
 * 血压模块接口
 * *************************************************************************************************
 */

/**
 * 记录用户每日血压监测值
 * @param params { userid, date, beforeBreakfast, afterBreakfast, ...}
 */
export function recordBloodGlucose(params) {
  return request({
    url: 'api/recordUserBloodGlucose',
    method: 'post',
    data: params,
  })
}

/**
 * 获取每日血压数据
 * @params {object} { userid, bTime, eTime}
 */
export function getBloodGlucose(params) {
  return request({
    url: 'api/retrieveUserBloodGlucose',
    method: 'post',
    data: params,
  });
}
