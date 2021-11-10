/*
view of each product in the catalog
*/

import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import { ShoppingCart, RemoveShoppingCart, DeleteForeverRounded} from '@material-ui/icons';
import { addSaleToProduct, removeProduct } from '../../service/productsService'
import { addProduct, deleteProduct, isProductExist } from '../../service/usersProductsService'
import { v4 as uuid } from 'uuid'
import { isManager } from '../../service/usersService';
import { Fab } from '@material-ui/core';
import ProductAddSale from './ProductAddSale';



const useStyles = makeStyles({
    root: {
        width: 200,
        margin: 10,
        borderWidth: '2',
        borderRadius: '3%',
        position: 'relative'

    },
    media: {
        height: 150,
        width: 200,

    },
    button: {
        width: 1000,
        marginRight: 10,
        marginLeft: 10,
        height: 40

    },
    productName: {
        fontSize: 23,
        height: 50,
        fontFamily: 'Varela Round'

    },
    productDescription: {
        fontSize: 20,
        height: 140,
        fontFamily: 'Varela Round'


    },
    productPrice: {
        fontSize: 25,
        fontWeight: 'bold',
        height: 40,
        fontFamily: 'Varela Round'

    },
    eraseButton: {
        width: 200,
        height: 40
    },
    saleButton: {
        marginTop: '-20vh',
        position: 'absolute',
        transform: 'translate(-50%, -50%)',
        top: '50%',
        left: '50%',
        color: 'white',
        padding: '12px',
        cursor: 'pointer',
        zIndex: '100'
    },

    ifSale: {
        fontSize: 15,
        fontWeight: 'bold',
        height: 40,
        fontFamily: 'Varela Round',
        textDecoration: 'line-through',

    }
});



export default (props) => {

    const [manager, setManager] = useState(false)

    const [enabled, setEnabled] = useState(false);

    isManager().then(res => setManager(res))
    const classes = useStyles();

    
    const isProductUser = (prodcutId) => {
        return isProductExist(prodcutId)
            .then(res => setEnabled(!res))
    }

    

    useEffect(() => {
        isProductUser(props.product._id)
    }, [])



    const add = () => {
        addProduct({
            userId: localStorage.getItem("userId"),
            productId: props.product._id
        });
        setEnabled(!enabled)
    }

    const remove = () => {
        deleteProduct(
            localStorage.getItem("userId"),
            props.product._id
        );
        setEnabled(!enabled)
    }

    const [open, setOpen] = useState(0)

    const handleClickOpen = () => {
        if(open < 1)
        setOpen(1);
      };

    const priceAfterSale = parseFloat(props.product.price) - parseFloat(props.product.sale) * parseFloat(props.product.price) / 100

    return (
        <div>
            <Card className={classes.root} style={{ borderColor: props.color}} variant="outlined">
                {props.product.sale !== "0" && !manager &&
                    <Fab className={classes.saleButton} color="primary" aria-label="add" style={{ backgroundColor: props.color }}>
                        {Math.round(parseFloat(props.product.sale), 2)}% הנחה
                    </Fab>}

                    {props.product.sale == "0" && manager &&
                    <Fab onClick={handleClickOpen} className={classes.saleButton} color="primary" aria-label="add" style={{ backgroundColor: props.color }}>
{                        open==1 && <ProductAddSale  open={open} setOpen={setOpen} handleClickOpen={handleClickOpen} product={props.product} setReload={props.setReload}/>}
                        הוספת הנחה
                    </Fab>}
                    
                    {props.product.sale !== "0" && manager &&

                    <Fab onClick={() =>addSaleToProduct(props.product, "0", props.setReload)} className={classes.saleButton} color="primary" aria-label="add" style={{ backgroundColor: props.color }}>
                        הסרת הנחה
                    </Fab>}

                    


                <CardActionArea className="rootCard">


                    <CardMedia
                        className={classes.media}
                        image={props.product.picture}
                    />
                    <CardContent>
                        <Typography className={classes.productName} gutterBottom variant="h5" component="h2">
                            {props.product.name}
                        </Typography>
                        <Typography className={classes.productDescription} variant="body2" color="textSecondary" component="p">
                            {props.product.description}
                        </Typography>

                    </CardContent>

                    <Typography className={classes.productPrice} variant="body2" color="textSecondary" component="p">
                        {props.product.sale !== "0" && <>₪{Math.round(priceAfterSale*10)/10}</>}
                        {props.product.sale == "0" && <>₪{Math.round(props.product.price*10)/10}</>}
                    </Typography>

                    <Typography className={classes.ifSale} variant="body2" color="textSecondary" component="p">
                        {props.product.sale !== "0" && <> ₪{props.product.price}</>}

                    </Typography>


                </CardActionArea>
                <CardActions >

                    {!manager && localStorage.getItem("userId") &&
                        <Button disabled={!enabled} className={classes.button} onClick={() => add()}>
                            <ShoppingCart />
                        </Button>
                    }

                    {!manager && localStorage.getItem("userId") &&
                        <Button disabled={enabled} className={classes.button} onClick={() => remove()}>
                            <RemoveShoppingCart />
                        </Button>
                    }

                    {manager && <Button className={classes.eraseButton} onClick={() => removeProduct(props.product._id, props.setReload)}>
                        <DeleteForeverRounded />
                    מחיקת המוצר
                </Button>}


                </CardActions>
            </Card >
        </div>
    );
}
