import React from 'react'
import {withStyles} from '@material-ui/core';

// withStyle & makeStyles
const style={
    sideMenu:{
     display:'flex',
     flexDirection:'column',
     position:'absolute',
     left:'0px',
     width:'320px',
     height:'100%',
     backgroundColor:'#f0f8ff'
    }
}



const SideMenu=(props)=> {
    const {classes} = props
   
    return (
        <div className={classes.sideMenu}>
            
        </div>
    )
}

export default withStyles(style)(SideMenu)
