import React from 'react'
import {Route, Redirect} from 'react-router-dom'

export function RedirectAfterSignin({user, loggedInPath, children, ...restProps}) {
    return (
     <Route
     {...restProps}
     render={()=>{
         if(!user){return children;}
         if(user) {
        return (
                 <Redirect
                 to={{pathname:loggedInPath}}/>
             )
         }
         return null;}}/>
    )}

export function ProtectedRoute({user, children, ...other}){
    return (
        <Route 
        {...other}
        render={({location})=>{
            if(user){ return children;}
            if(!user){
                return (
                    <Redirect 
                    to={{
                        pathname: 'signin',
                        state: {from : location},
                    }}
                    />
                );
            } return null;
        }}
        />
    )
}
