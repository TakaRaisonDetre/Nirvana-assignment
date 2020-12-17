import React,{useContext} from 'react'
import {AppBar, Toolbar, Grid, InputBase, IconButton, makeStyles} from '@material-ui/core'
import PowerSettingsNewIcon from '@material-ui/icons/PowerSettingsNew';
import { FirebaseContext } from '../context/firebase';

const useStyles = makeStyles(theme=>({
    root:{
        backgroundColor: '#c0c0c0',
        fontColor:'#121212'
    },
    searchInput:{
        opacity:'0.6',
        padding: `0px ${theme.spacing(1)}`,
        fontSize: '0.8rem',
        '&:hover':{
            backgroundColor:'#f2f2f2'
    },
    '& .MuiSvgIcon-root':{
        marginRight:theme.spacing(1)
    },
    Text:{
        opacity:'0.6',
        padding: `0px ${theme.spacing(1)}`,
        fontSize: '0.8rem',
        Color:'#121212'
    }
}
}))




export default function Header() {
  
  const { firebase } = useContext(FirebaseContext);
  const user = firebase.auth().currentUser || {};
  
  const classes = useStyles();
   
    console.log(user.displayName)
  
    return (
     <AppBar position ='static'  className={classes.root}>
         <Toolbar>
            <Grid container alignItems="center">
                <Grid item >
                    
                <div>{user.displayName}</div>
                
                </Grid>
                <Grid item sm> </Grid>
                <Grid item  >
                    {
                        user?(
                            <IconButton
                            onClick={() => firebase.auth().signOut()}>
                            <PowerSettingsNewIcon fontSize="small" /> 
                            </IconButton>
                        ): null
                    }
                </Grid>
            </Grid>

         </Toolbar>
     </AppBar>
    )
}
