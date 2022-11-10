import CountriesTable from '../../../../components/CountriesTable';

import styles from './styles.module.scss';

const IndexPage = () => {
  return (
    <div className={styles['index-page']}>
      <CountriesTable />
    </div>
  );
};

export default IndexPage;
