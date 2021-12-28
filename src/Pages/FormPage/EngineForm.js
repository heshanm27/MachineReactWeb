import React from 'react'
import { Form,useFrom } from '../../component/Form/useFrom'

import {
    makeStyles,
    Button,
    Grid,
  } from "@material-ui/core";
import Inputprop from '../../component/Inputs/Input';

const initialValues = {
 
    Code:" ",
    Brand:" "
}

export default function EngineForm() {

       const {values,setValues,handleChanges} =useFrom(initialValues)
       console.log(values)
    return (
        <Form>
        <Grid container spacing={2}>

            <Grid item xs={12} sm={6}>
                <Inputprop
                name="Brand"
                label="Engine Brand"
                value={values.Brand}
                onChange={handleChanges}
                fullWidth

                />

           
            </Grid>
            <Grid item xs={12} sm={6}>
               
                   <Inputprop
                name="EngineCode"
                label="Engine Code"
                value={values.Code}
                onChange={handleChanges}
                fullWidth
                />

           
            </Grid>
        </Grid>


        </Form>
    )
}
