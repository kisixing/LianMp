import React from 'react';
import PropTypes from 'prop-types';
import { InputItem } from 'antd-mobile';
import List from './List';
import groupStyles from './group.less';

const Item = List.Item;

function InputGroup ({ labelProps, inputProps, form, rest }) {
  const {
    required,
    title
  } = labelProps;

  const {
    name,
    value,
    placeholder,
    type,
    ...inputPropsRest
  } = inputProps;

  return (
    <Item
      extra={
        <InputItem
          {...form.getFieldProps(name, {
            initialValue: value,
            rules: [{ required: required, message: placeholder }],
          })}
          type={type}
          placeholder={placeholder}
          error={form.getFieldError(name)}
          {...inputPropsRest}
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

InputGroup.propTypes = {
  label: PropTypes.shape({
    required: PropTypes.bool,
    title: PropTypes.string
  }),
  inputProps: PropTypes.object,
};

InputGroup.defaultProps = {
  label: {
    required: false,
    title: 'title'
  },
  inputProps: {
    placeholder: '请输入...'
  }
};

export default InputGroup;
