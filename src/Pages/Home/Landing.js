import { useState } from "react";
import {
  Card,
  CardContent,
  Container,
  CssBaseline,
  makeStyles,
  Typography,
  CardActions,
  Button,
  Box,
  Paper,
  Divider,
} from "@material-ui/core";
import FrontCard from "../../component/Card";
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';
import { Link as Scroll } from 'react-scroll'
import bgvideo from "../../img/Video/bgv.mp4" 
const userStyle = makeStyles((theme) => ({
  root: {
    minHeight: "100vh",
    backgroundRepeat: "no-repeat",
    backgroundSize: "cover",
    background:"none",
    justifyContent: "center",
    alignContent: "center",
    display: "flex",
    textAlign:'center'
  },
  content: {
    marginTop: "10%",
  },
  second: {
    minHeight: "100vh",
    backgroundColor: "purple",
  },
  box: {
    margin: "auto 0",
    marginleft: "200px",
    minHeight: "250px",
    maxWidth: "800px",
    minWidth: "250px",
    textAlign:'center'
  },paper:{
    padding:'40px',
    margin:'40px'
  },button:{
      marginTop:'40px'
  },typo:{
    fontSize:'1.4rem',

    [theme.breakpoints.up('md')]: {
      fontSize: '2.4rem',
    },
    [theme.breakpoints.down('sm')]: {
      marginTop:'30px'
    },typop:{
      color:'#ffffff'
    }
  }
}));

const Landing = () => {
  const classes = userStyle();
  return (
    <div className={classes.root}>
      <Container className={classes.box}>
        <Box>
        <video autoPlay loop muted style={{position:'absolute',width:'100%',objectFit:'cover',zIndex:'-1'
        ,left:'50%',
        top:'50vh',
        height:'100vh',
        transform:'translate(-50%,-50%)'
        
        }}>
          <source src={bgvideo} type="video/mp4"/>
        </video>
        <Typography variant="h1" align="center" className={classes.typo} color="primary">
        Rosacrd
        </Typography>
       
              <Typography
                variant="body2"
                component="p"
                align="center"
               color="primary"
                className={classes.typop}
              >
                Lorem Ipsum is simply dummy text of the printing and typesetting
                industry. Lorem Ipsum has been the industry's standard dummy
                text ever since the 1500s, when an unknown printer took a galley
                of type and scrambled it to make a type specimen book. It has
                survived not only five centuries, but also the leap into
                electronic typesetting, remaining essentially unchanged. It was
                popularised in the 1960s with the release of Letraset sheets
                containing Lorem Ipsum passages, and more recently with desktop
                publishing software like Aldus PageMaker including versions of
                Lorem Ipsum.
              </Typography>
             <Scroll to="review" smooth={true}  duration={500} delay={250} isDynamic={true} >
              <Button
                variant="outlined"
                color="primary"
                className={classes.button}
                endIcon={<KeyboardArrowDownIcon/> }
            
              >
                Learn More
              </Button>
              </Scroll>

        </Box>
        
      </Container>
  
    </div>
  );
};
//using props
export default Landing;
