import React from 'react';

import CountriesTable from '../../../../components/CountriesTable';

import styles from './styles.module.scss';

function IndexPage() {
  return (
    <div className={styles['index-page']}>
      <CountriesTable />
    </div>
  );
}

export default IndexPage;
