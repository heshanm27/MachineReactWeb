import { Drawer } from '@mui/material'
import React from 'react'
import { DarwerBarStyle } from './DrawerStyle'

export default function DrawerBar() {
    const classes = DarwerBarStyle();
    return (
        <div>
            <nav className={classes.drawer}>
                <Drawer
                variant='permanent'
                open
                anchor='left'
                classes={{paper:classes.drawerPaper}}
                >
                    left drawer
                </Drawer>
            </nav>
        </div>
    )
}
