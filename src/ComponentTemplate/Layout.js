import { ClassNames } from '@emotion/react'
import React from 'react'
import { Outlet } from 'react-router'
import { makeStyles } from '@mui/styles'
import { Drawer, Typography } from '@mui/material'

//darwer size
const drawerWidth=240;
const useStyles = makeStyles({

    page:{
        background:'#F9f9f9',
        width:'100%'
    },
    drawer:{
        width:drawerWidth
    },
    drawerPaper:{
        width:drawerWidth
    },
    root:{
        display:'flex'
    }
})



export default function Layout({childern}) {

    const classes =useStyles();
    return (
        <div className={ClassNames.root}>
        {/*side darwer */}
        <Drawer
        className={classes.drawer}
        variant='permanent'
        anchor='left'
        classes={{paper:classes.drawerPaper}}

        >
            <div>
                <Typography varient='h5' align='center'>
                        DashBord
                </Typography>
            </div>
        </Drawer>

        <div className={classes.page}>
       <Outlet/>
       </div>



        </div>
    )
}
