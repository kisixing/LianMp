/**
 * 今日知识、孕妇学校
 */
import mockjs from 'mockjs';
import { delay } from 'roadhog-api-doc';

const { Random } = mockjs;

export default delay({
  'GET /api/news/personalized': (req, res) => {
    return res.json(mockjs.mock({
      'desc': '个性化推送',
      'data|10': [
        {
          'id': '@id',
          'likenums|0-100': 1,
          'isLike|0-60': 0,
          'viewnums|40-500': 1,
          'url': '',
          'title': '@ctitle',
          'brief': '@cparagraph(1, 5)', // Random.cparagraph()
          'thumbnail': Random.image('100x74', '#e8e8e8', '#FFF', 'Mock.js'),
          'img': Random.image('100x74', '#eee', '#FFF', 'Mock.js')
        }
      ],
    }));
  },
  'GET /api/schoolNews': (req, res) => {
    const { query: { type, page, pageSize } } = req;
    if (type === 'article') {
      return res.json(mockjs.mock({
        'desc': '文本内容',
        'data|10': [
          {
            'id': '@id',
            'title': '@ctitle',
            'likenums|0-100': 1, // 喜欢人数
            'isLike|1-3': false, // 是否喜欢
            'viewnums|40-500': 1, // 点击数
            'url': '',
            'brief': '@cparagraph(1, 5)', // Random.cparagraph()
            'thumbnail': Random.image('100x74', '#e8e8e8', '#FFF', 'Image'),
            'img': Random.image('100x74', '#eee', '#FFF', 'Image')
          }
        ],
      }));
    }
    if (type === 'video') {
      return res.json(mockjs.mock({
        'desc': '视频内容',
        'data|2': [
          {
            'id': '@id',
            'title': '@ctitle',
            'likenums|0-100': 1, // 喜欢人数
            'isLike|1-3': false, // 是否喜欢
            'viewnums|40-500': 1, // 点击数
            'url': ['http://www.w3school.com.cn/example/html5/mov_bbb.mp4', 'http://clips.vorwaerts-gmbh.de/big_buck_bunny.mp4'], // video地址
            'brief': '@cparagraph(1, 5)', // Random.cparagraph()
            'thumbnail': Random.image('100x74', '#e8e8e8', '#FFF', 'Image'),
            'img': Random.image('100x74', '#eee', '#FFF', 'Image')
          }
        ],
      }));
    }
  },
}, 1000)
