import React, { useEffect, useState } from 'react';
import {
    BrowserRouter as Router,
    Switch,
    Redirect
  } from 'react-router-dom';

import { AuthRouter } from './AuthRouter';
import  Journalscreen  from '../components/journal/Journalscreen';
import { useDispatch } from 'react-redux';
import { auth } from '../firebase/firebaseConfig';
import { login } from '../actions/auth';
import { PublicRoute } from './PublicRoute';
import { PrivateRoute } from './PrivateRoute';
import { startLoadingNotes } from '../actions/notes';

export const AppRouter = () => {

    const dispatch = useDispatch();

    const [ isLoggedIn, setIsLoggedIn ] = useState(false);
    // bandera para esperar a que conteste firebase 
    const [ checking, setChecking ] = useState(true);


    useEffect(() => {
        
        auth.onAuthStateChanged( async(user) => {

            if ( user?.uid ) {
                dispatch( login( user.uid, user.displayName, user.email ) );
                setIsLoggedIn( true );
              
                dispatch(startLoadingNotes(user.uid))
            } else {
                setIsLoggedIn( false );
            }

            setChecking(false);

        });
        
    }, [ dispatch, setChecking, setIsLoggedIn ])


    if ( checking ) {
        return (
            <h1>Espere...</h1>
        )
    }

    return (
        <Router>
            <div>
                <Switch>
                    <PublicRoute
                        path="/auth"
                        isAuthenticated={ isLoggedIn }
                        component={ AuthRouter }
                    />

                    <PrivateRoute
                        exact
                        path="/"
                        isAuthenticated={ isLoggedIn }
                        component={ Journalscreen }
                    />

                    <Redirect to="/auth/login" />


                </Switch>
            </div>
        </Router>
    )
}
