import React, { Component } from 'react';
import Page from '@/components/Page';

class Details extends Component {
  constructor(props) {
    super(props);
    this.state = {
      html: ''
    };
    this.url = props.location.query.url;
    // this.iframeRef = React.createRef();
  }

  render() {
    return (
      <Page goBack>
        {/*<div id="iframe" ref={this.iframeRef} dangerouslySetInnerHTML={{ __html: this.state.html }}></div>*/}
        <iframe
          title="随访调查"
          style={{ width: '100%', border: '0px', height: 'calc(100vh - 46px)' }}
          sandbox="allow-scripts allow-forms allow-same-origin"
          scrolling="auto"
          src={this.url}
        />
      </Page>
    );
  }
}

export default Details;
