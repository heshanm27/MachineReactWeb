import { AppBar, Toolbar, Typography } from '@material-ui/core'
import React from 'react'
import { makeStyles } from '@material-ui/core/styles';
import Avatar from '@material-ui/core/Avatar';


const useStyle = makeStyles(theme=>({

    logoLg:{
        color:"white",
        display:'none',
        [theme.breakpoints.up("sm")]:{
            display:'block'
        },
    },
    logoSm:{
        display:'block',
        [theme.breakpoints.up('sm')]:{
            display:'none'
        }
    },
    toolbar:{
        display:'flex',
        justifyContent:'space-between'
    }

}))




export default function NavBar() {

    const classes = useStyle();
    return (
        <AppBar position='static'>
            <Toolbar className={classes.toolbar}>
                <Typography variant='h6' className={classes.logoLg}>
                        DEV SLIIT
                </Typography>
                <Typography variant='h6' className={classes.logoSm}>
                        SLIIT
                </Typography>
                <div>
                <Avatar className={classes.orange}>N</Avatar>
                </div>
              
            </Toolbar>
        </AppBar>
    )
}
