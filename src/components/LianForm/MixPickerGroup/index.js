import React from 'react';
import PropTypes from 'prop-types';
import { Picker, Icon } from 'antd-mobile';
import MixPopup from './MixPopup';

import List from '../List';
import groupStyles from '../group.less';

const Item = List.Item;

function MixPickerGroup ({ labelProps, pickerProps, form, ...rest }) {

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
  const value = form.getFieldValue(name);

  return (
    <Item
      extra={
        <MixPopup
          {...form.getFieldProps(name, {
            initialValue: value ? value : initialValue,
            rules: [{ required: required, message: placeholder }],
          })}
          title={title}
          extra={placeholder}
          type={type}
          placeholder={placeholder}
          contentData={data}
        />
      }
    >
      <div className={groupStyles.label}>
        <span className={groupStyles.required}>{required ? '*' : null}</span>
        {title}
      </div>
    </Item>
  );
}

MixPickerGroup.propTypes = {
  label: PropTypes.shape({
    required: PropTypes.bool,
    title: PropTypes.string
  }),
  pickerProps: PropTypes.shape({
    data: PropTypes.array,
    required: PropTypes.bool,
  })
};

MixPickerGroup.defaultProps = {
  label: {
    required: false,
    title: 'title'
  },
  pickerProps: {
    placeholder: '请选择...',
    required: false,
  }
};

export default MixPickerGroup;
