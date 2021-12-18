import { ClassNames } from "@emotion/react";
import React from "react";
import { Outlet, useLocation } from "react-router";
import { makeStyles } from "@mui/styles";
import {
  Drawer,
  ListItem,
  ListItemIcon,
  ListItemText,
  Typography,
  List,
  Toolbar,
  Divider,
} from "@mui/material";
import { AddOutlined, SubjectOutlined } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import { Box } from "@mui/system";

//darwer size
const drawerWidth = 240;
const useStyles = makeStyles((theme) => {
  return {
    page: {
      background: "#F9f9f9",
      width: `clac(100%- ${drawerWidth}px)`,
      height: "200vh",
    },
    drawer: {
      width: drawerWidth,
    },
    drawerPaper: {
      width: drawerWidth,
    },
    root: {
      display: "flex",
    },
    drawerTitle: {
      marginTop: "30px",
    },
    toolbar: {
        height:'5%'
    }
  };
});

export default function Layout({ childern }) {
  const classes = useStyles();
  const history = useNavigate();
  const location = useLocation();
  const menuItem = [
    {
      text: "Home",
      icon: <SubjectOutlined color="primary" />,
      path: "/",
    },
    {
      text: "Create",
      icon: <AddOutlined color="primary" />,
      path: "/Create",
    },
  ];

  return (
    <Box sx={{ display: 'flex' }}>
    <div className={ClassNames.root}>
      {/*side darwer */}
      
      <Drawer
        className={classes.drawer}
        variant="permanent"
        anchor="left"
        classes={{ paper: classes.drawerPaper }}
      >
        <Toolbar />
        <div className={classes.drawerTitle}>
          <Typography varient="h5" align="center">
            DashBord
          </Typography>
        </div>
        <Divider />
        {/*list item*/}
        <List>
          {menuItem.map((item) => (
            <ListItem
              button
              key={item.text}
              onClick={() => history(item.path)}
              className={
                location.pathname === item.path ? classes.active : null
              }
            >
              <ListItemIcon>{item.icon}</ListItemIcon>
              <ListItemText primary={item.text} />
            </ListItem>
          ))}
        </List>
      </Drawer>
      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
      <div className={classes.page}>
        <div className={classes.toolbar}></div>
          <Outlet />
        
      </div>
      </Box>
    </div>
  
    </Box>
  );
}
