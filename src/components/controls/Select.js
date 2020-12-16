import React from 'react'
import {FormControl, InputLabel, Select as MuiSelect, MenuItem, FormHelperText}
from '@material-ui/core'

export default function Select(props) {
   
    const {name, label, value, error=null, onChange, options} = props
   
    return (
       <FormControl
       {...(error && {error:true})}
       variant="outlined">
           
           <InputLabel>{label}</InputLabel>
           <MuiSelect
           label={label}
           name={name}
           value={value}
           onChange={onChange}>
           <MenuItem value="">-選択-</MenuItem>
           {
               options.map((item)=>(<MenuItem key={item.id} value={item.id}>{item.title}</MenuItem>))
           }
           </MuiSelect>
           {error && <FormHelperText>{error}</FormHelperText>}
       </FormControl>
　　　　　

    )
}
