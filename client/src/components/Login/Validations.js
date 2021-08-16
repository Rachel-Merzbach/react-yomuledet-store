/*
general validation functions (using: login, registration, change-details, add-product)
*/
export const isNameValid = (name) => {
    var lettersFormat = RegExp(/^[א-ת .!#$%&'*+/=?^_`{|}~-]+$/);
    for (let i in name) {
        if (!name[i].match(lettersFormat)) {
            return false;
        }
    }
    return true
}

export const isDescriptionValid = (desc) => {
    var lettersFormat = RegExp(/^[0-9א-ת .!#$%&'"*+/=?^_:,)(`{|}~-]+$/);
    for (let i in desc) {
        if (!desc[i].match(lettersFormat)) {
            return false;
        }
    }
    return true
}

export const isAddressValid = (address) => {
    var lettersFormat = RegExp(/^[א-ת0-9 ]+$/);
    for (let i in address) {
        if (!address[i].match(lettersFormat)) {
            return false;
        }
    }
    return true
}


export const isEmailValid = (email) => {
    var mailFormat = RegExp(/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/)
    if (mailFormat.test(email)) {
        return true
    }
    return false
}



export const isPasswordValid = (password) => {
    var passwordFormat = RegExp(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]*$/)
    if (passwordFormat.test(password)) {
        return true
    }
    return false
}


export const isPhoneValid = (phone) => {
    var phoneFormat = RegExp(/^[0]+?(([23489]{1}\d{7})|[57]{1}\d{8})$/)
    if (phoneFormat.test(phone)) {
        return true
    }
    return false
}


export const isFormValid = (errorValues) => {
    for (const value of Object.values(errorValues)) {
        if (value !== "") {
            return false;
        }
    }
    return true;
}
