import {  useParams } from "react-router";
import useFetch from "../fetch/useFetch";
import { useNavigate } from "react-router-dom";
import Axios from "axios";

const BlogDetails = () => {

    const{id} = useParams()
    const history = useNavigate()
    const {data:blog,isPending,error} = useFetch(`https://dojoblogapp.herokuapp.com/getBlog/${id}`)
    
    
    const handleDelete = ()=>{
        
        /*{fetch(`http://localhost:3001/delete/${blog._id}`,{
            method:'DELETE'  
        }).then(()=>{
            history('/')
        })}*/
        Axios.delete(`https://dojoblogapp.herokuapp.com/delete/${blog._id}`).then((response)=>{
            history('/')
        })

    }

  
    return ( 
        <div className="BlogDetails">
        {error && <div>{error}</div>}
        {isPending && <div><h2>Loading..</h2></div>}
        {blog &&( <article>
                   <h2>{ blog.title }</h2>
                    <p>Written by { blog.author }</p>
                    <p>id { blog._id }</p>
                    <div>{ blog.body }</div>
                    <div className="bottomDiv">
                    <button onClick={handleDelete}>Delete</button>
                </div>
                    </article>  
        )}
        </div>



     );
}
 
export default BlogDetails;