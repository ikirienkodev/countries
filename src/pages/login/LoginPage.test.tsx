import React from 'react';
import { render } from '@testing-library/react';

import LoginPage from './LoginPage';

describe('LoginPage', () => {
  const defaultProps = {};

  it('should render', () => {
    const props = { ...defaultProps };
    const { asFragment, queryByText } = render(<LoginPage {...props} />);

    expect(asFragment()).toMatchSnapshot();
    expect(queryByText('LoginPage')).toBeTruthy();
  });
});
