/*
this component implements the payment gateway using PAYPAL system
*/
import React from 'react';
import { PayPalButton } from 'react-paypal-button-v2';
import PaypalExpressBtn from 'react-paypal-express-checkout';
import { deleteCart } from '../../service/usersProductsService';
import Stack from '@mui/material/node/Stack'
import Alert from '@mui/material/node/Alert'
import AlertDialogSlide from './order';

export default (props) => {
    const onSuccess = (payment) => {
        deleteCart()
        // Congratulation, it came here means everything's fine!
        console.log("The payment was succeeded!", payment);
        props.setReload()
        // You can bind the "payment" object's value to your state or props or whatever here, please see below for sample returned data
    }
    const onCancel = (data) => {
        localStorage.setItem("order", true) 
        deleteCart()       
        props.setReload()
        props.history.push("/")

    }

    const onError = (err) => {
        localStorage.setItem("order", true)
        deleteCart()  
        props.setReload()     
        props.history.push("/")


    }

    let env = 'sandbox'; // you can set here to 'production' for production
    let currency = 'ILS'; // or you can set this value from your props or state
    let total = props.total; // same as above, this is the total amount (based on currency) to be paid by using Paypal express checkout
    // Document on Paypal's currency code: https://developer.paypal.com/docs/classic/api/currency_codes/

    const client = {
        sandbox: 'ARPToNZV6-X7j4SMf6sj87ciGQ4HWaCEFjqDbYZEGtkDEj8A1nGnM69Lpr2a6X69zt-fnvnoOyqO8IMz',
        production: 'AARKQTS2FFFVQ',
    }
    // In order to get production's app-ID, you will have to send your app to Paypal for approval first
    // For sandbox app-ID (after logging into your developer account, please locate the "REST API apps" section, click "Create App"):
    //   => https://developer.paypal.com/docs/classic/lifecycle/sb_credentials/
    // For production app-ID:
    //   => https://developer.paypal.com/docs/classic/lifecycle/goingLive/

    // NB. You can also have many Paypal express checkout buttons on page, just pass in the correct amount and they will work!

    return (
        <PaypalExpressBtn env={env} client={client} currency={currency} total={total} onError={onError} onSuccess={onSuccess} onCancel={onCancel} />
    );
}
