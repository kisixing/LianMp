import React from 'react';
import { Steps } from 'antd-mobile';
import styles from './index.less';

const Step = Steps.Step;

const customIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 42 42" className="am-icon am-icon-xxs">
    <g fillRule="evenodd" stroke="transparent" strokeWidth="4">
      <path d="M21 0C9.402 0 0 9.402 0 21c0 11.6 9.402 21 21 21s21-9.4 21-21C42 9.402 32.598 0 21 0z" />
    </g>
  </svg>
);

function StepsBar ({ dataSource, current, ...rest }) {
  return (
    <div className={styles.warpper}>
      <Steps current={current} direction="horizontal" small="small">
        {dataSource.map((s, i) => (
          <Step
            key={i}
            status={s.finished ? 'error' : i === current ? 'finish' : 'wait'}
            title={s.title}
            description={s.description}
            icon={customIcon()}
          />
        ))}
      </Steps>
    </div>
  );
}

export default StepsBar;
