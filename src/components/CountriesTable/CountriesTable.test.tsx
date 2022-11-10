import React from 'react';
import { render } from '@testing-library/react';

import CountriesTable from './CountriesTable';

describe('CountriesTable', () => {
  const defaultProps = {};

  it('should render', () => {
    const props = { ...defaultProps };
    const { asFragment, queryByText } = render(<CountriesTable {...props} />);

    expect(asFragment()).toMatchSnapshot();
    expect(queryByText('CountriesTable')).toBeTruthy();
  });
});
