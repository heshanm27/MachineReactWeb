import React from 'react'
import { Outlet, useLocation } from "react-router";
import DrawerBar from '../Bars/Drawer/DrawerBar';
import { LayoutStyle } from './LayoutStyle';


export default function Layout() {

    const classes =LayoutStyle();
    return (
        <div className={classes.root}>
        <DrawerBar/>
            <main >
            <Outlet />
            </main>
        </div>
    )
}
