/**
 * 公用layout
 * created by ADMIN on 2019-07-10 13:00
 */
import { connect } from 'dva';
import NProgress from 'nprogress';
import withRouter from 'umi/withRouter';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import Footer from '@/components/Footer';
import styles from './styles.less';

NProgress.configure({ showSpinner: false });
let currHref = '';

function BasicLayout({
   children,
   loading,
   location: { pathname }
 }) {
  const { href } = window.location; // 浏览器地址栏中地址
  if (currHref !== href) {
    // currHref 和 href 不一致时说明进行了页面跳转
    NProgress.start(); // 页面开始加载时调用 start 方法
    if (!loading.global) {
      // loading.global 为 false 时表示加载完毕
      NProgress.done(); // 页面请求完毕时调用 done 方法
      currHref = href; // 将新页面的 href 值赋值给 currHref
    }
  }

  return (
    <TransitionGroup>
      <CSSTransition
        key={pathname}
        classNames="fade"
        timeout={500}
      >
        <div className={styles.container}>
          <div className={styles.main}>
            {children}
          </div>
          <Footer />
        </div>
      </CSSTransition>
    </TransitionGroup>
  );
}

export default withRouter(connect(({ loading }) => ({ loading }))(BasicLayout));

