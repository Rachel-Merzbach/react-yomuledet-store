/*
a page which contains both Login and Registraion pages 
*/
import React from 'react';
import Login from './Login';
import Registration from './Registration';
import { Route, Switch, NavLink, useLocation } from 'react-router-dom';
import { BottomNavigationAction, Card, Container, makeStyles } from '@material-ui/core';
import { Person, PersonAdd } from '@material-ui/icons';


const useStyles = makeStyles((theme) => ({
    paper: {
        padding: theme.spacing(2),
        textAlign: 'center',
        color: theme.palette.text.secondary,
    },
    button: {
        
    },
    specialButton: {
        color: 'blue'

    }
}));


export default (propes) => {
    const classes = useStyles();
        function HeaderView() {
            const location = useLocation();
            return location.pathname;
          }
        let mypath = HeaderView(); 
    

    return (
        <Container className="container" maxWidth="md" fixed>
        <div className={classes.root}>
            <Card>
                    <div className={classes.root} className="LoginTitle">
                        <div variant="contained" color="primary" xs={50} >
                            <BottomNavigationAction className={(mypath=="/login-container")? classes.specialButton : classes.button} disabled={mypath=="/login-container"} component={NavLink} icon={<Person />} exact to="/login-container" label="התחברות" showLabel />
                            <BottomNavigationAction className={(mypath=="/login-container/registration")? classes.specialButton : classes.button}  disabled={mypath=="/login-container/registration"} component={NavLink} icon={<PersonAdd />} to="/login-container/registration" label="הרשמה" showLabel />
                        </div>

                        <Switch>
                            <Route exact render={(props) => <Login {...props} reload={propes.reload} setReload={propes.setReload} />} path="/login-container" />
                            <Route exact render={(props) => <Registration {...props} reload={propes.reload} setReload={propes.setReload} />} path="/login-container/registration" />
                        </Switch>
                    </div>

            </Card>
        </div>
        </Container>
    )
}

