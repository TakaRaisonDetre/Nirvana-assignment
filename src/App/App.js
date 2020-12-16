
// Components group
import SideMenu from '../components/SideMenu'
import Header from '../components/header'
import Employees from '../Pages/Employee/Employee'
import EmployeeList from '../Pages/Employee/EmployeeList'
import Signin from '../Pages/admin/signin'
import Signup from '../Pages/admin/signup'


import React from 'react';
import {BrowserRouter as Router, Route} from 'react-router-dom'
import './App.css';
import {CssBaseline, makeStyles, createMuiTheme, ThemeProvider} from '@material-ui/core'


// Customized Theme 
const theme = createMuiTheme({
  palette:{
    primary:{
      main:"#333996",
      light:'#3c44b126'
    },
    secondary:{
      main: "#f83245",
      light:'#f8324525'
    },
    background:{
      default:'#f4f5fd'
    },
    shape:{
      borderRadius:'10px'
    },
    overrides:{
      MuiAppBar:{
        root: {
          transform:'translateZ(0)'
        }
      }
    }
  }
})

const useStyles = makeStyles ({
  appMain:{
  　paddingLeft :'320px',
     width:'100%'
  }
})



function App() {
  
  const classes = useStyles();
  return (
  <ThemeProvider theme={theme}>
      <SideMenu/> 
      <div className={classes.appMain}>
      <Header/>
     
     <Router>
     <Route exact path="/signup">
       <Signup/>
     </Route>  
     <Route exact path="/signin">
       <Signin/>
     </Route>   
     <Route exact path="/entry">
       <Employees/>
     </Route>
     <Route exact path="/candidates">
        <EmployeeList/>
     </Route>

     </Router>
      
      </div>
      <CssBaseline/>
  </ThemeProvider>
    
  );
}

export default App;
