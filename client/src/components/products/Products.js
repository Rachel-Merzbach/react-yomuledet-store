/*
view of all products in the catalog
*/

import { Grid } from '@material-ui/core';
import React, { useEffect, useState } from 'react';
import { getProductsList, insertAllProductsToDB } from '../../service/productsService';
import ProductCard from './ProductCard'
import ProductDialog from './ProductDialog'
import { randomColor } from '@material-ui/x-grid-data-generator';
import './products.css'

export default (props) => {


    const [products, setProducts] = useState([]);
    useEffect(() => {
        getProductsList().then(res => {
            setProducts(res)
            if(!res[0]) {
                insertAllProductsToDB()
            }
        })
    }, [])



    return (
        <>
            { !localStorage.getItem("userId") && <ProductDialog />}
            <Grid container >
                <Grid xs={12} spacing={2}>
                    <Grid container justify="center" >
                        {products.map((p) => (
                            <ProductCard key={p._id} product={p} setReload={props.setReload} color={randomColor()} />
                        ))}
                    </Grid>

                </Grid>

            </Grid>

        </>
    )
}
