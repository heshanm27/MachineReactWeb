import React from 'react'
import {Alert} from '@material-ui/lab';
import {Snackbar} from '@material-ui/core';
export default function Notification(props) {
    const {notify,setNotify} =props

    const handleClose=()=>{
        setNotify({
            ...notify,
            isOpen:false
        })
    }

    return (
       <Snackbar
       open={notify.isOpen}
       autoHideDuration={2000}
        onClose={handleClose}
       >
           <Alert severity={notify.type}  onClose={handleClose} >
            {notify.message}
           </Alert>
       </Snackbar>
    )
}
