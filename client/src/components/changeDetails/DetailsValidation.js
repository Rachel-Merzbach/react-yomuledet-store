/* eslint-disable default-case */
/*
the validation functions of the 'changeDetails' form
*/
import { useState } from 'react';
import { getUserDetails, isEmailExist, updateUser } from '../../service/usersService';
import { isEmailValid, isFormValid, isNameValid, isPasswordValid, isPhoneValid } from '../Login/Validations';
import { useEffect } from 'react';

export default function Validation(props) {

    const isEmptyField = ""

    const [statusValues, setStatusValues] = useState({
        message: ''
    })


    const [currentEmail, setCurrentEmail] = useState("")

    const [contactValues, setContactValues] = useState({
        email: "",
        name: "",
        phone: "",
        password: ""
    })

    useEffect(() => {
        getUserDetails().then(res => {
            setContactValues({
                email: res.email,
                name: res.name,
                phone: res.phone,
                password: res.password
            })
            setCurrentEmail(res.email)
        })
    }, [])


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

        if (evalue == "") {
            setErrorValues({
                ...errorValues,
                [`${ename}Error`]: isEmptyField
            })
            return
        }

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
                    var errorDescription = "סיסמה חוקית צריכה להכיל לפחות אות לטינית אחת גדולה ואות אחת קטנה";
                    setErrorValues({ ...errorValues, [`${ename}Error`]: errorDescription })
                }
                else if (evalue.length < 8) {
                    var errorDescription = " אורך סיסמה צריך להיות לפחות 8 תווים";
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

    const emailValidation = (email) => {
        if (isEmailExist(email) && email !== currentEmail) {
            return false;
        }
        return true;
    }

    const handleFormSubmit = (event) => {
        event.preventDefault()
        if (!isFormValid(errorValues)) {
            setStatusValues({ message: "הפרטים אינם נכונים" })
        }

        else {
            if(!emailValidation(contactValues.email)) {
                setErrorValues({ ...errorValues, emailError: "המייל הזה כבר קיים" })
            }
            else {
            updateUser({
                _id: localStorage.getItem("userId"),
                name: contactValues.name,
                phone: contactValues.phone,
                email: contactValues.email,
                password: contactValues.password,
                isManager: false
            })
            setStatusValues({ message: "הפרטים השתנו בהצלחה!" })
        }
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


