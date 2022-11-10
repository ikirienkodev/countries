import React from 'react';
import { render } from '@testing-library/react';

import CountryDetails, { CountryDetailsProps } from './CountryDetails';

const country = {
  cca2: 'BB',
  cca3: 'BRB',
  name: {
    common: 'Barbados',
    official: 'Barbados',
    nativeName: {
      eng: {
        official: 'Barbados',
        common: 'Barbados',
      },
    },
  },
  currencies: {
    BBD: {
      name: 'Barbadian dollar',
      symbol: '$',
    },
  },
  capital: ['Bridgetown'],
  languages: {
    eng: 'English',
  },
  flags: {
    png: 'https://flagcdn.com/w320/bb.png',
    svg: 'https://flagcdn.com/bb.svg',
  },
};

describe('CountryDetails', () => {
  const defaultProps: CountryDetailsProps = { country };

  it('should render', () => {
    const props = { ...defaultProps };
    const { asFragment, queryByText } = render(<CountryDetails {...props} />);

    expect(asFragment()).toMatchSnapshot();
    expect(queryByText('CountryDetails')).toBeTruthy();
  });
});
