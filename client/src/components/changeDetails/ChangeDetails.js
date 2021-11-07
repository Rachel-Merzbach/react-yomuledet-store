/*
form of user details: the user can change his details and save it in the data-base
*/
import { Button, Card, Container, FormControl, makeStyles, TextField } from '@material-ui/core';
import React from 'react';
import Validation from "./DetailsValidation";

const useStyles = makeStyles(() => ({
    submitButton: {
        background: 'linear-gradient(45deg, #2196F3 30%, #21CBF3 90%)',
        color: 'white'
    },
    label:{
        "inset-inline-end": "auto"
    }
}))

export default (props) => {
    const classes = useStyles()

    const [handleChange,
        handleFormSubmit,
        contactValues,
        errorValues,
        statusValues
    ] = Validation(props)


    return (
        <Container className="container" maxWidth="md" fixed>
            <div>
                <Card>
                    <form onSubmit={handleFormSubmit} noValidate>

                        <p className="form-title">שינוי פרטים אישיים</p>

                        <div className="form-group">
                            <FormControl>
                                <TextField
                                    placeholder="נא כתבו את כתובת האימייל"
                                    onChange={handleChange}
                                    value={contactValues.email}
                                    className="input-form"
                                    label="מייל"
                                    type="search"
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
                                <TextField
                                    placeholder="שם"
                                    onChange={handleChange}
                                    value={contactValues.name}
                                    className="input-form"
                                    label="שם"
                                    type="search"
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
                                <TextField
                                    placeholder="סיסמה"
                                    onChange={handleChange}
                                    value={contactValues.password}
                                    className="input-form"
                                    label="סיסמה"
                                    type="search"
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
                                <TextField
                                    placeholder="טלפון"
                                    onChange={handleChange}
                                    value={contactValues.phone}
                                    className="input-form"
                                    label="טלפון"
                                    type="search"
                                    name="phone"
                                    id="phone-input" />
                                {
                                    errorValues.phoneError.length > 0 &&
                                    (<p className="invalid">{errorValues.phoneError}</p>)
                                }
                            </FormControl>
                        </div>


                        <Button variant="contained" className={classes.submitButton} type="submit" id="contact" color="default">שינוי הפרטים</Button>
                        <p id="success">{statusValues.message}</p>


                    </form>
                </Card>
            </div>
        </Container>
    )
}