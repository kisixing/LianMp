// perinatal

export default {
  namespace: 'perinatalUser',

  state: {
    fieldLabels: [
      { title: '姓名', disabled: true, inputType: 'input', type: 'text', value: '', placeholder: '请输入姓名', name: 'username', required: true },
      { title: '手机号码', inputType: 'input', type: 'phone', value: '', placeholder: '请输入手机号码', name: 'usermobile', required: true },
      { title: '就诊卡号', inputType: 'input', type: 'text', specialProps: {
          maxLen:10
      }, value: '', placeholder: '请输入就诊卡号', name: 'usermcno', required: true },
      { title: '', inputType: 'line', },
      {
        title: '证件类型', inputType: 'picker', type: '', specialProps: {
          cols: 1,
          list: [
            {
              label: '身份证',
              value: '身份证',
            }, {
              label: '护照',
              value: '护照',
            },
          ]
        }, value: '身份证', placeholder: '请选择证件类型', name: 'useridnoid',  required: true
      },
      { title: '证件号码', inputType: 'input', type: 'digit', value: '', placeholder: '请输入证件号码', name: 'useridno', required: true },
      { title: '年龄', inputType: 'input', type: 'digit', value: '', placeholder: '请输入年龄', name: 'userage', required: true },
      { title: '国籍', inputType: 'input', type: 'text', value: '', placeholder: '请输入您的国籍', name: 'usernation',required: true  },
      { title: '籍贯', inputType: 'input', type: 'text', value: '', placeholder: '请输入您的籍贯', name: 'userroots', required: true },
      { title: '民族', inputType: 'input', type: 'text', value: '', placeholder: '请输入您的民族', name: 'userpeople', },
      { title: '职业', inputType: 'input', type: 'text', value: '', placeholder: '请输入您的职业', name: 'useroccupation', },
      { title: '工作单位', inputType: 'input', type: 'text', value: '', placeholder: '请输入工作单位', name: 'userworkplace',},
      { title: '', inputType: 'line', },
      { title: '配偶姓名', inputType: 'input', type: 'text', value: '', placeholder: '请输入配偶姓名', name: 'userhname', required: true },
      { title: '配偶手机号码', inputType: 'input', type: 'phone', value: '', placeholder: '请输入配偶手机号码', name: 'userhmobile', required: true  },
      {
        title: '配偶证件类型', inputType: 'picker', type: '', specialProps: {
          cols: 1,
          list: [{
            label: '身份证',
            value: '身份证',
          }, {
            label: '护照',
            value: '护照',
          }]
        }, value: '身份证', placeholder: '请选择证件类型', name: 'poidnoid',  required: true
      },
      { title: '配偶证件号码', inputType: 'input', type: 'digit', value: '', placeholder: '请输入证件号码', name: 'userhidno', required: true  },
      { title: '配偶年龄', inputType: 'input', type: 'digit', value: '', placeholder: '请输入年龄', name: 'userhage', required: true },
      { title: '配偶国籍', inputType: 'input', type: 'text', value: '', placeholder: '请输入您的国籍', name: 'userhnation', required: true },
      { title: '配偶籍贯', inputType: 'input', type: 'text', value: '', placeholder: '请输入您的籍贯', name: 'userhroots', required: true },
      { title: '配偶民族', inputType: 'input', type: 'text', value: '', placeholder: '请输入您的民族', name: 'userhpeople', },
      { title: '配偶职业', inputType: 'input', type: 'text', value: '', placeholder: '请输入您的职业', name: 'userhoccupation', },
      { title: '配偶工作单位', inputType: 'input', type: 'text', value: '', placeholder: '请输入工作单位', name: 'userhworkplace',},
      { title: '', inputType: 'line', },
      { title: '户口地址', inputType: 'picker', type: 'province', value: '', placeholder: '请输入省市区(县)', name: 'userconstant', required: true },
      { title: '详细地址', inputType: 'textarea', type: 'text', value: '', placeholder: '请输入详细地址', name: 'userconstantd',required: true  },
      { title: '居住地址', inputType: 'picker', type: 'province', value: '', placeholder: '请输入省市区(县)', name: 'useraddress', required: true },
      { title: '详细居住地址', inputType: 'textarea', type: 'text', value: '', placeholder: '请输入详细居住地址', name: 'useraddressd', required: true },
      { title: '', inputType: 'line', },
      {
        title: '特殊记录', inputType: 'mixPicker', type: '',
        specialProps: ['无', '吸毒史', '传染疾病', '遗传疾病'],
        value: '物理辐射', placeholder: '请选择', name: 'userexrecord',
      },
      {
        title: '过敏药物', inputType: 'mixPicker', type: 'multiple',
        specialProps: ['无', '花粉过敏', '花生过敏', '辣过敏', '花生过生过敏', '过敏性疾病', '花生过敏花生过敏'],
        value: '花粉过敏,辣过敏,粉尘过敏', placeholder: '请选择', name: 'allergyhis',
      },
    ],
  },
  effects: {},
  reducers: {}
}
