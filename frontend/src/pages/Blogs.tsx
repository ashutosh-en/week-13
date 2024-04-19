import { Appbar } from "../components/Appbar"
import { BlogCard } from "../components/BlogCard"
import { useBlog } from "../hooks"

export const Blogs=()=>{
    const {loading,blogs}=useBlog()
    if(loading){
        return<div>
            Loading...
        </div>
    }
    return <div>
    <Appbar/>
    <div className="flex justify-center">
    <div className="max-w-xl">
    {blogs.map(blog=><BlogCard
        authorName={blog.author.name}
        title={blog.title}
        content={blog.content}
        publicationdate={"18-April-2024"}
    />)}
    
    </div>
    </div>
</div>
}