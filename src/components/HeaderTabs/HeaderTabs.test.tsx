import React from 'react';
import { render } from '@testing-library/react';

import HeaderTabs from './HeaderTabs';

describe('HeaderTabs', () => {
  const defaultProps = {};

  it('should render', () => {
    const props = { ...defaultProps };
    const { asFragment, queryByText } = render(<HeaderTabs {...props} />);

    expect(asFragment()).toMatchSnapshot();
    expect(queryByText('HeaderTabs')).toBeTruthy();
  });
});
