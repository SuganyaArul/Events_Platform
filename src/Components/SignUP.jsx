import { useState,useEffect } from "react";
import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';
import { postUserDetails } from "../Utils/api";

export  default function SignUP({status, setStatus}){
    const [userDetail, setUserDetail] = useState({})
    const [error, setError] =useState(null)
    const [formStatus, setFormStatus] = useState()
    const HandleSubmit = (e) =>{
        e.preventDefault();
        const user={
            email:e.target[2].value,
            username:e.target[0].value,
            fullname:e.target[1].value,
            password:e.target[3].value,
        }
       setUserDetail(user);
    };
    useEffect(()=>{
        postUserDetails(userDetail).then((body)=>{
            setFormStatus(true)
            setStatus(true)
            setError(false)
        }).catch((error)=>{
            setFormStatus(false)
            setError(true)
            setStatus(false)
        })
    },[userDetail])
    if(formStatus){return <div> <p>Submitted Successfully </p></div>}
    return (
        <div className='register'>
            <h1>New User Account</h1>
            {/* {status ? 
            <div className='popup'>
                <div className='popup-inner'>
                    <h2>Your Form Submitted Successfully</h2>
                    <button onClick={()=>{setStatus(false);document.getElementById("newAccount").reset();}}>OK</button>
                </div>
            </div>
    :null} */}
            <form onSubmit={HandleSubmit} action="" id='newAccount' className="signin">
            <div className="mb-1 flex flex-col gap-6">
        
                <label className="title">User Name</label>
                <input className='inp' placeholder="username" name="userName" pattern="^[A-Za-z]{3,25}$" required/>
                <label className="title">Full Name</label>
                <input className='inp' placeholder="fullName" name="fullName" pattern='^[A-Za-z ]{3,25}$' required/>
                <label className="title">Email</label>
                <input className='inp' placeholder="email" name="email" type="email" required/>
                <label className="title">Password</label>
                <input className='inp' type="password" name='password' placeholder="password" required/>
                <label className="title">Confirm Password</label>
                <input className='inp' type="password" name='confirm' placeholder="confirm password" required/>
                <button className="button">Submit</button>
            </div>
            </form>
        </div>
    )

}