import { ReactNode } from 'react';
import { Table, TableCell, TableRow } from '@mui/material';

import { ICountry } from '../../redux/types';

import styles from './styles.module.scss';

export interface CountryDetailsProps {
  country: ICountry;
}

interface ITableRow {
  name: string;
  content: ReactNode;
}

const CountryDetails = ({ country }: CountryDetailsProps) => {
  const { name, currencies, languages, flags } = country;

  const imgSrc = flags.svg ?? flags.png ?? '';

  const tableRows: ITableRow[] = [
    {
      name: 'Common Name',
      content: <p>{name.common}</p>,
    },
    {
      name: 'Official Name',
      content: <p>{name.official}</p>,
    },
    {
      name: 'Currencies',
      content: (
        <>
          {Object.values(currencies).map(({ name, symbol }) => (
            <p key={name}>{`${name} - ${symbol}`}</p>
          ))}
        </>
      ),
    },
    {
      name: 'Languages',
      content: <p>{Object.values(languages).join(' | ')}</p>,
    },
    {
      name: 'Flag',
      content: (
        <div className={styles.imageContainer}>{!!imgSrc && <img height="30px" src={imgSrc} alt="country-flag" />}</div>
      ),
    },
  ];

  return (
    <div className={styles.countryDetails}>
      <div className={styles['countryDetails__container']}>
        <Table className={styles['countryDetails__container__table']}>
          {tableRows.map(({ name, content }) => (
            <TableRow className={styles['countryDetails__container__table__row']} key={name}>
              <TableCell className={styles['countryDetails__container__table__row__head']} variant="head">
                {name}
              </TableCell>
              <TableCell className={styles['countryDetails__container__table__row__cell']}>{content}</TableCell>
            </TableRow>
          ))}
        </Table>
      </div>
    </div>
  );
};

export default CountryDetails;
