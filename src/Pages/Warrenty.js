import {
  Button,
  Container,
  Grid,
  makeStyles,
  Typography,
  Paper,
  TextField,
  FormControlLabel,
  CssBaseline,
  Avatar,
  TextareaAutosize,
  Divider,
} from "@material-ui/core";
import {
  Input,
  Stack,
  useToast,
  Text,
  IconButton,
  InputGroup,
  InputLeftAddon,
  HStack,
} from "@chakra-ui/react";
import PhotoCamera from "@material-ui/icons/PhotoCamera";
import { purple } from "@material-ui/core/colors";
import { getByDisplayValue } from "@testing-library/react";
import { useEffect, useState } from "react";
import FrontCard from "../component/Card";
import SendIcon from "@material-ui/icons/Send";
import React, { useRef } from "react";
import emailjs from "emailjs-com";
import LoopIcon from "@material-ui/icons/Loop";
import { Autocomplete } from "@material-ui/lab";
import { db } from "../init/firebaseinit";
import { collection, onSnapshot, query, where } from "firebase/firestore";
import { useNavigate } from "react-router-dom";
import DateFnsUtils from "@date-io/date-fns";
import {
  KeyboardDatePicker,
  MuiPickersUtilsProvider,
} from "@material-ui/pickers";
import placeholderImage from '../img/placeholder.jpg'

const userStyle = makeStyles((theme) => ({
  roots: {
    minHeight: "60vh",
    backgroundRepeat: "no-repeat",
    backgroundSize: "cover",
    justifyContent: "center",
    alignContent: "center",
    display: "flex",
    textAlign: "center",
  },
  container: {
    margin: "40px 0",
  },
  typo: {
    margin: "20px 0",
    color: purple[2],
  },
  paper: {
    padding: "40px",
    marginTop: "20px",
  },
  submit: {
    marginTop: "20px",
  },
  grid: {
    marginTop: "20px",
  },
  inputs: {
    display: "none",
  },img:{
      display:'flex',
     alignContent:'center',
      textAlign:'center'
  }
}));

