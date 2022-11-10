import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import VisibilityOutlinedIcon from '@mui/icons-material/VisibilityOutlined';
import {
  CircularProgress,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from '@mui/material';

import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import { countriesActions } from '../../redux/slices/countriesSlice';
import { getCountriesThunk } from '../../redux/slices/countriesSlice/asyncActions';
import { ICountry } from '../../redux/types';
import ErrorSnackbar from '../ErrorSnackbar';

import NamePopup from './NamePopup';

import styles from './styles.module.scss';

interface ITableHeadCell {
  name: string;
  props: {
    [key: string]: unknown;
  };
}

const TableHeadCellList: ITableHeadCell[] = [
  {
    name: 'cca2',
    props: {
      style: {
        width: '10%',
      },
    },
  },
  {
    name: 'Common name',
    props: {
      style: {
        width: '35%',
      },
    },
  },
  {
    name: 'Capital',
    props: {
      style: {
        width: '40%',
      },
    },
  },
  {
    name: 'Actions',
    props: {
      style: {
        width: '35%',
      },
    },
  },
];

function CountriesTable() {
  const { result: countries, message, fetching } = useAppSelector((state) => state.COUNTRIES.countries);
  const [openErrorSnackbar, setOpenErrorSnackbar] = useState(false);
  const [anchorEl, setAnchorEl] = useState<HTMLDivElement | null>(null);
  const [currentCountry, setCurrentCounry] = useState<ICountry | null>(null);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(countriesActions.setCountriesInitialStatus());
    dispatch(getCountriesThunk());
  }, []);

  useEffect(() => {
    if (message) {
      setOpenErrorSnackbar(true);
    }
  }, [message]);

  const handleClick = (event: React.MouseEvent<HTMLDivElement>, index: number) => {
    setAnchorEl(event.currentTarget);
    setCurrentCounry(countries[index]);
  };

  const handlePopupClose = () => {
    setAnchorEl(null);
    setCurrentCounry(null);
  };

  return (
    <div className={styles.countriesTable}>
      <TableContainer id="tableContainer" className={styles['countriesTable__container']} component={Paper}>
        <Table stickyHeader aria-label="sticky table" className={styles['countriesTable__container__table']}>
          <TableHead className={styles['countriesTable__container__table__head']}>
            <TableRow>
              {TableHeadCellList.map((x) => (
                <TableCell key={x.name} {...x.props}>
                  <span>{x.name}</span>
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody className={styles['countriesTable__container__table__body']}>
            {countries.map((row, index) => (
              <TableRow className={styles['countriesTable__container__table__body__row']} key={row.cca2}>
                <TableCell className={styles['countriesTable__container__table__body__row__cell']}>
                  {row.cca2}
                </TableCell>
                <TableCell
                  className={`${styles['countriesTable__container__table__body__row__cell']} ${styles['countryName']}`}
                  onClick={(e) => handleClick(e, index)}
                >
                  {row.name.common}
                </TableCell>
                <TableCell className={styles['countriesTable__container__table__body__row__cell']}>
                  {row.capital}
                </TableCell>
                <TableCell className={styles['countriesTable__container__table__body__row__cell']} align="center">
                  <Link to={`/details/${row.cca3}`}>
                    <VisibilityOutlinedIcon color="primary" />
                  </Link>
                </TableCell>
              </TableRow>
            ))}
            {fetching ? (
              <TableRow key="row-spinner">
                <TableCell colSpan={4}>
                  <div className={styles['countriesTable__spinnerContainer']}>
                    <CircularProgress />
                  </div>
                </TableCell>
              </TableRow>
            ) : null}
          </TableBody>
        </Table>
      </TableContainer>
      {!!currentCountry && (
        <NamePopup open={!!anchorEl} anchorEl={anchorEl} handleClose={handlePopupClose} country={currentCountry} />
      )}
      <ErrorSnackbar open={openErrorSnackbar} setOpen={setOpenErrorSnackbar} message={message} />
    </div>
  );
}

export default CountriesTable;
