import { useState } from "react";
import { useNavigate } from "react-router-dom";
const Create = () => {

    const [title,setTitle] = useState('')
    const [body,setBody] = useState('')
    const [author,setAuthor] = useState('Select')
    const [pending,setPending] = useState(false)
    const navigate = useNavigate()

    const hadaleSubmit = (e)=>{
        e.preventDefault();
        const blog ={title,body,author};
        setPending(true)
        fetch('https://dojoblogapp.herokuapp.com/create', {
            method: 'POST',
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(blog)
          }).then((e) => {
             
            setPending(false);
            console.log(e);
            navigate('/');
          })
    }

    return (
    <div className="Create">
    <h2>Add New Blog</h2>
    <form onSubmit={hadaleSubmit}>
    <label>Blog Title</label>
    <input 
    type="text"
    required
    value={title}
    onChange={(e)=>setTitle(e.target.value)}    
    />
    <label>Blog Body</label>
    <textarea
    required
    value={body}
    onChange={e=>setBody(e.target.value)}
    
    ></textarea>
    <label>Author</label>
    <select
    value={author}
    onChange={e=>setAuthor(e.target.value)}
    >
        <option>Nimal</option>
        <option>Josh</option>
    </select>
    {!pending &&<button >Submit</button>}
    {pending && <button >Adding</button>}
    </form>
    <p>{title}</p>
    <p>{body}</p>
    <p>{author}</p>
    </div> );
}
 
export default Create;