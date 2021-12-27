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
} from "@material-ui/core";
import { useToast } from "@chakra-ui/react";
import { purple } from "@material-ui/core/colors";
import { useEffect, useState } from "react";
import React, { useRef } from "react";
import { Autocomplete, Skeleton } from "@material-ui/lab";
import { db } from "../init/firebaseinit";
import TextField from "@material-ui/core/TextField";
import SearchIcon from "@material-ui/icons/Search";
import {
  addDoc,
  collection,
  onSnapshot,
  query,
  where,
} from "firebase/firestore";
import { useNavigate } from "react-router-dom";
import TableContainer from "@material-ui/core/TableContainer";
import PopUp from "../component/PopUp";
import AddIcon from '@material-ui/icons/Add';
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
      padding: "40px",
    },
    marginTop: "20px",
    height: "80vh",
  },
  table: {
    marginTop: theme.spacing(3),
    "& thead th": {
      fontWeight: "600",
      color: theme.palette.text,
    },
    "& tbody td": {
      fontWeight: "400",
    },
    "& tbody tr:hover": {
      backgroundColor: theme.palette.primary.light,
      cursor: "pointer",
    },
  },
  main: {
    [theme.breakpoints.down("sm")]: {
      padding: "50px 5px",
    },
  },
  newButton: {
  position: 'absolute',
  right: '10px'
},  btn: {
  width: "70%",
  
}
}));

const Dashbord = () => {
  const navigate = useNavigate();
  const classes = userStyle();
  const toast = useToast();
  const [EngineData, setEngineData] = useState([]);
  const [Loading, setLoading] = useState(false);

  //pageNation and sorting
  const pages = [ 5, 10, 25];
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(pages[page]);
  const [order, setOrder] = useState("asc");
  const [orderBy, setOrderBy] = useState("Brand");
  const [searchFilter, setSearchFilter] = useState({fn:items=>{return items;}});
  const [openPopup,setOpenPopUp] = useState(false)
  const tableHeader = [
    { id: "Brand", Header: "Brand1" },
    { id: "id", Header: "Brand2" },
    { id: "Code", Header: "Brand3" },
  ];

  const handlePageChange = (event, newPage) => {
    setPage(newPage);
  };
  const handleChangePerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  function descendingComparator(a, b, orderBy) {
    if (b[orderBy] < a[orderBy]) {
      return -1;
    }
    if (b[orderBy] > a[orderBy]) {
      return 1;
    }
    return 0;
  }
  function getComparator(order, orderBy) {
    return order === "desc"
      ? (a, b) => descendingComparator(a, b, orderBy)
      : (a, b) => -descendingComparator(a, b, orderBy);
  }

  function stableSort(array, comparator) {
    const stabilizedThis = array.map((el, index) => [el, index]);
    stabilizedThis.sort((a, b) => {
      const order = comparator(a[0], b[0]);
      if (order !== 0) return order;
      return a[1] - b[1];
    });
    return stabilizedThis.map((el) => el[0]);
  }

  const handleSearch = e => {
    let target = e.target.value.toLowerCase();
    setSearchFilter({
        fn: items => {
            if (target== "")
                return items;
            else
                return items.filter(x => x.Brand.toLowerCase().includes(target))
        }
    })
}


  const recordsAfterPagingAndSorting = () => {
    return stableSort(
      searchFilter.fn(EngineData),
      getComparator(order, orderBy)
    ).slice(page * rowsPerPage, (page + 1) * rowsPerPage);
  };

  const handleSortRequest = (cellId) => {
    const isAsc = orderBy === cellId && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(cellId);
  };
  function getData() {
    const ref = collection(db, "Engine");
    setLoading(true);
    onSnapshot(ref, (snapshot) => {
      let post = [];
      snapshot.docs.map((doc) => {
        post.push({
          id: doc.id,
          ...doc.data(),
        });
      });
      setEngineData(post);
      setLoading(false);
    });
  }


  useEffect(() => {
    getData();
  }, []);





  return (
    <div className={classes.roots} id="review">
      <Container component="main" maxWidth="lg" className={classes.main}>
        <CssBaseline />
        <div className={classes.paper}>
          <Typography component="h1" variant="h5">
            DashBord
          </Typography>
          <Paper className={classes.paper}>
            <Toolbar  >
              <TextField
                size="small"
                className={classes.btn}
                color="secondary"
                label="Search field"
                variant="outlined"
                onChange={handleSearch}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <SearchIcon />
                    </InputAdornment>
                  ),
                }}
              />
                
              <Button
              variant="outlined"
              color="secondary"
              startIcon={<AddIcon/>}
              className={classes.newButton}
              onClick={()=>setOpenPopUp(true)}
              >
              Add Item
              </Button>
            </Toolbar>
            <TableContainer>
              <Table className={classes.table}>
                <TableHead>
                  <TableRow>
                    {tableHeader.map((value) => {
                      return (
                        <TableCell
                          key={value.id}
                          sortDirection={orderBy === value.id ? order : false}
                        >
                          <TableSortLabel
                            active={orderBy === value.id}
                            direction={orderBy === value.id ? order : "asc"}
                            onClick={() => handleSortRequest(value.id)}
                          >
                            {value.Header}
                          </TableSortLabel>
                        </TableCell>
                      );
                    })}
                  </TableRow>
                </TableHead>
                <TableBody>
                  {recordsAfterPagingAndSorting().map((item) => {
                    return (
                      <TableRow key={item.id}>
                        <TableCell> {item.Brand}</TableCell>
                        <TableCell> {item.id}</TableCell>
                        <TableCell> {item.Code}</TableCell>
                      </TableRow>
                    );
                  })}
                  {Loading &&
                    [1, 2, 3, 4].map((item) => {
                      return (
                        <TableRow key={item}>
                          <TableCell>
                            {" "}
                            <Skeleton animation="wave" />
                          </TableCell>
                          <TableCell>
                            {" "}
                            <Skeleton animation="wave" />
                          </TableCell>
                          <TableCell>
                            {" "}
                            <Skeleton animation="wave" />
                          </TableCell>
                        </TableRow>
                      );
                    })}
                </TableBody>
              </Table>
            </TableContainer>
            <TablePagination
              component="div"
              page={page}
              rowsPerPageOptions={pages}
              rowsPerPage={rowsPerPage}
              count={EngineData.length}
              onPageChange={handlePageChange}
              onRowsPerPageChange={handleChangePerPage}
            />
          </Paper>
          <PopUp
          openPopup={openPopup}
          setOpenPopUp={setOpenPopUp}
          >

          </PopUp>
        </div>
      </Container>
    </div>
  );
};

export default Dashbord;
