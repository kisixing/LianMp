import React from 'react';
import { List as LianYunList } from 'antd-mobile';

import styles from './List.less';
const LianYunItem = LianYunList.Item;

function List (props) {
  return <LianYunList className={styles.list} {...props} />;
}

function Item (props) {
  return <LianYunItem className={styles.item} {...props} />;
}

List.Item = Item;

export default List;
