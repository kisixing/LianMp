import React from 'react';
import 'rmc-picker/assets/index.css';
import 'rmc-picker/assets/popup.css';
import Popup from 'rmc-picker/lib/Popup';

import PopupContent from './PopupContent';

class MixPopup extends React.Component {
  state = {
    visible: false,
    value: null,
  };

  onOk = (value) => {
    console.log('onOk', value);
    this.setState({
      value,
    });
  }

  onOpen = () => {
    this.setState({
      visible: true,
    })
  }

  onDismiss = () => {
    console.log('onDismiss');
  }

  render() {
    const { contentData, placeholder, title, value, type } = this.props;
    console.log('MixPopup props', this.props)
    return (
      <div>
        <Popup
          className="fortest"
          transitionName="rmc-picker-popup-slide-fade"
          maskTransitionName="rmc-picker-popup-fade"
          content={
            <PopupContent
              type={type}
              data={contentData}
              value={value ? value.split(',') : []}
            />
          }
          title={title}
          dismissText="取消"
          onDismiss={this.onDismiss}
          onOk={this.onOk}
          okText="确定"
          value={value}
        >
          <CustomChildren value={value} extra={placeholder} />
        </Popup>
      </div>
    );
  }
}

const CustomChildren = props => {
  console.log('MixPopup', props)
  return (
    <div
      onClick={props.onClick}
      style={{ paddingLeft: 15 }}
    >
      <div style={{ textAlign: 'right', color: props.value ? '#333' : '#acacac' }}>
        {props.value ? props.value : props.extra}
        {/* {showErrorIcon ? <Icon type="cross-circle" color="red" /> : null} */}
      </div>
    </div>
  )
};

export default MixPopup;
