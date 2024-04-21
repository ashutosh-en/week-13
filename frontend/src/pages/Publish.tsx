import { ChangeEvent, useState } from "react"
import { Appbar } from "../components/Appbar"
import axios from "axios";
import { BACKEND_URL } from "../config";
import { useNavigate } from "react-router-dom";

export const Publish =()=>{
    const [title,setTitle]=useState("");
    const [content,setConent]=useState("")
    const navigate=useNavigate();
    return <div>
        <Appbar/>
        <div className="flex justify-center w-full pt-8">
            <div className="max-w-screen-lg w-full">
            <input onChange={(e)=>{
                setTitle(e.target.value)
            }} type="text" className="my-2 w-full bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" placeholder="Title"></input>
            <TextEditor onChange={(e)=>{
                setConent(e.target.value)
            }}/>
            <button onClick={async()=>{
                const response =await axios.post(`${BACKEND_URL}/api/v1/blog/`, {
                    title,
                    content
                },{
                    headers:{
                        Authorization:localStorage.getItem("token")
                    }
                });
                navigate(`/blog/${response.data.id}`)
            }
            }type="submit" className=" mt-4 inline-flex items-center px-5 py-2.5 text-sm font-medium text-center text-white bg-blue-700 rounded-lg focus:ring-4 focus:ring-blue-200 dark:focus:ring-blue-900 hover:bg-blue-800">
                 Publish post
            </button>
            </div>
        </div>  
    </div>
}

function TextEditor({onChange}:{onChange:(e:ChangeEvent<HTMLTextAreaElement>)=>void}){
    return <div>
                <div>  
                    <textarea onChange={onChange}id="message" rows={8} className="focus:outline-none block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg " placeholder="Write your article..."></textarea>
                </div>
        </div>
}
