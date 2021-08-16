/*
the validation functions of the 'Login' form
*/
import { useState } from 'react';
import { isEmailExist, userPassword } from '../../service/usersService';
import { isEmailValid, isFormValid } from './Validations';


export default function Validation(props, handleSubmit)  {

    

    const isEmptyField = "שדה זה הוא חובה"

    const [formValues, setFormValues] = useState({
        email: '',
        password: '',
    })

    const [errorValues, setErrorValues] = useState({
        emailError: isEmptyField,
        passwordError: isEmptyField,
    });

    const [statusValues, setStatusValues] = useState({
        message: ''
    })


    const updateState = (event) => {
        setFormValues({
            ...formValues,
            [event.target.name]: event.target.value
        })
    }



    const handleChange = (event) => {
        event.preventDefault(); 
        const ename = event.target.name;
        const evalue = event.target.value;

        updateState(event); 


        if (evalue === "") {
            setErrorValues({
                ...errorValues,
                [`${ename}Error`]: isEmptyField
            })
            return
        }

        if (ename === 'email') {
            if (!isEmailValid(evalue)) {
                var errorDescription = "כתובת אימייל אינה חוקית";
                setErrorValues({ ...errorValues, emailError: errorDescription })
            }
            else {
                setErrorValues({ ...errorValues, emailError: "" })
            }
        }
        if (ename === 'password') {
            if (evalue.length > 0) {
                setErrorValues({ ...errorValues, passwordError: "" })
            }
        }
    }

    const handleFormSubmit = (event) => {
        event.preventDefault();
        if (!isFormValid(errorValues)) {
            setStatusValues({ message: "חסרים פרטים בקובץ" })
        }
        else {
            isEmailExist(formValues.email).then(res => {
                if (res) {
                    if (userPassword(formValues.password, res.password)) {
                        localStorage.setItem("userId", res._id)
                        props.setReload()
                        handleSubmit()
                    }
                    else {
                        setStatusValues({ message: "המייל לא מתאים לסיסמה" })
                        event.preventDefault();
                    }
                }
                else {
                    setStatusValues({ message: "עדיין לא נרשמת" })
                    event.preventDefault();
                }
            })
        }
    }



    return [
        handleChange,
        handleFormSubmit,
        formValues,
        errorValues,
        statusValues
    ]
}
