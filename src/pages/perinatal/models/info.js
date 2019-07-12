// perinatal

export default {
  namespace: 'perinatalInfo',

  state: {
    fieldLabels: [
      { title: '孕次', inputType: 'input', type: 'digit', value: '', placeholder: '请输入怀孕次数', name: 'yunc',required:true  },
      { title: '产次', inputType: 'input', type: 'digit', value: '', placeholder: '请输入产次', name: 'chanc', required:true },

      { title: '', inputType: 'line', },

      {
        title: '末次月经', inputType: 'date', specialProps: {
          format: "YYYY-MM-DD",
        }, type: '', value: '2018-12-10', placeholder: '请选择末次月经时间', name: 'gesmoc',required:true
      },
      {
        title: '预产期', inputType: 'date', specialProps: {
          format: "YYYY-MM-DD",
        }, type: '', value: '', placeholder: '请推算预产期', name: 'gesexpect', required: true
      },

      { title: '', inputType: 'line', },

      { title: '孕前体重', inputType: 'input', type: 'digit', unit: 'kg', value: '', placeholder: '请输入孕前体重', name: 'cktizh',required:true  },
      { title: '现体重', inputType: 'input', type: 'digit', unit: 'kg', value: '', placeholder: '请输入现在身高', name: 'ckcurtizh',required:true  },
      { title: '身高', inputType: 'input', type: 'digit', unit: 'cm', value: '', placeholder: '请输入身高', name: 'cksheng', required:true },
      { title: '收缩压', inputType: 'input', type: 'digit', unit: 'mmHg', value: '', placeholder: '请输入收缩压', name: 'ckshrinkpressure', },
      { title: '舒张压', inputType: 'input', type: 'digit', unit: 'mmHg', value: '', placeholder: '请输入舒张压', name: 'ckdiastolicpressure', },

      { title: '', inputType: 'line', },

      { title: '结婚年数', inputType: 'input', type: 'digit', value: '', placeholder: '请输入结婚多少年', name: 'userjiehn',required:true  },
      {
        title: '是否近亲', inputType: 'radio', type: '', specialProps: ['是', '否'], value: '否', placeholder: '', name: 'userjinqjh',required:true
      },

      { title: '', inputType: 'line', },

      { title: '月经周期', inputType: 'input', type: 'digit', unit: '天', value: '', placeholder: '请输入月经周期', name: 'yjzhouq',required:true  },
      { title: '月经持续天数', inputType: 'input', type: 'digit', value: '', placeholder: '请输入月经持续天数', name: 'yjchix', required:true },
      {
        title: '经量', inputType: 'radio', type: '', specialProps: ['多', '中', '少'], value: '多', placeholder: '', name: 'yjjingl',
      },
      {
        title: '痛经', inputType: 'radio', type: '', specialProps: ['经常', '偶尔', '没有'], value: '', placeholder: '', name: 'yjtongj',
      },

      { title: '', inputType: 'line', },

      {
        title: '丈夫嗜好-烟', inputType: 'picker', type: '', specialProps: {
          cols: 1,//
          list: [
            {
              label: '没有', value: '没有',
            },
            {
              label: '偶尔', value: '偶尔',
            },
            {
              label: '经常', value: '经常',
            },
          ]
        }, value: '', placeholder: '请选择', name: 'userhyan',
      },
      {
        title: '丈夫嗜好-酒', inputType: 'picker', type: '', specialProps: {
          cols: 1,//
          list: [
            { label: '没有', value: '没有', },
            { label: '偶尔', value: '偶尔', },
            { label: '经常', value: '经常', },
          ]
        }, value: '', placeholder: '请选择', name: 'userhjiu',
      },
      {
        title: '丈夫现是否有疾病', inputType: 'mixPicker', type: '',
        specialProps: ['无', '高血压', '糖尿病', '心脏病', '脑梗', '脑出血', '癌症', '哮喘', '过敏性疾病', '癫痫病', '近视'],
        value: '', placeholder: '请选择', name: 'userhjib',
      },
      {
        title: '过去病史', inputType: 'mixPicker', type: '',
        specialProps: ['无', '高血压', '糖尿病', '心脏病', '脑梗', '脑出血', '癌症', '哮喘', '过敏性疾病', '癫痫病', '近视'],
        value: '', placeholder: '请选择', name: 'bsjibing',
      },
      {
        title: '家庭病史', inputType: 'mixPicker', type: '',
        specialProps: ['无', '高血压', '糖尿病', '心脏病', '脑梗', '脑出血', '癌症', '哮喘', '过敏性疾病', '癫痫病', '近视'],
        value: '', placeholder: '请选择', name: 'mzxuan',
      },
      {
        title: '发病情况', inputType: 'mixPicker', type: '',
        specialProps: ['无', '高血压', '糖尿病', '心脏病', '脑梗', '脑出血', '癌症', '哮喘', '过敏性疾病', '癫痫病', '近视'],
        value: '', placeholder: '请选择', name: 'ckfabqk',
      },
    ],
  },
  effects: {},
  reducers: {}
}
