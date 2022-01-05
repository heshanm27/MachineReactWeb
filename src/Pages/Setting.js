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
  Badge,
  Avatar,
  IconButton,
  Box,
  AccordionSummary,
  Accordion,
  AccordionDetails,
} from "@material-ui/core";
import { useToast, HStack } from "@chakra-ui/react";
import PhotoCamera from "@material-ui/icons/PhotoCamera";
import { purple } from "@material-ui/core/colors";
import { getByDisplayValue } from "@testing-library/react";
import { useEffect, useState } from "react";
import React, { useRef } from "react";
import { Autocomplete } from "@material-ui/lab";
import { db, storage } from "../init/firebaseinit";
import {
  addDoc,
  collection,
  onSnapshot,
  query,
  where,
} from "firebase/firestore";
import { useNavigate } from "react-router-dom";
import { ref, getDownloadURL, uploadBytesResumable } from "firebase/storage";
import EditIcon from "@material-ui/icons/Edit";
import { useAuth } from "../Context/AuthContext";
import ClearIcon from "@material-ui/icons/Clear";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import { Form } from "../component/Form/useFrom";
const userStyle = makeStyles((theme) => ({
  roots: {
    minHeight: "100vh",
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
    [theme.breakpoints.up("sm")]: {
      padding: "40px",
    },
    marginTop: "50px",
  },
  large: {
    width: theme.spacing(8),
    height: theme.spacing(8),
    marginTop: "-50px",
    outline: ` solid 2px ${theme.palette.text.primary}`,
  },
  iconbtn: {
    width: 22,
    height: 22,
    border: `2px solid ${theme.palette.background.paper}`,
    background: theme.palette.background.paper,

    "&:hover": {
      background: theme.palette.background.paper,
    },
  },
  profileimg: {
    marginTop: "-20px",
  },
  Grid: {
    marginTop: "50px",
  },
}));

const Setting = () => {
  const navigate = useNavigate();

  const classes = userStyle();
  //const { currentUser } = useAuth();
  const currentUser = JSON.parse(localStorage.getItem("currentUser"));
  const [photoUrl, setPhotoUrl] = useState("");
  const [userNameDiable, setuserNameDisable] = useState(true);
  const [expanded, setExpanded] = useState(false);
  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };
  useEffect(() => {
    console.log("curruntuser", currentUser);
  }, [currentUser]);

  return (
    <div className={classes.roots} id="review">
      <Container component="main" maxWidth="lg">
        <CssBaseline />
        <div className={classes.paper}>
          <Typography
            component="h1"
            variant="h5"
            color="textPrimary"
            style={{ marginBottom: "50px" }}
          >
            Profile Settings
          </Typography>
          <Paper className={classes.paper}>
            <center>
              <div className={classes.profileimg}>
                <Badge
                  overlap="circular"
                  anchorOrigin={{
                    vertical: "bottom",
                    horizontal: "right",
                  }}
                  badgeContent={
                    <IconButton className={classes.iconbtn}>
                      {" "}
                      <PhotoCamera />
                    </IconButton>
                  }
                >
                  <Avatar
                    alt="Travis Howard"
                    src={currentUser.photoURL}
                    className={classes.large}
                  />
                </Badge>
              </div>
            </center>
            <Grid container spacing={2} className={classes.Grid}>
              <Grid item xs={12} sm={12} md={6}>
                <Box style={{ display: "flex" }}>
                  <TextField
                    disabled={userNameDiable}
                    id="outlined-basic"
                    label="User Name"
                    variant="outlined"
                    defaultValue={currentUser.displayName}
                    fullWidth
                  />
                  <IconButton
                    onClick={() => setuserNameDisable(!userNameDiable)}
                  >
                    {userNameDiable ? <EditIcon /> : <ClearIcon />}
                  </IconButton>
                </Box>
              </Grid>
              <Grid item xs={12} sm={12} md={6}>
                <Box style={{ display: "flex" }}>
                  <TextField
                    disabled={userNameDiable}
                    id="outlined-basic"
                    label="Email"
                    variant="outlined"
                    defaultValue={currentUser.email}
                    fullWidth
                  />
                  <IconButton
                    onClick={() => setuserNameDisable(!userNameDiable)}
                  >
                    {userNameDiable ? <EditIcon /> : <ClearIcon />}
                  </IconButton>
                </Box>
              </Grid>

              <Grid item xs={12}>
                <Accordion>
                  <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel1a-content"
                    id="panel1a-header"
                  >
                    <Typography className={classes.heading}>
                      Update PassWord
                    </Typography>
                  </AccordionSummary>
                  <AccordionDetails>
                    <form autocomplete="off" style={{ width: "100%" }}>
                      <Grid container spacing={2}>
                        <Grid item xs={12} sm={12} md={6}>
                          <TextField
                            id="outlined-basic"
                            label="Email"
                            variant="outlined"
                            defaultValue={currentUser.email}
                            fullWidth
                          />
                        </Grid>
                        <Grid item xs={12} sm={12} md={6}>
                          <TextField
                            id="outlined-basic"
                            label="Email"
                            variant="outlined"
                            defaultValue={currentUser.email}
                            fullWidth
                          />
                        </Grid>
                        <Grid item xs={12} sm={12} md={12}>
                          <Button variant="contained" color="primary">
                            Update
                          </Button>
                        </Grid>
                      </Grid>
                    </form>
                  </AccordionDetails>
                </Accordion>
              </Grid>
            </Grid>
          </Paper>
        </div>
      </Container>
    </div>
  );
};

export default Setting;
