import {
  Button as btn,
  Container,
  makeStyles,
  Typography,
  Paper,
  CssBaseline,
  Table,
  TableBody,
  TableRow,
  TableCell,
  TableHead,
  TablePagination,
  Grid,
  TableSortLabel,
  Toolbar,
  InputAdornment,
  Button,
  IconButton,
} from "@material-ui/core";
import { useToast } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import React, { useRef } from "react";
import { Skeleton } from "@material-ui/lab";
import { db } from "../init/firebaseinit";
import TextField from "@material-ui/core/TextField";
import SearchIcon from "@material-ui/icons/Search";
import DeleteIcon from "@material-ui/icons/Delete";
import { collection, onSnapshot, doc, deleteDoc } from "firebase/firestore";
import { useNavigate } from "react-router-dom";
import TableContainer from "@material-ui/core/TableContainer";
import PopUp from "../component/PopUp";
import AddIcon from "@material-ui/icons/Add";
import EditIcon from "@material-ui/icons/Edit";

import Notification from "../component/Notification/Notification";
import ConfirmDialog from "../component/ConfirmDialog/ConfirmDialog";
import Pdftemplate from "../component/Pdftemplate";
import PageviewIcon from "@material-ui/icons/Pageview";
import { useReactToPrint } from "react-to-print";
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

  paper: {
    [theme.breakpoints.up("sm")]: {
      padding: "20px",
    },
    marginTop: "20px",
    height: "auto",
  },
}));

const Graph = () => {
  const classes = userStyle();
  useEffect(() => {}, []);

  return (
    <div className={classes.roots} id="review">
      <Grid container>
        <Grid item xs={12} sm={6}>
          {" "}
          <Container component="main" maxWidth="sm" className={classes.main}>
            <div className={classes.paper}>
              <Typography component="h1" variant="h5">
                Item
              </Typography>
              <Paper className={classes.paper}></Paper>
            </div>
          </Container>
        </Grid>
        <Grid item xs={12} sm={6}>
          <Container component="main" maxWidth="lg" className={classes.main}>
            <div className={classes.paper}>
              <Typography component="h1" variant="h5" color="textPrimary">
                DashBord
              </Typography>
              <Paper className={classes.paper}></Paper>
            </div>
          </Container>
        </Grid>
        <Grid item xs={12} sm={12}>
          <Container component="main" maxWidth="lg" className={classes.main}>
            <div className={classes.paper}>
              <Typography component="h1" variant="h5">
                DashBord
              </Typography>
              <Paper className={classes.paper}></Paper>
            </div>
          </Container>
        </Grid>
      </Grid>
    </div>
  );
};

export default Graph;
