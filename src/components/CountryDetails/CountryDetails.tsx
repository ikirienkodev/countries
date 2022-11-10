import React, { ReactNode } from 'react';
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

function CountryDetails({ country }: CountryDetailsProps) {
  const imgSrc = country.flags.svg ?? country.flags.png ?? '';

  const tableRows: ITableRow[] = [
    {
      name: 'Common Name',
      content: <p>{country.name.common}</p>,
    },
    {
      name: 'Official Name',
      content: <p>{country.name.official}</p>,
    },
    {
      name: 'Currencies',
      content: (
        <>
          {Object.values(country.currencies).map(({ name, symbol }) => (
            <p key={name}>{`${name} - ${symbol}`}</p>
          ))}
        </>
      ),
    },
    {
      name: 'Languages',
      content: <p>{Object.values(country.languages).join(' | ')}</p>,
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
          {tableRows.map((row) => (
            <TableRow className={styles['countryDetails__container__table__row']} key={row.name}>
              <TableCell className={styles['countryDetails__container__table__row__head']} variant="head">
                {row.name}
              </TableCell>
              <TableCell className={styles['countryDetails__container__table__row__cell']}>{row.content}</TableCell>
            </TableRow>
          ))}
        </Table>
      </div>
    </div>
  );
}

export default CountryDetails;
