import { Icon, ListItem, ListItemIcon, ListItemText } from '@material-ui/core'
import React, { useEffect, useState } from 'react'
import {useStyles} from './DrawerStyle'
import clsx from 'clsx' 
import { Navigate, useLocation, useNavigate } from 'react-router'
import { useAuth } from '../../Context/AuthContext'
function NavListitem({label,icon,activeIcon,path,onClick}) {
    const classes= useStyles()
    const [active,setActive] =useState(true);
    const location = useLocation()
    const  navigate = useNavigate();
    const {currentUser,logout} =useAuth()
    useEffect(()=>{

        setActive(location.pathname === path)
    },[location])
    return (
        /* menuitem class deafult if active is true menuitemative class will be set */
       <ListItem
       button
       key={label}
       onClick={ () =>{
           if(path === 'logout'){
            logout()
            navigate('/') 
           }else{
               {onClick()}
           navigate(path) 
           }
              }}
        className={clsx(classes.menuitem,active && classes.menuItemactive)}>
           <ListItemIcon  >
               {active ? activeIcon : icon }
           </ListItemIcon>
           <ListItemText
               primary={label}
               primaryTypographyProps={{varient:"body2"}} 
           />
       </ListItem>
    )
}

export default NavListitem
