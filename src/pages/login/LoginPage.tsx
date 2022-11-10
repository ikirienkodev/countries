import React from 'react';

import LoginForm from '../../components/LoginForm';

import styles from './styles.module.scss';

const LoginPage = () => {
  return (
    <div className={styles['login-page']}>
      <LoginForm />
    </div>
  );
};

export default LoginPage;
