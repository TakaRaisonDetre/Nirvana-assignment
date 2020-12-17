import React from 'react'
import {AppBar, Toolbar, Grid, InputBase,  makeStyles} from '@material-ui/core'
import SearchIcon from '@material-ui/icons/Search';

const useStyles = makeStyles(theme=>({
    root:{
        backgroundColor: '#fff',
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
}
}))




export default function Header() {
  
    const classes = useStyles();
  
  
    return (
     <AppBar position ='static'  className={classes.root}>
         <Toolbar>
            <Grid container alignItems="center">
                <Grid item >

                    <InputBase
                    placeholder ="検索"
                    className={classes.searchInput}
                    startAdornment={<SearchIcon fontSize="small"/>}
                    />

                </Grid>
                <Grid item sm></Grid>
                <Grid item  >
                    
                </Grid>
            </Grid>

         </Toolbar>
     </AppBar>
    )
}
