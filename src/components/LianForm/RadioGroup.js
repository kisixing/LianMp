import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { Radio } from 'antd-mobile';
import List from './List';
import groupStyles from './group.less';
import styles from './RadioGroup.less';

const Item = List.Item;

class LYRadioGroup extends PureComponent {
  static propTypes = {
    data: PropTypes.array.isRequired,
  };
  constructor () {
    super();
    this.state = {
      currentRadio: ''
    }
  };

  componentDidMount () {
    const { value } = this.props;
    console.log('init', value)
    this.setState({ currentRadio: value })
  }

  componentWillReceiveProps(nextProps) {
    const { currentRadio } = this.state;
    const { value } = nextProps;
    if (nextProps.value !== currentRadio) {
      this.setState({ currentRadio: value })
    }
  }

  onChange = (value) => {
    this.setState({ currentRadio: value });
    this.props.onChange(value); // 只用加这行
  }

  render () {
    const { currentRadio } = this.state;
    const { data } = this.props;

    return (
      <div>
        {data.map((item, i) => (
          <Radio
            name={item}
            key={i}
            className={styles.radio_item}
            checked={item === currentRadio }
            onChange={() => this.onChange(item)}
          >
            {item}
          </Radio>
        ))}
      </div>
    );
  }
}

function RadioGroup ({ labelProps, radioProps, form, ...rest }) {
  const {
    required,
    title
  } = labelProps;

  const {
    name,
    initialValue,
    data,
    placeholder,
    ...radioPropsRest
  } = radioProps;
  const value = form.getFieldValue(name);

  return (
    <Item
      extra={
        <LYRadioGroup
          {...form.getFieldProps(name, {
            initialValue,
            rules: [{ required: required, message: placeholder }],
          })}
          name={name}
          data={data}
          value={value}
          {...radioPropsRest}
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

RadioGroup.propTypes = {
  label: PropTypes.shape({
    required: PropTypes.bool,
    title: PropTypes.string
  }),
  inputProps: PropTypes.object,
};

RadioGroup.defaultProps = {
  label: {
    required: false,
    title: 'title'
  },
  inputProps: {
    placeholder: '请输入...',
    getFieldError: () => false,
  }
};

export default RadioGroup;
