import React from 'react';
import PropTypes from 'prop-types';
import { TextareaItem  } from 'antd-mobile';
import List from './List';
import styles from './TextareaGroup.less';
import groupStyles from './group.less';

const Item = List.Item;

function TextareaGroup ({ labelProps, textareaProps, form, rest }) {
  const {
    required,
    title
  } = labelProps;

  const {
    name,
    value,
    placeholder,
    ...textareaPropsRest
  } = textareaProps;

  return (
    <Item>
      <div  style={{ lineHeight: 'initial' }} className={groupStyles.label}>
        <span className={groupStyles.required}>{required ? '*' : null}</span>
        {title}
      </div>
      <TextareaItem
        {...form.getFieldProps(name, {
          initialValue: value,
          rules: [{ required: required, message: placeholder }],
        })}
        clear
        autoHeight
        className={styles.textarea}
        placeholder={placeholder}
        error={form.getFieldError(name)}
        {...textareaPropsRest}
      />
      <div className={styles.content}>

      </div>
    </Item>
  );
}

TextareaGroup.propTypes = {
  label: PropTypes.shape({
    required: PropTypes.bool,
    title: PropTypes.string
  }),
  textareaProps: PropTypes.object,
};

TextareaGroup.defaultProps = {
  label: {
    required: false,
    title: 'title'
  },
  textareaProps: {
    placeholder: '请输入...',
    getFieldError: () => false,
  }
};

export default TextareaGroup;
