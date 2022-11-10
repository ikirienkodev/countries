import React from 'react';
import { render } from '@testing-library/react';

import Header from './Header';

describe('Header', () => {
  const defaultProps = {};

  it('should render', () => {
    const props = { ...defaultProps };
    const { asFragment, queryByText } = render(<Header {...props} />);

    expect(asFragment()).toMatchSnapshot();
    expect(queryByText('Header')).toBeTruthy();
  });
});
