import { useEffect,useState } from "react";


const useFetch = (url)=>{
  const [data, setData] = useState(null)
  const [isPending,setPendeing] = useState(true);
  const [error,setError] = useState(null)
    //fetch data from json api
    useEffect(()=>{
        const abortCont=new AbortController();
        setTimeout(()=>{
            fetch(url,{signal:abortCont.signal})
            .then(res=>{
                if(!res.ok){
                    throw Error('Could not Featch Data')
                }
                return res.json();
            })
            .then(data=>{

        
            setData(data);
            setPendeing(false)
            setError(null)

            }).catch(e =>{
                if(e.name === 'AbortError'){
                    console.log("Feacth Aborted"+e);
                }else{
               setError(e.message)
               setPendeing(false)
                }
            })

        },1);
        return () => abortCont.abort();
    },[url]);

return {data,isPending,error}

}

export default useFetch;