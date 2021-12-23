import { Box, Container, CssBaseline, Grid, Paper, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';
import React,{useRef} from 'react';
import { useLocation } from 'react-router';
import { useReactToPrint } from "react-to-print";
import Pdftemplate from './Pdftemplate';

const useStyle = makeStyles((theme)=>({
    roots: {
        minHeight: "70vh",
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
        justifyContent: "center",
        alignContent: "center",
        display: "flex",
        
      },
      container: {
        margin: "10px auto",
        padding:'10px',
        backgroundColor:'white',
        color:'black'
      },card:{
        
          margin:'0 auto',
         
          
      }
    


}))

const Pdf = () => {  
 const location =useLocation()
 const obj=location.state
 console.log(location.state)
    const classes =useStyle()
  const componentRef = useRef();
  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
  });

  return (
    <div className={classes.roots} id="review">
    <Container component="main" maxWidth="md">
      <CssBaseline />
   
    <Paper className={classes.container}  ref={componentRef} >
   
    
  

    
        
         


   <Pdftemplate props={obj} />


   

        
     
       
       
        </Paper>
        <button onClick={handlePrint} className="print__button">  Print </button> 
        </Container>
    </div>
 
     
  )
}
export default Pdf