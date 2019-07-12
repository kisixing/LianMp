/**
 * title: 报告详情
 */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import PDFJS from 'pdfjs-dist';
import PageWrapper from '@/components/PageWrapper';
import styles from './index.less';

// Setting worker path to worker bundle.
// 需要起服务
PDFJS.GlobalWorkerOptions.workerSrc = '/pdfjs/pdf.worker.min.js';

const CMAP_URL = '/pdfjs/cmaps/';
const CMAP_PACKED = true;

class PDFView extends Component {
  componentDidMount() {
    const url = '/eobbook.pdf';
    let container = document.getElementById('container');
    let pageDiv;

    PDFJS.getDocument({
      url,
      withCredentials: true, // 允许携带cookie
      cMapUrl: CMAP_URL,
      cMapPacked: CMAP_PACKED
    }).then((pdf) => {
      const numPages = pdf.numPages;
      for (var i = 1; i<= numPages; i++) {
        pdf.getPage(i).then((page) => {
          const scale = 1;
          const viewport = page.getViewport(scale);
          pageDiv = document.createElement('div');
          pageDiv.setAttribute('id', 'page-' + (page.pageIndex + 1));
          pageDiv.setAttribute('style', 'position: relative');
          container.appendChild(pageDiv);
          var canvas = document.createElement('canvas');
          pageDiv.appendChild(canvas);
          var context = canvas.getContext('2d');
          canvas.height = viewport.height;
          canvas.width = viewport.width;

          var renderContext = {
            canvasContext: context,
            viewport: viewport
          };

          page.render(renderContext);
        })
      }
    })
  }

  render() {
    return (
      <PageWrapper goBack>
        <div id="container" className={styles.container}>
        </div>
      </PageWrapper>
    );
  }
}

PDFView.propTypes = {
  url: PropTypes.string
};

export default PDFView;
