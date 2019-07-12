/**
 * created by ADMIN on 2019-07-10 18:23
 */

import mockjs from 'mockjs';
import { delay } from 'roadhog-api-doc';

export default delay(
  {
    'POST /api/login': (req, res) => {
      return res.json({
        status: 'OK',
        data: req.body,
      });
    },
    'POST /api/captcha': (req, res) => {
      return res.json({
        status: 'OK',
        data: '1324',
      });
    },
    'POST /api/bind': (req, res) => {
      return res.json({
        status: 'OK',
        desc: '绑定用户成功',
        data: {},
      });
    },
  },
  1000,
);
