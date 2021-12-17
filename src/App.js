import Navbar from "./Navbar";
import Home from "./Home";
import { Route, Routes,Router } from "react-router-dom";
import Create from "./Create";
import BlogDetails from "./ComponentTemplate/BlogDetails";
import NotFound from "./Notfound";
import Layout from "./ComponentTemplate/Layout";
function App() {
  return (
    <div className="App">
      <Navbar />

      <div className="content">
     
      
   
          <Routes>
          <Route element={<Layout/>}>
            <Route exact path="/" element={<Home />} />
            <Route path="/Create" element={<Create />} />
            <Route path="/blog/:id" element={<BlogDetails />} />
            <Route path="*" element={<NotFound />} />
            </Route>
          </Routes>

      
      </div>
    </div>
  );
}

export default App;