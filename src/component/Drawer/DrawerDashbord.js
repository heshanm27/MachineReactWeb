import React, { useState } from "react";
import { useStyles } from "./DrawerStyle";
import Drawer from "@material-ui/core/Drawer";
import { AppBar, CssBaseline, IconButton, List, Toolbar, Typography, useMediaQuery, useTheme } from "@material-ui/core";
import NavListitem from "./NavListitem";
import Dashroutes from "./DashbordRoute";
import MeetingRoomIcon from "@material-ui/icons/MeetingRoom";
import MeetingRoomOutlinedIcon from "@material-ui/icons/MeetingRoomOutlined";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import MenuIcon from "@material-ui/icons/Menu";
import Logo1 from "../../img/logo512.png";
import Logo2 from "../../img/logo192.png";
import clsx from "clsx";
import { Outlet, useNavigate } from "react-router";



function DashBordDarwer() {
    const theme = useTheme()
  const classes = useStyles();
  const [open, setOpen] = useState(true);
    const reslution = useMediaQuery(theme.breakpoints.down('sm'))
  const  navigate = useNavigate();
  const toggelNavigation = () => {
    setOpen(!open);
  };

  const closeNavigation =()=>{
      if(reslution){
        setOpen(false)
      }
       
  }
  return (
    <div className={classes.dashroot}>

  { reslution && <AppBar>
        <Toolbar>
            <IconButton onClick={toggelNavigation} color="inherit">
                <MenuIcon/>
            </IconButton>
            <Typography>
                RosCard.com
            </Typography>
        </Toolbar>
    </AppBar>}
        <CssBaseline />
      <Drawer
        variant={reslution ?"temporary":"permanent"}
        open={open}
        classes={{
          paper: clsx(
            classes.navigationDrawer,
            !open && classes.navigationDawercollapse
          ),
        }}
      >
        <div
          className={clsx(
            classes.navigationtoolBar,
            !open && classes.navigationtoolbarCollaps
          )}
        >
          <IconButton
            onClick={() => {
              toggelNavigation();
            }}
          >
            {open ? <ChevronLeftIcon /> : <MenuIcon />}
          </IconButton>
        </div>
        <div className={classes.navigationLogoContainer}>
          <img
            src={open ? Logo1 : Logo2}
            alt="logo"
            className={classes.navgivationLogo}
          />
        </div>
        <List className={classes.navigationList}>
          {Dashroutes.map((route, index) => {
            return (
              <NavListitem
                label={route.label}
                activeIcon={route.activeIcon}
                icon={route.icon}
                path={route.path}
                onClick={closeNavigation}
              />
            );
          })}
          <div className={classes.navigationSpacer}></div>
          <NavListitem
            label="Log Out"
            activeIcon={<MeetingRoomIcon />}
            icon={<MeetingRoomOutlinedIcon />}
            path='logout'
          />
        </List>
      </Drawer>
      <div className={classes.page}>
      <div className={classes.toolbar}></div>
      <Outlet />
      </div>
    </div>
  );
}

export default DashBordDarwer;
