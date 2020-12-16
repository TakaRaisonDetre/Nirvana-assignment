import React from 'react'
import {FormControl, FormControlLabel, Checkbox as MuiCheckbox} from '@material-ui/core'

export default function CheckBox(props) {

    const convertToDefEventPara = (name, value)=>({
        target:{
            name, value
        }
    })
  
  const {name, label, value, onChange} =props
    return (
      <FormControl>
          <FormControlLabel
          control ={<MuiCheckbox
          name={name}
          color="primary"
          checked={value}
          onChange={e=>onChange(convertToDefEventPara(name, e.target.checked))}
          />}
          label={label}
          />
      </FormControl>
    )
}
