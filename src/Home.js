import BlogList from "./ComponentTemplate/BlogList";
import useFetch from "./fetch/useFetch";
import { useState } from "react";


const Home = () => {
  const {
    data: blogs,
    isPending,
    error,
  } = useFetch("https://dojoblogapp.herokuapp.com/getBlogs");

 


  return (
   
    <div className="home">
   
      {error && <div>{error}</div>}
      {isPending && (
        <div>
          <h2>Loading..</h2>
        </div>
      )}
      {blogs && <BlogList blogs={blogs} title="All BLogs" />}
      {blogs && (
        <BlogList
          blogs={blogs.filter((blog) => blog.author === "mario")}
          title="Mario BLogs"
        />
      )}
      <div className="table">
     
      </div>
    </div>

  );
};
//using props
export default Home;
