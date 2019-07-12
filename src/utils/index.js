
import { Toast } from 'antd-mobile';
import router from 'umi/router';

export function toURL(pathname) {
  if (!pathname) {
    Toast.info('暂未开通，敬请期待', 2);
  } else if (pathname.indexOf('http') > -1) {
    window.location.href = pathname;
  } else if (pathname === 'home') {
    window.location.replace(window.location.protocol + '//' + window.location.host + window.location.pathname);
  } else {
    router.push(pathname);
  }
}

/**
 * 手机号码合法性验证
 * @param mobile
 * @returns {boolean}
 */
export function checkMobile (mobile) {
  const reg = /^1(3|4|5|7|8)\d{9}$/;

  if (!mobile || mobile === "") {
    return {
      status: false,
      msg: '手机号码不能为空!'
    }
  }

  // 删除空格
  mobile = mobile.replace(/\s*/g, "");
  if (mobile === "") {
    return {
      status: false,
      msg: '手机号码不能为空!'
    }
  }
  if (mobile && mobile.length < 11) {
    return {
      status: false,
      msg: '请输入11位手机号码!'
    }
  }
  if (!reg.test(mobile)) {
    return {
      status: false,
      msg: '请输入正确的手机号码!'
    }
  }

  return {
    status: true,
    msg: '正确的手机号码!'
  }
}

export function checkIdno (idno, isman) {
  const Errors = ["验证通过!", "身份证号码位数不对!", "身份证号码出生日期超出范围或含有非法字符!", "身份证号码校验错误!", "身份证地区非法!",
    "身份证数据为空!", "身份证号为男性!"];

  if (!idno || idno === "") {
    return {
      ret: 1,
      msg: Errors[5]
    }
  }
  let idcard = idno.replace(/\s*/g, "");
  if (idcard === "") {
    return {
      ret: 1,
      msg: Errors[5]
    }
  }
  const area = {
    11: "北京",
    12: "天津",
    13: "河北",
    14: "山西",
    15: "内蒙古",
    21: "辽宁",
    22: "吉林",
    23: "黑龙江",
    31: "上海",
    32: "江苏",
    33: "浙江",
    34: "安徽",
    35: "福建",
    36: "江西",
    37: "山东",
    41: "河南",
    42: "湖北",
    43: "湖南",
    44: "广东",
    45: "广西",
    46: "海南",
    50: "重庆",
    51: "四川",
    52: "贵州",
    53: "云南",
    54: "西藏",
    61: "陕西",
    62: "甘肃",
    63: "青海",
    64: "宁夏",
    65: "新疆",
    71: "台湾",
    81: "香港",
    82: "澳门",
    91: "国外"
  };
  let Y, JYM, JYM2;
  let S, M, M2;
  let idcard_array = [];
  idcard_array = idcard.split("");
  if (area[parseInt(idcard.substr(0, 2))] == null) {
    return {
      ret: 1,
      msg: Errors[4]
    }
  }
  switch (idcard.length) {
    case 18:
      let ereg = '';
      if (parseInt(idcard.substr(6, 4)) % 4 === 0 || (parseInt(idcard.substr(6, 4)) % 100 === 0 &&
        parseInt(idcard.substr(6, 4)) % 4 === 0)) {
        ereg =
          /^[1-9][0-9]{5}19[0-9]{2}((01|03|05|07|08|10|12)(0[1-9]|[1-2][0-9]|3[0-1])|(04|06|09|11)(0[1-9]|[1-2][0-9]|30)|02(0[1-9]|[1-2][0-9]))[0-9]{3}[0-9Xx]$/
      } else {
        ereg =
          /^[1-9][0-9]{5}19[0-9]{2}((01|03|05|07|08|10|12)(0[1-9]|[1-2][0-9]|3[0-1])|(04|06|09|11)(0[1-9]|[1-2][0-9]|30)|02(0[1-9]|1[0-9]|2[0-8]))[0-9]{3}[0-9Xx]$/
      }
      if (ereg.test(idcard)) {
        S = (parseInt(idcard_array[0]) + parseInt(idcard_array[10])) * 7 + (parseInt(idcard_array[1]) +
          parseInt(idcard_array[11])) * 9 + (parseInt(idcard_array[2]) + parseInt(
          idcard_array[12])) * 10 + (parseInt(idcard_array[3]) + parseInt(idcard_array[13])) *
          5 + (parseInt(idcard_array[4]) + parseInt(idcard_array[14])) * 8 + (parseInt(
            idcard_array[5]) + parseInt(idcard_array[15])) * 4 + (parseInt(idcard_array[6]) +
            parseInt(idcard_array[16])) * 2 + parseInt(idcard_array[7]) * 1 + parseInt(
            idcard_array[8]) * 6 + parseInt(idcard_array[9]) * 3;
        Y = S % 11;
        M = "F";
        JYM = "10X98765432";
        M = JYM.substr(Y, 1);
        JYM2 = "10x98765432";
        M2 = JYM2.substr(Y, 1);
        if (M === idcard_array[17] || M2 === idcard_array[17]) {
          if (isman || (parseInt(idcard_array[16]) % 2 === 0)) {
            var roots = area[parseInt(idcard.substr(0, 2))];
            var birthday = "";
            if (idcard.length === 15) {
              birthday = "19" + idcard.substr(6, 6)
            } else {
              if (idcard.length === 18) {
                birthday = idcard.substr(6, 8)
              }
            }
            birthday = birthday.replace(/(.{4})(.{2})/, "$1-$2-");
            let age = 0;
            const myDate = new Date();
            const month = myDate.getMonth() + 1;
            const day = myDate.getDate();
            age = myDate.getFullYear() - idcard.substring(6, 10) - 1;
            if (idcard.substring(10, 12) < month || idcard.substring(10, 12) === month && idcard
              .substring(12, 14) <= day) {
              age++
            }
            return {
              ret: 0,
              msg: Errors[0],
              nation: "中国",
              birth: birthday,
              age: age,
              roots: roots
            }
          } else {
            return {
              ret: 1,
              msg: Errors[6]
            }
          }
        } else {
          return {
            ret: 1,
            msg: Errors[3]
          }
        }
      } else {
        return {
          ret: 1,
          msg: Errors[2]
        };
      }
    default:
      return {
        ret: 1,
        msg: Errors[1]
      };
  }
}

