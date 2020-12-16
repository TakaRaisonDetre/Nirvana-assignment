import React, {useState} from 'react'
import {makeStyles} from '@material-ui/core'

export  function useForm(initialFvalue, validateOnChange=false, validate) {
    
    //state
 const [values, setValues] = useState(initialFvalue);
 const [errors, setErrors] = useState({});

const handleInputChange =(event)=>{
    const {name, value} = event.target 
    setValues({
        ...values,
        [name]:value
    })
    if(validateOnChange)
    validate({[name]:value})
}

const resetForm =()=>{
    setValues(initialFvalue)
    setErrors({})
}

    return {
        values,
        setValues,
        errors,
        setErrors,
        handleInputChange,
        resetForm
}}

// Mateiral UI theme 
const useStyles= makeStyles(theme =>({
    root:{
       '& .MuiFormControl-root':{
           width:'80%',
           margin:theme.spacing(1)
       }
    }
 }))


export function Form(props) {
   
   const classes= useStyles()

   const {children, ...other} =props
   
    return (
        <form className={classes.root} autoComplete="off" {...other}>
            {props.children}
        </form>
    )
}
