/*
a dialog (material-ui) to enter details for adding a discount to the product
*/

import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import { FormControl, FormLabel, Grid, Input, makeStyles, Slider } from '@material-ui/core';
import { useState } from 'react';
import { addSaleToProduct } from '../../service/productsService';


const useStyles = makeStyles({
  root: {
    width: 250,
  },
  input: {
    width: 42,
  },
});
export default (props) => {

  const classes = useStyles();
  const [value, setValue] = useState(15);

  const handleSliderChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleInputChange = (event) => {
    setValue(event.target.value === '' ? '' : Number(event.target.value));
  };

  const handleBlur = () => {
    if (value < 0) {
      setValue(0);
    } else if (value > 100) {
      setValue(100);
    }
  };


  const handleClickClose = () => {
    props.setOpen(!1);
  }

    ;
  return (
    <Dialog
      open={props.open}
      onClose={handleClickClose}

    >
      <DialogTitle>{`הנחה עבור ${props.product.name}`}</DialogTitle>
      <DialogContent>
        <FormControl style={{ justifyContent: 'center' }}>
          <FormLabel>כמה אחוזי הנחה אתה מעוניין לתת?</FormLabel>
          <Grid container spacing={2} alignItems="center">
            <Grid item xs>
              <Slider
                value={typeof value === 'number' ? value : 0}
                onChange={handleSliderChange}
                aria-labelledby="input-slider"
              />
            </Grid>
            <Grid item>
              <Input
                className={classes.input}
                value={value}
                margin="dense"
                onChange={handleInputChange}
                onBlur={handleBlur}
                inputProps={{
                  step: 10,
                  min: 0,
                  max: 100,
                  type: 'number',
                  'aria-labelledby': 'input-slider',
                }}
              />
            </Grid>
          </Grid>
        </FormControl>
      </DialogContent>
      <DialogActions style={{ justifyContent: 'center' }}>
        <Button onClick={() => addSaleToProduct(props.product, `${value}`, props.setReload)} color="primary">
          אישור
          </Button>

        <Button onClick={handleClickClose} color="primary">
          בסוף לא
          </Button>
      </DialogActions>
    </Dialog>
  );
}
