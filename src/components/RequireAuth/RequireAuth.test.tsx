import React from 'react';
import { render } from '@testing-library/react';

import RequireAuth, { RequireAuthProps } from './RequireAuth';

describe('RequireAuth', () => {
  const defaultProps: RequireAuthProps = { redirectTo: '/', reverse: true };

  it('should render', () => {
    const props = { ...defaultProps };
    const { asFragment, queryByText } = render(<RequireAuth {...props} />);

    expect(asFragment()).toMatchSnapshot();
    expect(queryByText('RequireAuth')).toBeTruthy();
  });
});
