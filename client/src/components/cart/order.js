import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Slide from '@mui/material/Slide';

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="down" ref={ref} {...props} />;
});

export default function AlertDialogSlide() {
  const [open, setOpen] = React.useState(true);

  const handleClose = () => {
    localStorage.removeItem('order')
    setOpen(false);
  };

  return (
      <Dialog
        open={open}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleClose}
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle>{"ההזמנה התקבלה!"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-slide-description">
          ניצור איתך קשר בטלפון לגבי כתובת ומועד הזמנה
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>אוקי</Button>
        </DialogActions>
      </Dialog>
  );
}
