import {
  Button,
  Container,
  Grid,
  makeStyles,
  Typography,
  Paper,
  TextField,
  CssBaseline,
  CircularProgress,
} from "@material-ui/core";
import {
  useToast,
  HStack,
} from "@chakra-ui/react";
import PhotoCamera from "@material-ui/icons/PhotoCamera";
import { purple } from "@material-ui/core/colors";
import { getByDisplayValue } from "@testing-library/react";
import { useEffect, useState } from "react";
import React, { useRef } from "react";
import { Autocomplete } from "@material-ui/lab";
import { db, storage } from "../init/firebaseinit";
import { addDoc, collection, onSnapshot, query, where } from "firebase/firestore";
import { useNavigate } from "react-router-dom";
import DateFnsUtils from "@date-io/date-fns";
import {
  KeyboardDatePicker,
  MuiPickersUtilsProvider,
} from "@material-ui/pickers";
import placeholderImage from '../img/placeholder.jpg'
import { ref,getDownloadURL,uploadBytesResumable } from "firebase/storage";
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
    padding: "10px",
    [theme.breakpoints.up('sm')]:{
      padding: "40px",
     },
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
  },buttons:{
      marginRight:'10px'
  },main:{
    [theme.breakpoints.down('sm')]:{
        padding:'50px 10px'
    }}
}));

