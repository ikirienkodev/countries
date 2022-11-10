import HeaderTabs from '../HeaderTabs';

import styles from './styles.module.scss';

const Header = () => {
  return (
    <div className={styles.header}>
      <HeaderTabs />
      <hr />
    </div>
  );
};

export default Header;
