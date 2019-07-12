import React from 'react';
import PropTypes from 'prop-types';
import { DatePicker } from 'antd-mobile';
import List from './List';
import groupStyles from './group.less';

const Item = List.Item;

const CustomChildren = props => {
  return (
    <div
      onClick={props.onClick}
      style={{ paddingLeft: 15 }}
    >
      <div style={{ textAlign: 'right', color: props.extra.indexOf('请') > -1 ? '#acacac' : '#333' }}>
        {props.extra}
        {/* {showErrorIcon ? <Icon type="cross-circle" color="red" /> : null} */}
      </div>
    </div>
  )
};

function DatePickerGroup ({ labelProps, datePickerProps, form, ...rest }) {
  const {
    required,
    title
  } = labelProps;

  const {
    name,
    initialValue,
    placeholder,
    type,
    ...datePickerRest
  } = datePickerProps;
  const value = form.getFieldValue(name);

  return (
    <Item
      extra={
        <DatePicker
          {...form.getFieldProps(name, {
            initialValue: value,
            rules: [{ required: required, message: placeholder }],
          })}
          mode="date"
          title={placeholder}
          extra={placeholder}
          // value={value}
          {...datePickerRest}
        >
          <CustomChildren />
        </DatePicker>
      }
    >
      <div className={groupStyles.label}>
        <span className={groupStyles.required}>{required ? '*' : null}</span>
        {title}
      </div>
    </Item>
  );
}

DatePickerGroup.propTypes = {
  label: PropTypes.shape({
    required: PropTypes.bool,
    title: PropTypes.string
  }),
  inputProps: PropTypes.object,
};

DatePickerGroup.defaultProps = {
  label: {
    required: false,
    title: 'title'
  },
  inputProps: {
    placeholder: '请输入...'
  }
};

export default DatePickerGroup;
