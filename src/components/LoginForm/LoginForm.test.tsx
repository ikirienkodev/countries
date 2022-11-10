import React from 'react';
import { render } from '@testing-library/react';

import LoginForm from './LoginForm';

describe('LoginForm', () => {
  const defaultProps = {};

  it('should render', () => {
    const props = { ...defaultProps };
    const { asFragment, queryByText } = render(<LoginForm {...props} />);

    expect(asFragment()).toMatchSnapshot();
    expect(queryByText('LoginForm')).toBeTruthy();
  });
});
