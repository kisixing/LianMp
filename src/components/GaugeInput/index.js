import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import Gauge from './Gauge';

import styles from './index.less';

class GaugeInput extends PureComponent {
  render() {
    const { name, value, onChange, label, scale } = this.props;
    return (
      <div className={styles.wrapper}>
        <Gauge value={value} scale={scale} color="#ffcc4a" />
        <div className={styles.input}>
          <div className={styles.title}>{label.title}</div>
          <input
            name={name}
            type="number"
            value={value}
            placeholder="输入"
            onChange={onChange}
          />
          <div className="color-999">{label.unit}</div>
        </div>
      </div>
    );
  }
}

GaugeInput.propTypes = {
  value: PropTypes.string,
  label: PropTypes.object,
  onChange: PropTypes.func
};

GaugeInput.defaultProps = {
  label: {
    name: '',
    title: '体重',
    unit: 'kg'
  }
};

export default GaugeInput;
