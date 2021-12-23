import { Avatar, Container, Grid, makeStyles, Typography } from "@material-ui/core";
import React, { Component, useEffect } from "react";
import Slider from "react-slick";
import AvatrFetch from "../fetch/Avatar";
import getData from '../fetch/Avatar'




const Brand = () => {

    return (
        <div id="brand" style={{minHeight: "25vh",marginBottom:'50px',display:'flex',justifyContent:'center',alignItems:'center'}}>
        <Container style={{marginTop:'50px'}}>
        <Typography align="center"  style={{marginBottom:'50px'}} variant="h4" component='h5' >Trusted Brand</Typography>
        <Grid container spacing={3}>
         <AvatrFetch/>
         </Grid>
         </Container>
      </div>
    );
  }
  export default Brand;