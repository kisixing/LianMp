import React from 'react';
import { ActivityIndicator } from 'antd-mobile';

export default () => (
  <div
    style={{
      position: 'absolute',
      top: '50%',
      left: '50%',
      transform: 'translate(-50%, -50%)',
      width: '100%',
      height: '100%',
    }}
  >
    <div
      style={{
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <ActivityIndicator animating size="large" />
      <span style={{ marginTop: 8 }}>加载中...</span>
    </div>
  </div>
);
