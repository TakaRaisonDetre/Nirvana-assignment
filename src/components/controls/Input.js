import React from 'react'
import {TextField, makeStyles}  from '@material-ui/core'

export default function Input(props) {

    const useStyles = makeStyles(theme=>({
        root:{
            margin:theme.spacing(0.5),
            marginTop:'10px',
            marginLeft:'5px',
            marginRight:'5px',
            marginButtom:'10px',
        },
    }))

    const { name, label, value, onChange, error=null, multiline, ...other} = props
    const classes=useStyles();
    return (
        <TextField
        variant="outlined"
        label={label}
        name={name}
        value = {value}
        multiline = {multiline? multiline : null}
        onChange ={onChange}
        {...other}
        {...(error && {error:true, helperText:error})}
        classes ={{root:classes.root}}
        />
    )
}
