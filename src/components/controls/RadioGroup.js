import React from 'react'
import {FormControl, FormLabel, FormControlLabel, Radio, RadioGroup as MuiRadioGroup} from '@material-ui/core'

export default function RadioGroup(props) {
  
  const {name, label, value, onChange, items} = props
  
    return (
        <FormControl>
                           <FormLabel>{label}</FormLabel>
                           <MuiRadioGroup 
                         　　 name={name}
                               value = {value}
                               onChange ={onChange}
                           row={true}>
                               {
                                   items.map((item, index)=>(
                                    <FormControlLabel key={item.id} value={item.id} control={<Radio/>} label={item.title}/>
                             
                                   ))
                               }
                             
                           </MuiRadioGroup>
                       </FormControl>
    )
}
