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
        <DialogTitle id="alert-dialog-title">{"砖讬诪讜 馃"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
              谞讬转谉 诇讛讜住讬祝 诪讜爪专讬诐 诇注讙诇讛 专拽 诇讗讞专 讘讬爪讜注 讻谞讬住讛 诇讞砖讘讜谉. <br/>
              讻专讙注 注讚讬讬谉 诇讗 讛转讘爪注讛 讻谞讬住讛 讜诇讻谉 诇讗 转讜讻诇讜 诇讛讜住讬祝 诪讜爪专讬诐.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
        <Button component={NavLink} to="/login-container" color="primary">
            讗谞讬 专讜爪讛 诇讛讬讻谞住
          </Button>
          <Button onClick={handleClose} color="primary">
            讗讜拽讬
          </Button>
        </DialogActions>
      </Dialog>
  );
}
