import React from 'react'
import { AppBar, Button, makeStyles, Toolbar } from '@material-ui/core'
import Drawer from '@material-ui/core/Drawer'
import Typography from '@material-ui/core/Typography'
import { useLocation } from 'react-router-dom'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemIcon from '@material-ui/core/ListItemIcon'
import ListItemText from '@material-ui/core/ListItemText'
import { AddCircleOutlineOutlined, SubjectOutlined } from '@material-ui/icons'
import { Outlet, useNavigate} from "react-router";
import MeetingRoomIcon from '@material-ui/icons/MeetingRoom';
import { useAuth } from '../Context/AuthContext'
import ExitToAppRoundedIcon from '@material-ui/icons/ExitToAppRounded';
const drawerWidth = 240

const useStyles = makeStyles((theme)=>({
  page: {
    width: '100%',
    background:'#76ff03'
  },
  root: {
    display: 'flex',
  },
  drawer: {
    display:'block',
    width: drawerWidth,
    [theme.breakpoints.down("sm")]:{
      display:'none',
    }
  },
  drawerPaper: {
    width: drawerWidth,
  },
  active: {
    background:'#76ff03'
  },appBar: {

    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: drawerWidth,
    [theme.breakpoints.down("sm")]:{
      width:'100%',
    }

  },toolbar:theme.mixins.toolbar,
  typo1:{
    flexGrow:'1',
    [theme.breakpoints.down("sm")]:{
    display:'none'
    }
  },typo2:{
    display:'none',
    flexGrow:'1',
    [theme.breakpoints.down("sm")]:{
    display:'block'
    }
  }
}))

export default function Layout({ children }) {
  const classes = useStyles()
  const {currentUser,logout} =useAuth()
  const location = useLocation()
  const  navigate = useNavigate();
  
  const menuItems = [
    { 
      text: 'Warrenty', 
      icon: <SubjectOutlined color="secondary" />, 
      path: '/warrenty' 
    },
    { 
      text: 'Pdf', 
      icon: <AddCircleOutlineOutlined color="secondary" />, 
      path: '/pdf' 
    },
  ];

  return (
    <div className={classes.root}>
      {/* app bar */}
      <AppBar   position="fixed" 
        className={classes.appBar}
        elevation={0}
        color="primary">
        <Toolbar>
          <Typography className={classes.typo1}>
            {Date().toString()}
          </Typography>
          <Typography className={classes.typo2}>
          Rosacrd.com
          </Typography>
        

        <Button
        variant="contained"
        color="primary"
        className={classes.button}
        endIcon={<ExitToAppRoundedIcon/>}
        onClick={async e => {
            e.preventDefault()
            logout()
            navigate('/')
          }}
      >
        Log Out
      </Button>
      </Toolbar>
      </AppBar>

      {/* side drawer */}
      <Drawer 
        className={classes.drawer}
        variant="permanent"
        classes={{ paper: classes.drawerPaper }}
        anchor="left"
      >
        <div>
          <Typography variant="h5" className={classes.title} align='center'>
           Rosacrd.com
          </Typography>
        </div>

        {/* links/list section */}
        <List>
          {menuItems.map((item) => (
            <ListItem 
              button 
              key={item.text} 
              className={location.pathname == item.path ? classes.active : null}
              onClick={ e=>{
                navigate(item.path)
              }}
            >
              <ListItemIcon>{item.icon}</ListItemIcon>
              <ListItemText primary={item.text} />
            </ListItem>
          ))}
       
  
            </List>
      </Drawer>

      {/* main content */}
      <div className={classes.page}>
      <div className={classes.toolbar}></div>
      <Outlet />
      </div>
    </div>
  )
}