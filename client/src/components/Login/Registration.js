/* eslint-disable import/no-anonymous-default-export */
/*
the Registration form
*/
import { Button, FormControl, Input, makeStyles } from '@material-ui/core';
import React from 'react';
import Validation from "./RegistValidation";

const useStyles = makeStyles(() => ({
    submitButton: {
        background: 'linear-gradient(45deg, #2196F3 30%, #21CBF3 90%)'
    }
}))

export default (props) => {

    const classes = useStyles()

    const handleSubmit = () => {
        props.history.push("/")
    }


    const [handleChange,
        handleFormSubmit,
        contactValues,
        errorValues,
        statusValues
    ] = Validation(props, handleSubmit)

    return (
        <form onSubmit={handleFormSubmit} noValidate>

            <div className="form-group">
                <FormControl>
                    <Input
                        placeholder="נא כתבו את כתובת האימייל"
                        onChange={handleChange}
                        value={contactValues.email}
                        className="input-form"
                        label="מייל"
                        type="email"
                        name="email"
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
                        placeholder="שם"
                        onChange={handleChange}
                        value={contactValues.name}
                        className="input-form"
                        label="מייל"
                        type="text"
                        name="name"
                        id="name-input" />
                    {
                        errorValues.nameError.length > 0 &&
                        (<p className="invalid">{errorValues.nameError}</p>)
                    }
                </FormControl>
            </div>



            <div className="form-group">
                <FormControl>
                    <Input
                        placeholder="סיסמה"
                        onChange={handleChange}
                        value={contactValues.password}
                        className="input-form"
                        label="סיסמה"
                        type="text"
                        name="password"
                        id="password-input" />
                    {
                        errorValues.passwordError.length > 0 &&
                        (<p className="invalid">{errorValues.passwordError}</p>)
                    }
                </FormControl>
            </div>


            <div className="form-group">
                <FormControl>
                    <Input
                        placeholder="טלפון"
                        onChange={handleChange}
                        value={contactValues.phone}
                        className="input-form"
                        label="טלפון"
                        type="phone"
                        name="phone"
                        id="phone-input" />
                    {
                        errorValues.phoneError.length > 0 &&
                        (<p className="invalid">{errorValues.phoneError}</p>)
                    }
                </FormControl>
            </div>


            <Button variant="contained" className={classes.submitButton} type="submit" id="contact" color="secondary">הרשמה</Button>
            <p id="success">{statusValues.message}</p>


        </form>
    )
}