const Warrenty = () => {
  const navigate = useNavigate();
  const [spacing, setSpacing] = useState(5);
  const form = useRef();
  const classes = userStyle();
  const [options, setoptions] = useState([]);
  const [customer, setCustomer] = useState([]);

  const [lists, setLists] = useState([{}]);
  const [value, setValue] = useState("");
  const hello = "hello";
  const [CodeGroup, setCodeGroup] = useState([]);
  const [BrandGroup, setBrandGroup] = useState([]);

  //input values
  const [adddress, setAddress] = useState("");
  const [contactNo, setContactNo] = useState("");
  const [user, setUser] = useState("");
  const [Brand, setBrand] = useState("");
  const [Code, setCode] = useState("");
  const [curruntdates, setCurruntDate] = useState(new Date());
  const [date, setdate] = useState(new Date());
  const [expireDate, setExpireDate] = useState("");
  const [technician, setTecnician] = useState("");
  const [technicianContactNo, settechnicianContactNo] = useState("");
  const [RegistarationNo, setRegistarationNo] = useState("");
  const [InjectorMake, setInjectorMake] = useState("");
  const [InjectorNo, setInjectorNo] = useState("");
  const [InjectorCode, setInjectorCode] = useState("");
  const [profileImg,setprofileImg]=useState("https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png")
  //sendparamters
  const [params, setParams] = useState({});
  //getCustomer data from firebase
  function getCustomerData() {
    //getdata in real time
    const collectionRef = collection(db, "Warrenty");
    onSnapshot(collectionRef, (snapshot) => {
      let post = [];
      snapshot.docs.map((doc) => {
        post.push({
          key: doc.id,
          ...doc.data(),
        });
      });
      setCustomer(post);
    });
  }

  //getEngineBrand data from firebase
  function getEngineBrand() {
    const collectionRef = collection(db, "Engine");
    //getdata in real time
    onSnapshot(collectionRef, (snapshot) => {
      let post = [];
      snapshot.docs.map((doc) => {
        post.push({
          key: doc.id,
          ...doc.data(),
        });
      });
      setBrandGroup(post);
      setCodeGroup(post);
    });
  }

  //check user is exits or not
  function checkCustomer(name) {
    //firestore query
    const collectionRef = collection(db, "Warrenty");
    const q = query(collectionRef, where("CustomerName", "==", name));

    //get data for that query
    onSnapshot(q, (snapshot) => {
      let post = [];
      snapshot.docs.map((doc) => {
        post.push({
          key: doc.id,
          ...doc.data(),
        });
      });
      console.log(post);
      if (post.length == 0) {
        setUser(name);
        setAddress("");
        setContactNo("");
        return;
      } else {
        post.map((user) => {
          setUser(user.CustomerName);
          setAddress(user.Address);
          setContactNo(user.ContactNo);
        });
      }
    });
  }
  //check Brand is exits or not
  function checkEngine(name) {
    console.log(name);
    //firestore query
    const collectionRef = collection(db, "Engine");
    const q = query(collectionRef, where("Brand", "==", name));

    //get data for that query
    onSnapshot(q, (snapshot) => {
      let post = [];
      snapshot.docs.map((doc) => {
        post.push({
          key: doc.id,
          ...doc.data(),
        });
      });
      console.log(post);
      if (post.length == 0) {
        setBrand(name);

        return;
      } else {
        setCodeGroup(post);
        post.map((user) => {
          setBrand(user.Brand);

          console.log("codeGroupd-:" + user);
        });
      }
    });
  }
  //check BrandCode is exits or not
  function checkEngineCode(name) {
    //firestore query
    const collectionRef = collection(db, "Engine");
    const q = query(collectionRef, where("Code", "==", name));

    //get data for that query
    onSnapshot(q, (snapshot) => {
      let post = [];
      snapshot.docs.map((doc) => {
        post.push({
          key: doc.id,
          ...doc.data(),
        });
      });
      console.log(post);
      if (post.length == 0) {
        setCode(name);

        return;
      } else {
        post.map((user) => {
          setCode(name);
          setBrand(user.Brand);
          checkEngine(user.Brand);
        });
      }
    });
  }

  //date
  const handleDateChange = (dates) => {
    setCurruntDate(new Date(dates));

    setExpireDate(new Date(dates.setMonth(dates.getMonth() + 3)));
  };

  const handleDateExpireChange = (date) => {
    setExpireDate(date);
  };
 
  //hadnle image
  const ImagePreview = (e)=>{
      
    const image = document.getElementById('handleImage')
      const reader = new FileReader();
      reader.onload = ()=>{
          if(reader.readyState === 2){
            setprofileImg( reader.result)
          }
      }

      reader.readAsDataURL(e.target.files[0])
        
  }
  useEffect(() => {
    getEngineBrand();
    getCustomerData();
    setExpireDate(new Date(date.setMonth(date.getMonth() + 3)));
    console.log(customer);
  }, []);

  return (
    <div className={classes.roots} id="review">
      <Container component="main" maxWidth="md">
        <CssBaseline />
        <div className={classes.paper}>
          <Typography component="h1" variant="h5">
            Warrenty
          </Typography>
          <Paper className={classes.paper}>
            <form
              ref={form}
              className={classes.form}
              noValidate
              autoComplete="none"
            >
              <Grid container spacing={4}>
                <Grid
                  item
                  xs={12}
                  sm={6}
                  className={classes.grid}
                  direction="column"
                >
                  {" "}
                  {/*Customer Name*/}
                  <Autocomplete
                    inputValue={user}
                    onInputChange={(event, newInputValue) => {
                      checkCustomer(newInputValue);
                    }}
                    id="controllable"
                    options={customer}
                    getOptionLabel={(option) => option.CustomerName}
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        label="Customer Name"
                        variant="outlined"
                      />
                    )}
                  />
                  {/*Address*/}
                  <TextField
                    variant="outlined"
                    margin="normal"
                    required
                    fullWidth
                    id="address"
                    label="Address"
                    name="address"
                    autoFocus
                    onChange={(e) => setAddress(e.target.value)}
                    value={adddress}
                  />
                  {/*ContactNo*/}
                  <TextField
                    variant="outlined"
                    margin="normal"
                    required
                    fullWidth
                    id="ContactNo"
                    label="Contact No"
                    name="ContactNo"
                    value={contactNo}
                    onChange={(e) => setContactNo(e.target.value)}
                    autoFocus
                  />
                  {/*Engine Brand*/}
                  <Autocomplete
                    inputValue={Brand}
                    onInputChange={(event, newInputValue) => {
                      checkEngine(newInputValue);
                    }}
                    id="controllable"
                    options={BrandGroup}
                    getOptionLabel={(option) => option.Brand}
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        label="Vehical Brand"
                        variant="outlined"
                      />
                    )}
                  />
                  {/*Registration No*/}
                  <TextField
                    variant="outlined"
                    margin="normal"
                    required
                    fullWidth
                    id="RegistrationNo"
                    label="Registration No"
                    name="RegistrationNo"
                    value={RegistarationNo}
                    onChange={(e) => setRegistarationNo(e.target.value)}
                    autoFocus
                  />
                </Grid>
                <MuiPickersUtilsProvider utils={DateFnsUtils}>
                  <Grid item xs={12} sm={6} direction="column">
                    {/*Date of Repair*/}
                    <KeyboardDatePicker
                      disableToolbar
                      variant="inline"
                      format="MM/dd/yyyy"
                      margin="normal"
                      id="date-picker-inline"
                      label="Date of Repair"
                      value={curruntdates}
                      onChange={handleDateChange}
                      fullWidth
                      KeyboardButtonProps={{
                        "aria-label": "change date",
                      }}
                    />

                    {/*Warranty till */}
                    <KeyboardDatePicker
                      disableToolbar
                      variant="inline"
                      format="MM/dd/yyyy"
                      margin="normal"
                      id="date-picker-inline"
                      label="Warranty till"
                      value={expireDate}
                      fullWidth
                      onChange={handleDateExpireChange}
                      KeyboardButtonProps={{
                        "aria-label": "change date",
                      }}
                    />
                    {/*Technician */}

                    <TextField
                      variant="outlined"
                      margin="normal"
                      required
                      fullWidth
                      id="Technician"
                      label="Technician"
                      name="Technician"
                      value={technician}
                      onChange={(e) => setTecnician(e.target.value)}
                      autoFocus
                    />

                    {/*Technician Contact No */}

                    <TextField
                      variant="outlined"
                      margin="normal"
                      required
                      fullWidth
                      id="Technician Contact No"
                      label="Technician ContactNo"
                      name="Technician Contact No"
                      value={technicianContactNo}
                      onChange={(e) => settechnicianContactNo(e.target.value)}
                      autoFocus
                    />
                  </Grid>
                </MuiPickersUtilsProvider>

                <Grid
                  item
                  xs={12}
                  sm={8}
                  className={classes.grid}
                  style={{ border: "2px solid", borderColor: "#fafafa" }}
                >
                  {/*Engine Code */}
                  <Autocomplete
                    inputValue={Code}
                    onInputChange={(event, newInputValue) => {
                      checkEngineCode(newInputValue);
                    }}
                    id="controllable"
                    options={CodeGroup}
                    getOptionLabel={(option) => option.Code}
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        label="Engine Code"
                        variant="outlined"
                      />
                    )}
                  />

                  {/*InjectorMake */}
                  <TextField
                    variant="outlined"
                    margin="normal"
                    required
                    fullWidth
                    id="InjectorMake"
                    label="Injector Make"
                    name="InjectorMake"
                    value={InjectorMake}
                    onChange={(e) => setInjectorMake(e.target.value)}
                    autoFocus
                  />

                  {/*InjectorNo */}

                  <TextField
                    variant="outlined"
                    margin="normal"
                    required
                    fullWidth
                    id="InjectorNo"
                    label="Injector No"
                    name="InjectorNo"
                    value={InjectorNo}
                    onChange={(e) => setInjectorNo(e.target.value)}
                    autoFocus
                  />
                  {/*InjectorCode*/}

                  <TextField
                    variant="outlined"
                    margin="normal"
                    required
                    fullWidth
                    id="InjectorCode"
                    label="Injector Code"
                    name="InjectorCode"
                    value={InjectorCode}
                    onChange={(e) => setInjectorCode(e.target.value)}
                    autoFocus
                  />
                </Grid>

                <Grid item xs={12} sm={12} className={classes.grid}>
                  <TextField
                    variant="outlined"
                    margin="normal"
                    required
                    fullWidth
                    id="InjectorCode"
                    label="Injector Code"
                    name="InjectorCode"
                    value={InjectorCode}
                    multiline="true"
                    minRows="10"
                    onChange={(e) => setInjectorCode(e.target.value)}
                    autoFocus
                  />
                </Grid>

                <Grid item xs={12} sm={4} className={classes.grid}>
                <HStack>

                <img src={profileImg} alt="placeholder image" width='200px' height='200px' id="placeholderImage" accept="image/*"/>
                <input
                    accept="image/*"
                    className={classes.inputs}
                    id="contained-button-file"
                    multiple
                    type="file"
                    onChange={e=>ImagePreview(e)}
                  />
                  <label htmlFor="contained-button-file">
                    <Button
                      variant="contained"
                      color="primary"
                      component="span"
                    >
                      Upload
                    </Button>
                  </label>
                </HStack>

                
                </Grid>
              
              </Grid>
            </form>

            <Button
              variant="contained"
              color="primary"
              onClick={() => {
                navigate("/pdf", { state: { Brand: Brand, code: Code } });
              }}
            >
              Genrate Pdf
            </Button>
          </Paper>
        </div>
      </Container>
    </div>
  );
};

export default Warrenty;