const Warrenty = () => {
  const navigate = useNavigate();
 
  const form = useRef();
  const classes = userStyle();
  const [options, setoptions] = useState([]);
  const [customer, setCustomer] = useState([]);
  const toast=useToast()
  const [pdfloading, setpdfloading] = useState(false);
  const [loading, setLoading] = useState(false);

  const [CodeGroup, setCodeGroup] = useState([]);
  const [BrandGroup, setBrandGroup] = useState([]);

  //input values
  const [adddress, setAddress] = useState("");
  const [contactNo, setContactNo] = useState("");
  const [user, setUser] = useState("Heshan Madhuranga");
  const [Brand, setBrand] = useState("");
  const [Code, setCode] = useState("");
  const [curruntdates, setCurruntDate] = useState(formatDate(new Date()));
  const [date, setdate] = useState(new Date());
  const [expireDate, setExpireDate] = useState("");
  const [technician, setTecnician] = useState("");
  const [technicianContactNo, settechnicianContactNo] = useState("");
  const [RegistarationNo, setRegistarationNo] = useState("");
  const [InjectorMake, setInjectorMake] = useState("");
  const [InjectorNo, setInjectorNo] = useState("");
  const [InjectorCode, setInjectorCode] = useState("");
  const [profileImg,setprofileImg]=useState("https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png")
  const [images, setImages] = useState([]);
  const [newParts,setNewParts]=useState("")
  const [progress,setProgress]= useState(0)
  const [Url,setUrls] =useState("")
  //sendparamters
  const [params, setParams] = useState({});


  function getUnique(arr, comp) {

    // store the comparison  values in array
const unique =  arr.map(e => e[comp])

  // store the indexes of the unique objects
  .map((e, i, final) => final.indexOf(e) === i && i)

  // eliminate the false indexes & return unique objects
 .filter((e) => arr[e]).map(e => arr[e]);

return unique;
}
function formatDate(thedate) {
  return thedate.getFullYear()+'/'+(thedate.getMonth()+1)+'/'+thedate.getDate(); 
}

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
    const uinique = getUnique(post,"CustomerName")
      setCustomer(uinique);
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
      console.log(post)
      const unique = getUnique(post,'Brand')
      setBrandGroup(unique);
      setCodeGroup(post);
    });
  }

  //check user is exits or not
  function checkCustomer(name) {
    //firestore query
    console.log(name)
    setUser(name);
    const result = customer.filter(customer => customer.CustomerName === name);
   
    if(result.length === 0){
      setUser(name);
      console.log('filter')
      return
    }else{
      console.log('firebase')
    const collectionRef = collection(db, "Warrenty");
    const q = query(collectionRef, where("CustomerName", "==", result[0].CustomerName));
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
        post.map((user) => {
          setUser(user.CustomerName);
          setAddress(user.Address);
          setContactNo(user.ContactNo);
        });
    });
  }
    
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
    setImages([]);
    const image = document.getElementById('handleImage')
      const reader = new FileReader();
      reader.onload = ()=>{
          if(reader.readyState === 2){
            setprofileImg( reader.result)
          }
      }

      reader.readAsDataURL(e.target.files[0])

      
    for (let i = 0; i < e.target.files.length; i++) {
      setImages((prevState) => [...prevState, e.target.files[i]]);
    }
        
  }
  useEffect(() => {
    getEngineBrand();
    getCustomerData();
    setExpireDate(formatDate(new Date(date.setMonth(date.getMonth() + 3))));
    console.log(curruntdates)
  }, []);

  //hadnle submit

  const handleSubmit = (e)=>{
    e.preventDefault()
    setLoading(true)
    setUrls([])
    const colRef = collection(db, "Warrenty");
        const promises=[];
        images.map((image) => {
            const storageRef = ref(storage, `Productimages/${image.name}`);
            const uploadTask = uploadBytesResumable(storageRef, image);
            promises.push(uploadTask);
           
            uploadTask.on(
            "state_changed",
            (snapshot) => {
              const prog = Math.round(
                (snapshot.bytesTransferred / snapshot.totalBytes) * 100
              );
              setProgress(prog);
            },
            (e) =>  toast({
                description: e.message,
                status: 'error',
                duration: 9000,
                isClosable: true,
              }),
            () => {
              getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
                console.log("File available at", downloadURL);
                setUrls(downloadURL.toString())
                console.log(Url)
              });
            });
             
        })

          Promise.all(promises).then(()=>{

            addDoc(colRef,{
                CustomerName:user,
                DateOfRepair:curruntdates,
                WarrentyTill:expireDate,
                Address:adddress,
                ContactNo:contactNo,
                Technician:technician,
                VehicalBrand:Brand,
                TechnicianContactNo:technicianContactNo,
                RegistartionNo:RegistarationNo,
                EngineCode:Code,
                InjectorMake:InjectorMake,
                InjectorNo:InjectorNo,
                InjectorCode:InjectorCode,
                newPartsDetails:newParts,
                PartImage:Url
            }).then(()=>{
              setLoading(false)
              setpdfloading(true)
                toast({
                    description: "Product Successfully Added",
                    status: "success",
                    duration: 5000,
                    isClosable: true,
                  });
            }).catch((e)=>{
                toast({
                    description: "Error Occured When Sumbit ,Please Try Agian",
                    status: "error",
                    duration: 5000,
                    isClosable: true,
                  }); 
            })
          })

  }
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
              onSubmit={e=>handleSubmit(e)}
              autoComplete="none"
              
            >
              <Grid container spacing={4}>
                <Grid
                  item
                  xs={12}
                  sm={6}
                  className={classes.grid}
                 
                >
                
                  {/*Customer Name*/}
                  <Autocomplete
                
                    inputValue={user}
                    onInputChange ={(event, newInputValue) => {
                      checkCustomer(newInputValue);
                    }}
                    id="controllable"
                    freeSolo
                    options={customer}
                    getOptionLabel={(option) => option.CustomerName}
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        label="Customer Name"
                        variant="outlined"
                        required
                       
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
                
                  />
                </Grid>
                <MuiPickersUtilsProvider utils={DateFnsUtils}>
                  <Grid item xs={12} sm={6} >
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
                   
                  />
                </Grid>

                <Grid item xs={12} sm={12} className={classes.grid}>
                  <TextField
                    variant="outlined"
                    margin="normal"
                    required
                    fullWidth
                    id="NewPartsDetails"
                    label="New Parts Details"
                    name="New Parts Details"
                    value={newParts}
                    multiline
                    minRows="10"
                    onChange={(e) => setNewParts(e.target.value)}
                
                  />
                </Grid>

                <Grid item xs={12} sm={4} className={classes.grid}>
                <HStack>

                <img src={profileImg} alt="placeholder image" width='200px' height='200px' id="placeholderImage" accept="image/*"/>
                <CircularProgress variant="determinate" value={progress} />
                <input
                    accept="image/*"
                    className={classes.inputs}
                    id="contained-button-file"
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

              <Grid item xs={12} sm={12} className={classes.grid}>
             {loading && <CircularProgress color="secondary" /> }
              {! loading &&  <Button
              variant="contained"
              color="secondary"
              className={classes.buttons}
              type="submit"
            >
              Submit
            </Button> }

            { pdfloading &&   <Button
              variant="contained"
              color="#76ff03"
              onClick={() => {
                navigate("/pdf", { state: { Brand: Brand,
                  EngineCode: Code,
                 Address:adddress,
                 CustomerName:user,
                dateRepair:curruntdates,
                WarrentyTill:expireDate,
                Technician:technician,
                TechnicianContactNo:technicianContactNo,
                RegistarationNo:RegistarationNo,
                InjectorMake:InjectorMake,
                InjectorNo:InjectorNo,
                InjectorCode:InjectorCode,
                NewParts:newParts,
               Image:Url,
               contactNo:contactNo
                 } });
              }}
            >
              Genrate Pdf
            </Button>}
              </Grid>
            </form>

         
          </Paper>
        </div>
      </Container>
    </div>
  );
};

export default Warrenty;
