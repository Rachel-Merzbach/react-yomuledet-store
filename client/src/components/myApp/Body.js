/*
the body of the application - contains the routing to the whole components (without Header & Footer)
*/

import React, { useState } from 'react';
import { Route, Switch } from 'react-router';
import Error404 from './Error404'
import ChangeDetails from "../changeDetails/ChangeDetails"

import LoginContainer from '../Login/LoginContainer';
import Products from '../products/Products';
import View from './View'
import CartProducts from '../cart/CartProducts'
import AddProduct from '../profileOptions/AddProduct';
import { isManager } from '../../service/usersService';

export default (props) => {
    const [manager, setManager] = useState(false)
    isManager().then(res => setManager(res))

    return (
        <div className="body">
            <Switch>
                <Route exact component={View} path="/" />
                {!manager && localStorage.getItem("userId") && <Route component={ChangeDetails} path="/self-area/change-detailes" />}
                <Route component={() => <LoginContainer reload={props.reload} setReload={props.setReload} />} path="/login-container" />
                <Route component={() => <Products reload={props.reload} setReload={props.setReload} />} path="/products" />
                {manager && <Route component={ () => <AddProduct reload={props.reload} setReload={props.setReload}/>} path="/add-product" />} 
                {!manager && localStorage.getItem("userId") && <Route render={(newProps) => <CartProducts {...newProps} user={localStorage.getItem("userId")} reload={props.reload} setReload={props.setReload} />} path="/cart" />}
                <Route component={Error404} />
            </Switch>

        </div>
    )
}