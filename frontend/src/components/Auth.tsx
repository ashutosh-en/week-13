import { ChangeEvent, useState } from "react"
import axios from "axios"
import { Link, useNavigate } from "react-router-dom"
import { BACKEND_URL } from "../config"
interface signupType{
    name:string,
    email:string,
    password:string
}
export const Auth=({type}:{type:"signup"|"signin"})=>{
    const navigate= useNavigate();
    const [postInput,setPostInput]=useState<signupType>({
        name:"",
        email:"",
        password:""
    })
    async function sendRequest(){
        try{
           const response=await axios.post(`${BACKEND_URL}/api/v1/user/${type==="signup"? "signup":"signin"}`,postInput);
           localStorage.setItem("token",response.data.jwt);
           navigate('/blogs')
        }catch(e){
            //Alert 
        }
    }
    return <div className="h-svh flex justify-center flex-col ">
        <div className="flex justify-center">
            <div>
            <div className="px-10">
            <div className=" text-3xl font-extrabold ">
            {type==="signin"? "Login":"Creat an Account"} 
            </div>
            <div className="text-slate-400">
                {type==="signin"? "Don't have a account":"Already have an account?"}
                <Link className="pl-2 underline" to={type==="signin"? "/signup":"/signin"}>{type==="signin"?"Signup":"Login"}</Link>
            </div>
            {type==="signup"? <LabelledInput label="Name"placeholder="Enter your Full Name"onChange={(e)=>{
                setPostInput({
                    ...postInput,
                    name:e.target.value
                })
            }}/>:null}
            <LabelledInput label="Email"placeholder="Enter your email"onChange={(e)=>{
                 setPostInput({
                    ...postInput,
                    email:e.target.value
                })
            }}/>
            <LabelledInput label="Password" type={"password"} placeholder="Enter your password" onChange={(e)=>{
                 setPostInput({
                    ...postInput,
                    password:e.target.value
                })
            }}/>
            <button onClick={sendRequest}type="button" className="mt-8 w-full text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 
            dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700">{type==="signup"?"signup":"signin"}</button>
            </div>
        </div>
    </div>
 </div>
}
interface LabelledInputType{
label:string,
placeholder:string,
onChange:(e:ChangeEvent<HTMLInputElement>)=>void,
type?:string
}
function LabelledInput({label,placeholder,onChange,type}:LabelledInputType){
return <div>
<label className="block mb-2 text-sm font-medium text-black">{label}</label>
<input onChange={onChange} type={type||"text"} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 
focus:border-blue-500 block w-full p-2.5 " placeholder={placeholder} required />
</div>
}