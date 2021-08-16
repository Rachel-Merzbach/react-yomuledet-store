/*
this component implements the cart of the user:
there is a table of products and the user can erase them
*/

import React from 'react'
import { useEffect, useState } from 'react'
import { BottomNavigationAction, Button, Fab, FormControl, FormControlLabel, FormLabel, makeStyles, Paper, Radio, RadioGroup, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@material-ui/core'
import { deleteCart, deleteProduct, getPayment, getUserProductsList } from '../../service/usersProductsService'
import { Clear, DeleteRounded, ShoppingCart } from '@material-ui/icons'
import Paypal from './Paypal'
import './cart.css'

export default function CartProducts(props) {
    const [products, setProducts] = useState([]);
    const [price, setPrice] = useState(0)

    const [value, setValue] = React.useState('0');

    const handleChange = (event) => {
        setValue(event.target.value);
    };
    const useStyles = makeStyles({
        table: {
            minWidth: 650,
        },
        image: {
            height: 60
        },
        button: {
            width: 180,
            marginRight: 10,
            marginLeft: 10,
            height: 40

        },
        deleteButton: {
            float: 'left',
            marginRight: '5vw'
        }
    });
    const [sumDiscount, setSumDiscount] = useState(0)
    useEffect(() => {
        getUserProductsList().then(res => {
            console.log()
            setProducts(res)
            getPayment().then(res => { console.log(res); setPrice(res[0]); setSumDiscount(res[1]) })
        })
    }, [props.reload])

    const classes = useStyles();

    const remove = (id) => {
        deleteProduct(
            localStorage.getItem("userId"),
            id
        ).then(() => {
            props.setReload()
        })

    }



    return (

        <div className="cart" >

            <TableContainer component={Paper}>
                <Table className={classes.table} aria-label="simple table">
                    {products ? <TableHead>
                        <TableRow>
                            <TableCell align="right">שם המוצר</TableCell>
                            <TableCell align="right">תיאור</TableCell>
                            <TableCell align="right" >מחיר</TableCell>
                            <TableCell align="right" >תמונה</TableCell>
                        </TableRow>
                    </TableHead> : <p>העגלה שלך ריקה</p>}
                    <TableBody>
                        {products && products.map((product) => (
                            <TableRow key={product.name}>
                                <TableCell align="right" component="th" scope="row">
                                    {product.name}
                                </TableCell>
                                <TableCell align="right" component="th" scope="row">
                                    {product.description}
                                </TableCell>
                                <TableCell align="right" >₪{Math.round((parseFloat(product.price) - parseFloat(product.sale) * parseFloat(product.price) / 100) * 10) / 10}</TableCell>
                                <TableCell align="right" ><img className={classes.image} src={product.picture} /></TableCell>
                                <TableCell>
                                    {product.sale !== "0" &&
                                        <Fab className={classes.saleButton} color="primary" aria-label="add" style={{ backgroundColor: props.color }}>

                                            במבצע
                                    </Fab>
                                    }

                                </TableCell>
                                <TableCell>
                                    <Button disabled={false} className={classes.button} onClick={() => remove(product._id)}>
                                        <Clear />
                                    </Button>
                                </TableCell>
                            </TableRow>
                        ))
                        }
                    </TableBody>
                </Table>
            </TableContainer>


            {/* {products && <Link onClick={() => { deleteCart().then(() => props.setReload()) }}><Button><DeleteRounded />לרוקן את העגלה</Button></Link>} */}
            {/* {products && <><BottomNavigationAction label="אני רוצה לרוקן את העגלה" showLabel icon={<DeleteRounded />} onClick={() => { deleteCart().then(() => props.setReload()) }}></BottomNavigation></>} */}
            {products && <>
                <Button  className={classes.deleteButton} onClick={() => { deleteCart().then(() => props.setReload()) }}>
                            <DeleteRounded /> לרוקן את העגלה
                        </Button>
            </>}



            <div style={{ justifyContent: 'center' }} >
                <div style={{ justifyContent: 'center', marginRight: "10vh", marginLeft: '10vh', paddingTop: '5vh' }}>
                    {price > 0 && <FormControl component="fieldset">
                        <FormLabel component="legend">שיטת המשלוח</FormLabel>
                        <RadioGroup style={{ display: 'initial' }} aria-label="gender" name="gender1" value={value} onChange={handleChange}>
                            <FormControlLabel value="50" control={<Radio />} label="שליח עד הבית" />
                            <FormControlLabel value="0" control={<Radio />} label="רוצה לקחת את המוצרים בעצמי" />
                        </RadioGroup>
                        <FormControl label="רחוב" ></FormControl>
                    </FormControl>}
                    {
                        value == "50" && <p className="deliver">משלוח: {value} ₪</p>
                    }
                    {price > 0 && <p className="pay">לתשלום: {value == "0" ? price : (parseFloat(price, 10) + 50)} ₪</p>}
                    {/* {value == "50" && <div><p >משלוח: {value} ₪</p>
                        <p >בסך הכל: {price + parseFloat(value, 10)} ₪</p></div>} */}
                    {price > 0 && <div>
                        <p className="discount">בקנייה זו חסכת:  {sumDiscount} ₪</p>
                        <p><small>*לאחר התשלום ניצור איתך קשר בטלפון לגבי כתובת ומועד הזמנה*</small></p>
                        <Paypal total={price} history={props.history}/>
                    </div>}

                </div>
            </div>



        </div>


    )
}