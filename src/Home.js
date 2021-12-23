import BlogList from "./ComponentTemplate/BlogList";
import useFetch from "./fetch/useFetch";
import { useState } from "react";
import {
  Card,
  CardContent,
  Container,
  CssBaseline,
  makeStyles,
  Typography,CardActions,Button,Box, Divider

} from "@material-ui/core";
import img from "./img/bg.jpg";

import Header from "./component/Header";
import LearMore from "./Pages/LearnMore";
import Landing from "./Pages/Landing";
import FooterPage from "./Pages/Footer";
import Brand from "./Pages/Brand";
import ContactUs from "./Pages/Contactus";
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
