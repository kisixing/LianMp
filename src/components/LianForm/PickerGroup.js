import React from 'react';
import PropTypes from 'prop-types';
import { Picker, Icon } from 'antd-mobile';

import List from './List';
import groupStyles from './group.less';

import DATA from './provinces';

const Item = List.Item;

const CustomChildren = props => {
  console.log('extra', props.extra)
  return (
    <div
      onClick={props.onClick}
      style={{ paddingLeft: 15 }}
    >
      <div style={{ flex: 1, textAlign: 'right', color: props.extra.indexOf('请') > -1 ? '#acacac' : '#333' }}>
        {props.extra}
        {/* {showErrorIcon ? <Icon type="cross-circle" color="red" /> : null} */}
      </div>
    </div>
  )
};

function PickerGroup ({ labelProps, pickerProps, form, ...rest }) {

  const {
    required,
    title
  } = labelProps;

  const {
    specialProps,
    type,
    data,
    name,
    initialValue,
    placeholder,
    ...pickerPropsRest
  } = pickerProps;

  const isProvince = type === 'province' ? true : false;
  const value = form.getFieldValue(name);

  return (
    <Item
      extra={
        <Picker
          {...form.getFieldProps(name, {
            initialValue: value ? value : initialValue,
            rules: [{ required: required, message: placeholder }],
          })}
          extra={placeholder}
          cols={isProvince ? 2 : 1 }
          data={isProvince ? DATA : data }
          value={value ? value : initialValue}
          {...pickerPropsRest}
        >
          <CustomChildren />
        </Picker>
      }
    >
      <div className={groupStyles.label}>
        <span className={groupStyles.required}>{required ? '*' : null}</span>
        {title}
      </div>
    </Item>
  );
}

PickerGroup.propTypes = {
  label: PropTypes.shape({
    required: PropTypes.bool,
    title: PropTypes.string
  }),
  pickerProps: PropTypes.shape({
    data: PropTypes.array,
    required: PropTypes.bool,
  })
};

PickerGroup.defaultProps = {
  label: {
    required: false,
    title: 'title'
  },
  pickerProps: {
    placeholder: '请选择...',
    required: false,
  }
};

export default PickerGroup;
