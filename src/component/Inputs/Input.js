import { TextField } from '@material-ui/core'
import React from 'react'

export default function Inputprop(props) {
    const {name,value,label,onChange,...other} =props
    return (
       <TextField
       variant="outlined"
       color='secondary'
       label={label}
       name={name}
       value={value}
       onChange={onChange}
       {...other}
       >


       </TextField>
            
      
    )
}
