import { AppBar,  Toolbar, Typography } from "@mui/material";
import { Link } from "react-router-dom";

import { makeStyles } from "@mui/styles";

const useStyles = makeStyles(()=>{

  return{
    appbartitle:{
      flexGrow:'1'
    }

  }
})

const Navbar = () => {
  const classes = useStyles()
    return (
   
      <AppBar position="fixed" sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}>
        <Toolbar>
          <Typography className={classes.appbartitle} color="common.white">
            Welcome to DashBord
          </Typography>
          <Typography color="common.white"> 
            Mario
          </Typography>
        </Toolbar>
      </AppBar>



      // <nav className="navbar">
      //   <h1>The Dojo Blog</h1>
      //   <div className="links">
      //     <Link to="/">Home</Link>
      //     <Link to="/create" style={{ 
      //       color: 'white', 
      //       backgroundColor: '#f1356d',
      //       borderRadius: '8px' 
      //     }}>New Blog</Link>
      //   </div>
      // </nav>
    );
  }
   
  export default Navbar;