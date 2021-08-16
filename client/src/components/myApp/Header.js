/*
the Header - contains links to the whole paths, changed depending on the user currently logged in
*/
import React, { useState } from 'react';
import BottomNavigation from '@material-ui/core/BottomNavigation';
import BottomNavigationAction from '@material-ui/core/BottomNavigationAction';
import FavoriteIcon from '@material-ui/icons/Favorite';
import { Menu, MenuItem } from '@material-ui/core';
import { NavLink, useHistory } from 'react-router-dom';
import logo from './logo192.png'
import { isManager } from '../../service/usersService';
import { AccountBoxOutlined, AccountCircleOutlined, AddToQueueRounded, DesktopWindowsOutlined, ExitToAppRounded, ShoppingCartRounded } from '@material-ui/icons';
import border from './border.png'

export default (props) => {

    const [anchorEl, setAnchorEl] = useState(null);
    const history = useHistory();

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };


    const [value, setValue] = useState(0);

    const [manager, setManager] = useState(false)
    isManager().then(res => setManager(res))

    const logout = () => {
        localStorage.removeItem("userId") 
        history.push("/")
        handleClose()
    }

    return (
        <div className="header">
            <div>
                <BottomNavigation
                    value={value}
                    onChange={(event, newValue) => {
                        setValue(newValue);
                    }}
                >

                    {
                        localStorage.getItem("userId") && !manager && <div className="buttonHeader">
                            <BottomNavigationAction onClick={handleClick} icon={<AccountBoxOutlined className="icon" />} label="הפרופיל שלי" showLabel />
                            <Menu
                                id="simple-menu"
                                anchorEl={anchorEl}
                                open={Boolean(anchorEl)}
                                onClose={handleClose}
                            >
                                <BottomNavigationAction label=" שינוי פרטים אישיים " showLabel icon={<AccountCircleOutlined />} component={NavLink} to="/self-area/change-detailes" />
                                <BottomNavigationAction label=" סל הקניות שלי " showLabel icon={<ShoppingCartRounded />} component={NavLink} to="/cart" />
                                <BottomNavigationAction label=" יציאה " showLabel icon={<ExitToAppRounded />} onClick={logout} />

                            </Menu>
                        </div>
                    }



                    {localStorage.getItem("userId") && manager && <div className="buttonHeader">
                        <BottomNavigationAction aria-controls="simple-menu" showLabel aria-haspopup="true" onClick={handleClick} icon={<AccountBoxOutlined className="icon" />} label="פרופיל מנהל" />
                        <Menu
                            id="simple-menu"
                            anchorEl={anchorEl}
                            keepMounted
                            open={Boolean(anchorEl)}
                            onClose={handleClose}
                        >
                            <BottomNavigationAction label=" הוספת מוצרים " showLabel icon={<AddToQueueRounded />} component={NavLink} to="/add-product" />
                            <BottomNavigationAction label=" יציאה " showLabel icon={<ExitToAppRounded />}  onClick={logout} />
                        </Menu>
                    </div>
                    }

                    {
                        !localStorage.getItem("userId") &&
                        <div className="buttonHeader">
                            <BottomNavigationAction label="התחברות / הרשמה" showLabel icon={<FavoriteIcon className="icon" />} component={NavLink} exact to="/login-container" />
                        </div>
                    }


                    <div className="buttonHeader">
                        <BottomNavigationAction label="המוצרים שלנו" showLabel icon={<DesktopWindowsOutlined className="icon" />} component={NavLink} to="/products" />
                    </div>


                    <div className="buttonHeader" >
                        <MenuItem component={NavLink} to="/" className="buttonHeader2" img={logo}><img src={logo} className="img"></img></MenuItem>
                    </div>

                </BottomNavigation>
            </div>
            <img src={border} className="myBorder" />
        </div>
    );
}

