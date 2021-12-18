import Navbar from "./Navbar";
import Home from "./Home";
import { Route, Routes,Router } from "react-router-dom";
import Create from "./Create";
import BlogDetails from "./ComponentTemplate/BlogDetails";
import NotFound from "./Notfound";
import NavBar from "./Bars/NavBar/NavBar";
import { Grid } from "@material-ui/core";
import Feed from "./Bars/Feed/Feed";
import SideBar from "./Bars/SideBar/SideBar";


function App() {
  return (
    <div className="App">
     
    <NavBar/>
     <Grid container>
        <Grid item sm={2}>
        <SideBar/>
        </Grid>
        <Grid item sm={10}>
        <Routes>
          <Route element={<Feed/>}>
            <Route exact path="/" element={<Home />} />
            <Route path="/Create" element={<Create />} />
            <Route path="/blog/:id" element={<BlogDetails />} />
            <Route path="*" element={<NotFound />} />
            </Route>
          </Routes>
          
        </Grid>
     </Grid>
     
      {/*}
   
          <Routes>
          <Route element={<Layout/>}>
            <Route exact path="/" element={<Home />} />
            <Route path="/Create" element={<Create />} />
            <Route path="/blog/:id" element={<BlogDetails />} />
            <Route path="*" element={<NotFound />} />
            </Route>
          </Routes>

    {*/}
    </div>
  );
}

export default App;
