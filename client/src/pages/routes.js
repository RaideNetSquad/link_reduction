import React from 'react';
import {Redirect, Route, Switch} from 'react-router-dom';
import {AuthPage} from './auth_page';
import {CreatePage} from './create_page';
import {DetailPage} from './detail_page';
import {LinksPage} from './links_page';

export const useRoutes = isAuthenticated => {
    //getting params and return route
    if(isAuthenticated)
    {
        return (
            <Switch>

                <Route path="/links" exact>
                    <LinksPage />
                </Route>

                <Route path="/create" exact>
                    <CreatePage />
                </Route>

                <Route path="/link/:id" exact>
                    <DetailPage />
                </Route>

                <Redirect to="/create" />

            </Switch>
        )
    }
    //user is anonim
    return(
        <Switch>
            <Route path="/" exact>
                <AuthPage />
            </Route>
            <Redirect to="/" />
        </Switch>
    )
}