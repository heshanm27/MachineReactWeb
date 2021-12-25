
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
import Layout from "../component/Layout";
import ProtectedRoute from "./ProtectedRoute";

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
  },
});

function App() {
  return (
    <ThemeProvider theme={theme}>
      <ChakraProvider>
        <Header />
        <Routes>
          <Route exact path="/" element={<Home />} />
      
          <Route path="/login" element={<Login />} />
          <Route path="/forgotpassword" element={<ForgotPassword />} />
         <Route element={<ProtectedRoute/>}>
          <Route  element={<Layout />}>
            <Route path="/warrenty" element={<Warrenty />} />
            <Route path="/pdf" element={<Pdf />} />
          </Route>
          </Route>
          <Route path="*" element={<NotFound />} />
        </Routes>
      </ChakraProvider>
    </ThemeProvider>
  );
}

export default App;
