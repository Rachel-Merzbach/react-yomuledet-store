/*
the validation functions of the 'addProduct' form
*/
import { useState } from 'react';
import { addProductToCatalog } from '../../service/productsService';
import { v4 as uuid } from "uuid";
import { isDescriptionValid, isNameValid } from '../Login/Validations';

export default () => {

    const [addItemValues, setAddItemValues] = useState({
        name: "",
        description: "",
        price: "",
        picture: "",
    })

    const isEmptyField = "שדה זה הוא חובה"


    const [errorValues, setErrorValues] = useState({
        nameError: isEmptyField,
        descriptionError: isEmptyField,
        priceError: isEmptyField,
    });


    const [statusValues, setStatusValues] = useState({
        message: ''
    })



const updateState = (event) => {
    setAddItemValues({
        ...addItemValues,
        [event.target.name]: event.target.value
    })
}




const priceValidate = (price) => {
    if (price.length < 0 || price.length > 6) {

        return false;
    }
    return true;
}


const addProduct = () => {
    if(form(errorValues)){
        addProductToCatalog({
            "name": addItemValues.name,
            "description": addItemValues.description,
            "sale" : "0",
            "price": addItemValues.price,
            "picture": addItemValues.picture,
    })
        .then((res) => res
        )
    }
    
}






    const handleFormSubmit = (event) => {
        if (!(form(errorValues))) {
            event.preventDefault();
            setStatusValues({
                message: "ההוספה נכשלה"
            })  
        }
        else {
            addProduct();
            setStatusValues({
                message: "הוסף בהצלחה!"
            })  
        }
    }





    const form = (errorValues) => {
        if(addItemValues.picture == ""){
            return false;
        }
        for (const value of Object.values(errorValues)) {
            if (value !== "" && value !== " ") {
                alert("false2")
                return false;
            }
        }
        return true;
    }

    
    const handleChange = (event) => {
        event.preventDefault();
        updateState(event);

        if (event.target.value === "") {
            console.log(event.target.name)
            setErrorValues({
                ...errorValues,
                [`${event.target.name}Error`]: "הינך חייב למלא שדה זה"
            })

            return;
        }
        const evalue = event.target.value;
        const ename = event.target.name
        switch (event.target.name) {


            case 'name':
                if (!isNameValid(evalue)) {
                    var errorDescription = "שם אינו חוקי: נא להקיש אותיות עבריות בלבד";
                    setErrorValues({ ...errorValues, nameError: errorDescription })
                }
                else if (evalue.length < 2) {
                    var errorDescription = "שם אינו חוקי: כמות אותית קטנה מידי";
                    setErrorValues({ ...errorValues, nameError: errorDescription })
                }
                else {
                    setErrorValues({ ...errorValues, nameError: "" })
                }
                break;

                case 'description':
                    if (!isDescriptionValid(evalue)) {
                        var errorDescription = "תיאור אינו חוקי: ישנם תווים בלתי חוקיים";
                        setErrorValues({ ...errorValues, descriptionError: errorDescription })
                    }
                    else if (evalue.length < 15) {
                        var errorDescription = "תיאור אינו חוקי: יש לכתוב פירוט ארוך יותר";
                        setErrorValues({ ...errorValues, descriptionError: errorDescription })
                    }
                    else {
                        setErrorValues({ ...errorValues, descriptionError: "" })
                    }
                    break;

            case "price":
                if (!priceValidate(evalue)) {
                    setErrorValues({
                        ...errorValues,
                        priceError: "המחיר אינו חוקי"
                    })
                }
                else {
                    setErrorValues({ ...errorValues, priceError: "" })
                }
                break;
            default:
                break;
        }
    }

    return [
        addItemValues,
        setAddItemValues,
        errorValues,
        handleChange,
        handleFormSubmit,
        statusValues
    ]
}
