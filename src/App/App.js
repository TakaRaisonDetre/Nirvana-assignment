
// Components group
import Header from '../components/header'
import Employees from '../Pages/Employee/Employee'
import EmployeeList from '../Pages/Employee/EmployeeList'
import Signin from '../Pages/admin/signin'
import Signup from '../Pages/admin/signup'

import React from 'react';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom'
import {CssBaseline, makeStyles, createMuiTheme, ThemeProvider} from '@material-ui/core'

// routing restriction 
import {RedirectAfterSignin, ProtectedRoute } from '../Service/routeHelper'
// Auth listener to identify current user 
import  useAuthListener  from '../Service/use-auth-listener'


// Customized Theme 
const theme = createMuiTheme({
  palette:{primary:{
      main:"#333996",
      light:'#3c44b126'},
    secondary:{
      main: "#f83245",
      light:'#f8324525'},
    background:{
      default:'#f4f5fd'},
    shape:{
      borderRadius:'10px'},
    overrides:{MuiAppBar:{
        root: {
          transform:'translateZ(0)'
        }}}}})

const useStyles = makeStyles ({
  appMain:{
  　paddingLeft :'0px',
　　  paddingRight :'0px',
     width:'100%'
  }
})

function App() {
  
  const classes = useStyles();
 
  const { user } = useAuthListener();

   console.log(user)

  return (
  <ThemeProvider theme={theme}>
     <div　className={classes.appMain}>
      <Header user={user}/>

     <Router>
       
       <Switch>
       <RedirectAfterSignin user={user} loggedInPath="/candidates" path="/signin" exact >
       <Signin/>
       </RedirectAfterSignin>      
    
       <RedirectAfterSignin user={user} loggedInPath="/candidates" path="/signup" exact >
       <Signup/>
       </RedirectAfterSignin>  

       <ProtectedRoute exact user={user} path='/candidates'>
       <EmployeeList/>
       </ProtectedRoute>   

       <Employees/>
       </Switch> 
           
     </Router>
    

      </div>
      <CssBaseline/>
  </ThemeProvider>
    
  );
}

export default App;
