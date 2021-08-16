/*
the Login form
*/
import { Button, FormControl, IconButton, Input, InputAdornment, makeStyles } from '@material-ui/core';
import { Visibility, VisibilityOff } from '@material-ui/icons';
import React from 'react';
import Validation from "./LoginValidate";

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
        flexWrap: 'wrap',
    },
    margin: {
        margin: theme.spacing(1),
    },
    withoutLabel: {
        marginTop: theme.spacing(3),
    },
    textField: {
        width: '25ch',
    },
    submitButton: {
        background: 'linear-gradient(45deg, #2196F3 30%, #21CBF3 90%)'
    }
}));


export default (props) => {

    const classes = useStyles()
    const handleSubmit = () => {
        props.history.push("/")
    }

    const [handleChange,
        handleFormSubmit,
        formValues,
        errorValues,
        statusValues
    ] = Validation(props, handleSubmit)


    const [values, setValues] = React.useState({
        amount: '',
        password: '',
        weight: '',
        weightRange: '',
        showPassword: false,
    });


    const handleClickShowPassword = () => {
        setValues({ ...values, showPassword: !values.showPassword });
    };

    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    };

    return (
        <div className={classes.root}>
            <form onSubmit={handleFormSubmit} noValidate className="formLogin">

                <div className="form-group">
                    <FormControl>
                        <Input
                            placeholder="נא כתבו את כתובת האימייל"
                            onChange={handleChange}
                            value={formValues.email}
                            label="מייל"
                            type="email"
                            name="email"
                            className="input-form"
                            id="email-input" />
                        {
                            errorValues.emailError.length > 0 &&
                            (<p className="invalid">{errorValues.emailError}</p>)
                        }
                    </FormControl>
                </div>



                <div className="form-group">
                    <FormControl>
                        <Input
                            type={values.showPassword ? 'text' : 'password'}
                            placeholder="נא כתבו את הסיסמה"
                            name="password"
                            onChange={handleChange}
                            value={formValues.password}
                            className="input-form"
                            label="סיסמה"
                            endAdornment={
                                <InputAdornment position="end">
                                    <IconButton
                                        aria-label="toggle password visibility"
                                        onClick={handleClickShowPassword}
                                        onMouseDown={handleMouseDownPassword}
                                    >
                                        {values.showPassword ? <Visibility /> : <VisibilityOff />}
                                    </IconButton>
                                </InputAdornment>
                            }
                        />
                        {
                            errorValues.passwordError.length > 0 &&
                            (<p className="invalid">{errorValues.passwordError}</p>)
                        }
                    </FormControl>
                </div>



                <Button variant="contained" className={classes.submitButton} type="submit" id="contact" color="secondary">כניסה לחשבון</Button>
                <p id="success">{statusValues.message}</p>





            </form>
        </div>
    )
}