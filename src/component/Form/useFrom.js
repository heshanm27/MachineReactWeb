import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core";
 

const usestyle = makeStyles((theme) => ({
  root: {
    "&.MuiFormControl-root": {
      width: "100%",
      margin: theme.spacing(1),
    },
  },
}));

export function useFrom(initilieValues) {
  const [values, setValues] = useState(initilieValues);
    console.log(values.hireDate)
  const handleChanges = (e) => {
    const { name, value } = e.target;

    setValues({
      ...value,
      [name]: value,
    });
  };
  return{ values, setValues, handleChanges};
}

export function Form(props) {
  const classes = usestyle();
  const { children, ...other } = props;
  return (
    <form className={classes.root} autoComplete="off" {...other}>
        {props.children}
    </form>
)
}
