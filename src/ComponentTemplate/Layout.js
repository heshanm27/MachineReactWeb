import { ClassNames } from "@emotion/react";
import React from "react";
import { Outlet, useLocation } from "react-router";
import { makeStyles } from "@mui/styles";
import { Drawer, ListItem, ListItemIcon, ListItemText, Typography ,List} from "@mui/material";
import { AddOutlined, SubjectOutlined } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
//darwer size
const drawerWidth = 240;
const useStyles = makeStyles({
  page: {
    background: "#F9f9f9",
    width: "100%",
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
});

export default function Layout({ childern }) {
  const classes = useStyles();
  const history = useNavigate()
  const location = useLocation();
  const menuItem = [
    {
      text: "Home",
      icon: <SubjectOutlined color="primary" />,
      path: "/",
    },
    {
        text:'Create',
        icon:<AddOutlined color="primary"/>,
        path:"/Create"
    }

  ];

  return (
    <div className={ClassNames.root}>
      {/*side darwer */}
      <Drawer
        className={classes.drawer}
        variant="permanent"
        anchor="left"
        classes={{ paper: classes.drawerPaper }}
      >
        <div>
          <Typography varient="h5" align="center">
            DashBord
          </Typography>
        </div>
        {/*list item*/}
        <List>
          {menuItem.map((item) => (
            <ListItem 
              button 
              key={item.text} 
              onClick={() => history(item.path)}
              className={location.pathname === item.path ? classes.active : null}
            >
              <ListItemIcon>{item.icon}</ListItemIcon>
              <ListItemText primary={item.text} />
            </ListItem>
          ))}
        </List>
      </Drawer>

      <div className={classes.page}>
        <Outlet />
      </div>
    </div>
  );
}
