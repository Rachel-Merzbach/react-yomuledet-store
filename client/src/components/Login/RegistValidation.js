/*
the validation functions of the 'Registration' form
*/
import { useState } from 'react';
import { addUser, isEmailExist } from '../../service/usersService';
import { v4 as uuid } from 'uuid'
import { isEmailValid, isFormValid, isNameValid, isPasswordValid, isPhoneValid } from './Validations';

export default function Validation(props, handleSubmit) {


    const isEmptyField = "שדה זה הוא חובה"

    const [statusValues, setStatusValues] = useState({
        message: ''
    })


    const [contactValues, setContactValues] = useState({
        email: "",
        name: "",
        phone: "",
        password: ""
    })

    const [errorValues, setErrorValues] = useState({
        emailError: isEmptyField,
        nameError: isEmptyField,
        phoneError: isEmptyField,
        passwordError: isEmptyField
    });

    const updateState = (event) => {
        setContactValues({
            ...contactValues,
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

        // eslint-disable-next-line default-case
        switch (ename) {
            case 'email':
                if (!isEmailValid(evalue)) {
                    var errorDescription = "כתובת אימייל אינה חוקית";
                    setErrorValues({ ...errorValues, emailError: errorDescription })
                }

                else {
                    setErrorValues({ ...errorValues, emailError: "" })
                }
                break;


            case 'name':
                if (!isNameValid(evalue)) {
                    var errorDescription = "שם אינו חוקי: נא להקיש אותיות עבריות בלבד";
                    setErrorValues({ ...errorValues, [`${ename}Error`]: errorDescription })
                }
                else if (evalue.length < 2) {
                    var errorDescription = "שם אינו חוקי: כמות אותית קטנה מידי";
                    setErrorValues({ ...errorValues, [`${ename}Error`]: errorDescription })
                }
                else {
                    setErrorValues({ ...errorValues, [`${ename}Error`]: "" })
                }
                break;

            case 'password':
                if (!isPasswordValid(evalue)) {
                    var errorDescription = "סיסמה חוקית צריכה להכיל לפחות אות אחת גדולה ואות אחת קטנה";
                    setErrorValues({ ...errorValues, [`${ename}Error`]: errorDescription })
                }
                else if (evalue.length < 8) {
                    var errorDescription = " סיסמה לא חוקית: אורך סיסמה צריך להיות לפחות 8 תווים";
                    setErrorValues({ ...errorValues, [`${ename}Error`]: errorDescription })
                }
                else {
                    setErrorValues({ ...errorValues, [`${ename}Error`]: "" })
                }
                break;

            case 'phone':
                if (!isPhoneValid(evalue)) {
                    var errorDescription = "מספר טלפון אינו תקין";
                    setErrorValues({ ...errorValues, phoneError: errorDescription })
                }
                else {
                    setErrorValues({ ...errorValues, phoneError: "" })
                }
                break;
        }
    }

    const handleFormSubmit = (event) => {
        event.preventDefault()
        if (!isFormValid(errorValues)) {
            setStatusValues({ message: "הפרטים אינם נכונים" })
        }
        else {
            isEmailExist(contactValues.email).then(res => {
                if (res) {
                    setStatusValues({ message: "נרשמת כבר עם כתובת אימייל זו" })
                }

                else {

                    addUser({
                        name: contactValues.name,
                        phone: contactValues.phone,
                        email: contactValues.email,
                        password: contactValues.password,
                        isManager: false
                    }).then(res => {localStorage.setItem("userId", res._id)})

                    props.setReload()
                    handleSubmit()
                }

            }

            )

        }
    }


    return [
        handleChange,
        handleFormSubmit,
        contactValues,
        errorValues,
        statusValues
    ]
}


