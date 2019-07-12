/**
 * 登录公用layout
 * created by ADMIN on 2019-07-10 13:00
 */

import withRouter from 'umi/withRouter';
import { TransitionGroup, CSSTransition } from 'react-transition-group';
import Footer from '@/components/Footer';
import logo from '../assets/logo.png';
import styles from './styles.less';

function UserLayout({
  children,
  location: { pathname },
}) {
  return (
    <TransitionGroup>
      <CSSTransition
        key={pathname}
        classNames="fade"
        timeout={500}
      >
        <div className={styles.container}>
          <div className={styles.main}>
            <div className={styles.logo}>
              <img alt="logo" src={logo} />
              <h1>莲孕围产</h1>
            </div>
            <div className={styles.content}>{children}</div>
          </div>
          <Footer />
        </div>
      </CSSTransition>
    </TransitionGroup>
  );
}

export default withRouter(UserLayout);
