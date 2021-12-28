import React, { useState } from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import FormHelperText from '@material-ui/core/FormHelperText';
import Container from '@material-ui/core/Container';
import { FormControl, IconButton, Input, InputAdornment, InputLabel, OutlinedInput, Paper } from '@material-ui/core';
import { useAuth } from '../../Context/AuthContext';
import { useNavigate } from 'react-router';
import { useToast } from '@chakra-ui/react';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import clsx from "clsx";
function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {'Copyright © '}
      <Link color="inherit" href="#">
      RosCard.com
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent:'center'
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
    alignContent:'center'
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },paper:{
      marginTop:'50px',
      padding:'20px'
  }, margin: {
   
  },
  textField: {
    width: '100%',
  },
}));

export default function Login() {
    const toast=useToast()
    const  navigate = useNavigate();
    const [email,setEmail] =useState('')
    const [password,setPassword] =useState('')
    const [emailError,setEmailError] =useState(false)
    const [passwordError,setPasswordError] =useState(false)
    const [showPassword,setShowPassword]=useState(false)
  const classes = useStyles();
  const {login} = useAuth()

  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleShowPassword = ()=>{

    setShowPassword(!showPassword)
  }
  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };
    const handleLogin = async (e)=>{

        e.preventDefault()
        // your login logic here

        if(!email || !password){
            toast({
                description:"Credentials not valid",
                status:'error',
                duration:5000,
                isClosable:true
              })
          return
        }

        login(email,password)
            .then(res=>navigate('/dashbord'))
            .catch((e)=>{
                toast({
                    description: e.message,
                    status: 'error',
                    duration: 9000,
                    isClosable: true,
                  })
            }).finally(()=>setIsSubmitting(false))


          }

    


  return (
    <Container component="main" maxWidth="sm">
    <Paper className={classes.paper}>
      <CssBaseline />
      <div className={classes.paper}>
      <center>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign in
        </Typography></center>
        <form className={classes.form} noValidate onSubmit={(e)=>handleLogin(e)}>
          <TextField
            variant="outlined"
            margin="normal"
            error={emailError}
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
            value={email}
            onChange={(e)=>setEmail(e.target.value)}
            autoFocus
            helperText={emailError ?? "Please Enter Email"}
            color='secondary'
          />
               <FormControl className={clsx(classes.margin, classes.textField)} color='secondary' variant="outlined">
          <InputLabel htmlFor="password">Password</InputLabel>
          <OutlinedInput
            margin="normal"
            required
            name="password"
            type={showPassword ? 'text' : 'password'}
            id="password"
            value={password}
            onChange={(e)=>setPassword(e.target.value)}
            autoComplete="current-password"
            color='secondary'
            error={passwordError}
            helperTex="Incorrect entry."
            endAdornment={
              <InputAdornment position="end">
                <IconButton
                  aria-label="toggle password visibility"
                  onClick={handleShowPassword}
                  onMouseDown={handleMouseDownPassword}
                >
                  {showPassword ? <Visibility /> : <VisibilityOff />}
                </IconButton>
              </InputAdornment>

            }
            labelWidth={70}
          /> 
          {passwordError && <FormHelperText error={true}>Enter Password</FormHelperText>}
       </FormControl>
          <FormControlLabel
            control={<Checkbox value="remember" color="secondary" />}
            label="Remember me"
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="secondary"
            className={classes.submit}
          >
            Sign In
          </Button>
          <Grid container>
            <Grid item xs>
              <Link href="forgotpassword" variant="body2" color='secondary'>
                Forgot password?
              </Link>
            </Grid>
         
          </Grid>
        </form>
      </div>
      <Box mt={8}>
        <Copyright />
      </Box>
      </Paper>
    </Container>
  );
}