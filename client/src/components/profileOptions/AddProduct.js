/*
a manager option - adding a new product to the catalog
*/
import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import { Container, Input } from '@material-ui/core';
import AddProductValidation from './AddProductValidation';

const useStyles = makeStyles((theme) => ({
    backForm: {
        width: 700,
        height: 850,
        marginTop: 10,
        marginRight: 400,
    },
    root: {
        display: 'flex',
        flexWrap: 'wrap',
    },
    margin: {
        margin: theme.spacing(3),
    },
    withoutLabel: {
        marginTop: theme.spacing(3),
    },
    textField: {
        width: '25ch',
    },
    text: {
        direction: "rtl"
    },
    marginB: {
        marginBottom: 5
    },
    image: {
        width: 5
    },
    submitButton: {
        background: 'linear-gradient(45deg, #2196F3 30%, #21CBF3 90%)'
    },
    label:{
        "inset-inline-end": "auto"
    }
}));

const toBase64 = (file) =>
    new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result);
        reader.onerror = (error) => reject(error);
    });

export default (props) => {

    const classes = useStyles();
    const [addItemValues,
        setAddItemValues,
        errorValues,
        handleChange,
        handleFormSubmit,
        statusValues
    ] = AddProductValidation()

    const [newProduct, setNewProduct] = useState({});
    const [checkImage, setCheckImage] = useState(null);
    const uploadImageProduct = (product) => {
        if (product.currentTarget.files[0]) {
            toBase64(product.currentTarget.files[0]).then((base64Image) => {
                setAddItemValues(prev => { return { ...prev, picture: base64Image } })
                setNewProduct((prev) => {
                    return { ...prev, src: base64Image }
                })
                setCheckImage(base64Image);
            });
        }
    };

    return (
        <div>
            <Container className="container" maxWidth="md" fixed>
                <Card>
                    <form onSubmit={handleFormSubmit} noValidate className="formLogin">
                    <p className="form-title">הוספת מוצר</p>
                        <div className="form-group">
                            <FormControl>
                                <InputLabel className={classes.label}  htmlFor="outlined-adornment-type" >שם המוצר</InputLabel>
                                <Input
                                    placeholder="נא כתבו את שם המוצר"
                                    value={addItemValues.name}
                                    onChange={handleChange}
                                    className="input-form"
                                    label="מייל"
                                    name="name"
                                    type="text"
                                    id="email-input" />
                                {
                                    errorValues.nameError.length > 0 &&
                                    (<p className="invalid">{errorValues.nameError}</p>)
                                }
                            </FormControl>
                        </div>


                        <div className="form-group">
                            <FormControl>
                                <InputLabel className={classes.label} htmlFor="outlined-adornment-type" >תיאור</InputLabel>
                                <Input
                                    placeholder="תיאור"
                                    value={addItemValues.description}
                                    onChange={handleChange}
                                    className="input-form"
                                    label="תיאור"
                                    name="description"
                                    type="text"
                                    id="description-input" />
                                {
                                    errorValues.descriptionError.length > 0 &&
                                    (<p className="invalid">{errorValues.descriptionError}</p>)
                                }
                            </FormControl>
                        </div>


                        <div className="form-group">
                            <FormControl>
                                <InputLabel className={classes.label} htmlFor="outlined-adornment-type" >מחיר</InputLabel>
                                <Input
                                    placeholder="מחיר"
                                    value={addItemValues.price}
                                    onChange={handleChange}
                                    className="input-form"
                                    name="price"
                                    label="מחיר"
                                    type="number"
                                    id="number-input" />
                                {

                                    errorValues.priceError.length > 0 &&
                                    (<p className="invalid">{errorValues.priceError}</p>)
                                }

                            </FormControl>
                        </div>


                        <div className="form-group">
                            <FormControl>
                                <InputLabel className={classes.label} htmlFor="outlined-adornment-type" >הוסף תמונה</InputLabel>
                                <Input
                                    onChange={(event) => uploadImageProduct(event)}
                                    className="input-form"
                                    label="תמונה"
                                    type="file"
                                    name="filename"
                                    id="image-input" />
                                <img src={checkImage} className="myImage" />
                            </FormControl>
                        </div>


                      
                        <div>

                                <Button variant="contained" className={classes.submitButton} type="submit" id="contact" color="secondary">
                                    אישור</Button>
                        </div>

                        <p id="success">{statusValues.message}</p>



                    </form>
                </Card>
            </Container>
        </div >
    )
}
