import { AppBar, IconButton, Toolbar, Collapse, Typography, Button } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import React, { useEffect, useState } from "react";
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import { Link } from "react-router-dom";
import { useAuth } from "../Context/AuthContext";
import Navlink from "../Context/Navlink";
import { useNavigate } from 'react-router';
import DashboardRoundedIcon from '@material-ui/icons/DashboardRounded';
const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
  toolbar:{
    margin:'auto 20px'
  },appbar:{
    color:'White'
  }
}));

const Header = () => {
  const  navigate = useNavigate();
  const {currentUser,logout} =useAuth()
  const classes = useStyles();
  const [checked, setChecked] = useState(false);
  return (
    <div className={classes.root}>
   <AppBar position="static" className={classes.appbar} color="transparent" elevation="none">
  <Toolbar className={classes.toolbar}>
    <Typography variant="h6" className={classes.title} color="secondary">
    Rosacrd.com
    </Typography>
   {!currentUser && <Link to="/login"> <Button  variant="contained" endIcon={<ExitToAppIcon/>}  >Login</Button></Link>}
   {currentUser && <Navlink
          to='/dashbord'
          name='DashBord'
          variant='contained'
        
        />}
   {currentUser && <Navlink
          to='/logout'
          name='Logout'
          variant='outline'
          color="secondary"
          onClick={async e => {
            e.preventDefault()
            logout()
            navigate('/')
          }}
        />}
  </Toolbar>
</AppBar>

</div>
  );
};

export default Header;
