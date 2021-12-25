
import { useState } from "react";
import {
  Card,
  CardContent,
  Container,
  CssBaseline,
  makeStyles,
  Typography,CardActions,Button,Box, Divider

} from "@material-ui/core";
import img from "../../img/bg.jpg";


import LearMore from "./LearnMore";
import Landing from "./Landing";
import FooterPage from "./Footer";
import Brand from "./Brand";
import ContactUs from "./Contactus";
import Header from "../../component/Header";
const userStyle = makeStyles((theme) => ({
  root: {
    minHeight: "100vh",
    background:`url(${img})`,
    backgroundRepeat: "no-repeat",
    backgroundSize: "cover",
  },
}));

const Home = () => {
  const classes = userStyle();
  return (
  
    <>
    
     <Header/>
      <Landing/>
      <Divider variant="middle"/>
      <LearMore/>
      <Divider variant="middle"/>
      <Brand/>
      <Divider variant="middle"/>
      <ContactUs/>
      <FooterPage/>
    </>
 
  );
};
//using props
export default Home;
