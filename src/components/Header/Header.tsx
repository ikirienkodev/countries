import React from 'react';

import HeaderTabs from '../HeaderTabs';

import styles from './styles.module.scss';

function Header() {
  return (
    <div className={styles.header}>
      <HeaderTabs />
      <hr />
    </div>
  );
}

export default Header;
