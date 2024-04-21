import { useParams } from "react-router-dom"
import { Appbar } from "../components/Appbar"
import { useBlog } from "../hooks"
import { FullBlog } from "../components/FullBlog";


export const Blog=()=>{
    const {id}=useParams();
    const {loading,blog}=useBlog({
        id:id||""
    })
    if(loading){
        return<div>
            Loading...
        </div>
    }
    return <div>
        <Appbar/>
    <div className="flex justify-center">
        <FullBlog blog={blog}/>
    </div>
    </div>
}