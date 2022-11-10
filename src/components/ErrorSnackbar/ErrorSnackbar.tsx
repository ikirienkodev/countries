import { Button, Snackbar } from '@mui/material';
export interface ErrorSnackbarProps {
  open: boolean;
  setOpen: (value: boolean) => void;
  message?: string | null;
  setMessage?: (message: string) => void;
}

const ErrorSnackbar = ({ open, setOpen, message, setMessage }: ErrorSnackbarProps): JSX.Element => {
  const handleClose = (): void => {
    setOpen(false);
    if (setMessage) {
      setMessage('');
    }
  };

  return (
    <Snackbar
      anchorOrigin={{
        vertical: 'top',
        horizontal: 'center',
      }}
      message={message ?? 'Oh, something went wrong'}
      open={open}
      autoHideDuration={4000}
      onClose={handleClose}
      action={
        <Button size="small" onClick={handleClose}>
          CLOSE
        </Button>
      }
    />
  );
};

ErrorSnackbar.defaultProps = {
  message: '',
};

export default ErrorSnackbar;
