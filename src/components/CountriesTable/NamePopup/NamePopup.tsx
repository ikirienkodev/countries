import { Popover, PopoverProps } from '@mui/material';

import { ICountry } from '../../../redux/types';

import styles from './styles.module.scss';

export interface NamePopupProps extends PopoverProps {
  open: boolean;
  handleClose: () => void;
  country: ICountry;
}

const NamePopup = ({ handleClose, country, anchorEl, open }: NamePopupProps) => {
  const { name } = country;
  const defineNativeName = (key: 'common' | 'official') => {
    const langs = Object.keys(name.nativeName);

    if (!langs.length) return name[key];

    return name.nativeName[langs[0]][key];
  };

  return (
    <Popover
      open={open}
      anchorEl={anchorEl}
      onClose={handleClose}
      anchorOrigin={{
        vertical: 'center',
        horizontal: 'center',
      }}
      transformOrigin={{
        vertical: 'top',
        horizontal: 'left',
      }}
    >
      <div className={styles['popoverContainer']}>
        <p>{`${name.common} / ${defineNativeName('common')}`}</p>
        <p>{`${name.official} / ${defineNativeName('official')}`}</p>
      </div>
    </Popover>
  );
};

export default NamePopup;
