export default [
  // user
  {
    path: '/user',
    component: '../layouts/UserLayout',
    routes: [
      {
        path: '/user',
        redirect: '/user/login',
      },
      {
        path: '/user/login',
        name: 'login',
        title: '登录',
        component: './user/Login',
      },
      // {
      //   path: '/user/register',
      //   name: 'register',
      //   title: '注册',
      //   component: './User/Register',
      // },
      {
        path: '/user/bind',
        name: 'register',
        title: '绑定用户',
        component: './user/Bind',
      },
      {
        component: '404',
      },
    ],
  },
  // app
  {
    path: '/',
    component: '../layouts/BasicLayout',
    Routes: ['src/pages/Authorized'],
    routes: [
      {
        path: '/',
        redirect: '/home',
      },
      {
        path: '/home',
        name: 'homePage',
        title: '主页',
        component: './home',
      },
      {
        path: '/perinatal',
        name: 'perinatal',
        title: '围产档案',
        component: './perinatal',
      },
      {
        path: '/perinatal/user',
        name: 'perinatal',
        title: '基本信息',
        component: './perinatal/User',
      },
      {
        path: '/perinatal/info',
        name: 'perinatal',
        title: '本孕信息',
        component: './perinatal/Info',
      },
      {
        path: '/perinatal/history',
        name: 'perinatal',
        title: '孕产史信息',
        component: './perinatal/History',
      },
      {
        path: '/record',
        name: 'record',
        title: '产检记录',
        component: './record',
      },
      {
        path: '/report',
        name: 'report',
        title: '电子报告',
        component: './report',
      },
      {
        path: '/report/pdfview',
        name: 'pdfview',
        title: '报告预览',
        component: './report/PDFView',
      },
      {
        path: '/school',
        name: 'school',
        title: '孕妇学校',
        component: './school/Layout',
        routes: [
          {
            path: '/school',
            redirect: '/school/article',
          },
          {
            path: '/school/article',
            name: 'article',
            title: '文章',
            component: './school/Article',
          },
          {
            path: '/school/video',
            name: 'video',
            title: '视频',
            component: './school/Video',
          },
        ],
      },
      {
        path: '/followUp',
        name: 'followUp',
        title: '随访记录',
        component: './followUp',
      },
      {
        path: '/weight',
        name: 'weight',
        title: '体重管理',
        component: './weight',
      },
      {
        path: '/weight/record',
        name: 'weight record',
        title: '体重管理',
        component: './weight/RecordForm',
      },
      {
        path: '/bloodGlucose',
        name: 'bloodGlucose',
        title: '血糖管理',
        component: './bloodGlucose',
      },
      {
        path: '/bloodGlucose/record',
        name: 'bloodGlucose record',
        title: '血糖管理',
        component: './bloodGlucose/RecordForm',
      },
      {
        component: './404',
      },
    ],
  },
  {
    component: './404',
  },
];
