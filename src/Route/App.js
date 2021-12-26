
import Home from "../Pages/Home/Home";
import { Route, Routes } from "react-router-dom";

import NotFound from "../Notfound";
import { ThemeProvider, createTheme } from "@material-ui/core";
import Header from "../component/Header";
import { Palette } from "@material-ui/icons";
import { purple } from "@material-ui/core/colors";
import Warrenty from "../Pages/Warrenty";
import Pdf from "../component/PdfDocument";
import Login from "../Pages/Login/Login";
import { ChakraProvider } from "@chakra-ui/react";
import ForgotPassword from "../Pages/Login/Forgotpassword";
import ProtectedRoute from "./ProtectedRoute";
import DashBordDarwer from "../component/Drawer/DrawerDashbord";
import Additem from "../Pages/Additem";
import Dashbord from "../Pages/Dashbord";
import { useStyles } from "../component/Drawer/DrawerStyle";

const theme = createTheme({
  palette: {
    primary: {
      main: "#76ff03",
    },
    secondary: purple,
    type: "light",
  },
  typography: {
    fontFamily: "Quicksand",
    fontWeightLight: 400,
    fontWeightRegular: 500,
    fontWeightMedium: 600,
    fontWeightBold: 700,
  },root:{

  }
});

function App() {
  const classes = useStyles();
  return (
  
    <ThemeProvider theme={theme}>
      <ChakraProvider>
     
      
        <Routes>
          <Route exact path="/" element={<Home />} />
         
          <Route path="/login" element={<Login />} />
          <Route path="/forgotpassword" element={<ForgotPassword />} />
        
          <Route  element={<DashBordDarwer />}>
          <Route path="/dashbord" element={<Dashbord />} />
            <Route path="/warrenty" element={<Warrenty />} />
            <Route path="/additem" element={<Additem />} />
            <Route path="/pdf" element={<Pdf />} />
          </Route>
          
          <Route path="*" element={<NotFound />} />
        </Routes>
      
      </ChakraProvider>
    </ThemeProvider>
    
  );
}

export default App;