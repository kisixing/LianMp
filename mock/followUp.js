import mockjs from 'mockjs';
import { delay } from 'roadhog-api-doc';

const { Random } = mockjs;

export default delay(
  {
    'GET /api/followUp/lists': (req, res) => {
      return res.json(mockjs.mock({
        'desc': '随访记录',
        'data|10-16': [
          {
            'id': '@id',
            'title': '@ctitle',
            'num|20-40': 2,
            'time': '@time("yyyy-MM-dd HH:mm:ss")',
            'url': '',
            'thumbnail': Random.image('100x74', '#e8e8e8', '#FFF', 'Icon'),
          }
        ],
      }));
    },
  },
  1000,
);