/**
 * 孕期相关计算
 */
export const KG = {
  obGetDate() {
    let today1 = new Date();
    const today1_y = today1.getFullYear();
    let today1_m = today1.getMonth() + 1;
    let today1_d = today1.getDate();
    if (today1_m < 10) {
      // eslint-disable-next-line no-useless-concat
      today1_m = "0" + "" + today1_m
    }
    if (today1_d < 10) {
      // eslint-disable-next-line no-useless-concat
      today1_d = "0" + "" + today1_d
    }
    today1 = today1_y + "-" + today1_m + "-" + today1_d;
    return today1;
  },

  obFormatDate(date) {
    const arraydate = date.split("-");
    if (arraydate.length < 3) {
      return date
    }
    return arraydate[0] + "年" + arraydate[1] + "月" + arraydate[2] + "日";
  },

  obGetGesDays(expected, today) {
    const date3 = new Date(expected).getTime() - new Date(today).getTime();
    let days = "0";
    if (date3 > 0) {
      days = Math.floor(date3 / (24 * 3600 * 1000))
    }
    return days;
  },

  obGetExpected(gesmoc) {
    let tmpdate = new Date(gesmoc).getTime();
    tmpdate = tmpdate + 280 * 24 * 60 * 60 * 1000;
    tmpdate = new Date(tmpdate);
    const new_y = tmpdate.getFullYear();
    let new_m = tmpdate.getMonth() + 1;
    if (new_m < 10) {
      // eslint-disable-next-line no-useless-concat
      new_m = "0" + "" + new_m
    }
    let new_d = tmpdate.getDate();
    if (new_d < 10) {
      // eslint-disable-next-line no-useless-concat
      new_d = "0" + "" + new_d
    }
    let newdate = new_y + "-" + new_m + "-" + new_d;
    return newdate;
  },

  obGetWeek(expected, today) {
    const date3 = new Date(expected).getTime() - new Date(today).getTime();
    let yunzh = "";
    if (date3 > 0) {
      var days = 280 - Math.floor(date3 / (24 * 3600 * 1000));
      console.log(days);
      if (days > 0) {
        const week = Math.floor((days / 7));
        let day = Math.floor((days % 7));
        if (day === 0) {
          day = "周"
        } else {
          day = "+" + day
        }
        yunzh = week + day
      }
    } else {
      let days = Math.floor(Math.abs(date3 / (24 * 3600 * 1000)));
      const week = Math.floor((days / 7));
      if (week >= 2) {
        yunzh = "42"
      } else {
        let day = Math.floor((days % 7));
        if (day === 0) {
          day = ""
        }
        yunzh = week + 40 + "+" + day
      }
    }
    return yunzh;
  }
};
