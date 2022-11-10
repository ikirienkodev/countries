import React from 'react';
import { Link, matchPath, useLocation } from 'react-router-dom';
import { Tab, Tabs } from '@mui/material';

import { useAppDispatch } from '../../redux/hooks';
import { authActions } from '../../redux/slices/authSlice';

import styles from './styles.module.scss';

function useRouteMatch(patterns: readonly string[]) {
  const { pathname } = useLocation();

  for (let i = 0; i < patterns.length; i += 1) {
    const pattern = patterns[i];
    const possibleMatch = matchPath(pattern, pathname);
    if (possibleMatch !== null) {
      return possibleMatch;
    }
  }

  return null;
}

function HeaderTabs() {
  const dispatch = useAppDispatch();
  const routeMatch = useRouteMatch(['/']);
  const currentTab = routeMatch?.pattern?.path ?? '';
  return (
    <Tabs className={styles['header-tabs']} value={currentTab}>
      <Tab label="Index" value="/" to="/" component={Link} />
      <Tab label="Log out" onClick={() => dispatch(authActions.logout())} />
    </Tabs>
  );
}

export default HeaderTabs;
