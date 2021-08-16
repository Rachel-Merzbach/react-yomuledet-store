/*
a warn dialog (material-ui) that a user cannot add products without being loged in
*/
import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import { NavLink } from 'react-router-dom';

export default () => {
  const [open, setOpen] = React.useState(true);

  const handleClose = () => {
    setOpen(false);
  };

  return (
      <Dialog
        open ={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{"שימו 🤍"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
              ניתן להוסיף מוצרים לעגלה רק לאחר ביצוע כניסה לחשבון. <br/>
              כרגע עדיין לא התבצעה כניסה ולכן לא תוכלו להוסיף מוצרים.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
        <Button component={NavLink} to="/login-container" color="primary">
            אני רוצה להיכנס
          </Button>
          <Button onClick={handleClose} color="primary">
            אוקי
          </Button>
        </DialogActions>
      </Dialog>
  );
}
