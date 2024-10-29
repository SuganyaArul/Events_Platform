import { useState,useEffect, useContext } from "react";
import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';
import { postUserDetails } from "../Utils/api";
import UserContext from "../Contexts/UserContext";
import { useNavigate } from "react-router-dom";
import { Hourglass } from "react-loader-spinner";

export  default function SignUP({status, setStatus}){
    const [userDetail, setUserDetail] = useState({})
    const [error, setError] =useState(null)
    const [errorMessage,setErrorMessage]=useState(null)
    const [formStatus, setFormStatus] = useState()
    const [userCalled, setUserCalled]=useState(false)
    const {loggedInUser, setLoggedInUser} =useContext(UserContext)
    const [postDetails,setPostDetails]=useState(false)
    const navigate = useNavigate();
    const HandleSubmit = (e) =>{
        e.preventDefault();
        const user={
            email:e.target[2].value,
            username:e.target[0].value,
            fullname:e.target[1].value,
            password:e.target[3].value,
        }
       setUserDetail(user);
       setUserCalled(true)
    };
    useEffect(()=>{
        if(userCalled){
            setPostDetails(true)
        postUserDetails(userDetail).then((body)=>{
            setLoggedInUser(body)
            setFormStatus(true)
            setStatus(true)
            setError(false)
            setPostDetails(false)
        }).catch((error)=>{
            setFormStatus(false)
            setError(true)
            setErrorMessage(error.message)
            setStatus(false)
            setPostDetails(false)
        })
        }
    },[userDetail])
    if(postDetails){
        return (
            <div className="loading">
      <Hourglass
        visible={true}
        height="80"
        width="80"
        ariaLabel="hourglass-loading"
        wrapperClass=""
        colors={["#575757", "#949494"]}
      />
      <p>Posting data please wait...</p>
    </div>
        )
    }
    if(formStatus){return <div> 
        <h2>User Details Submitted Successfully!</h2>
        <div>
          <button
            onClick={() => {
              navigate(`/`);
            }}
          >
            Home
          </button>
        </div>
        </div>}
    if(error){return <div>{errorMessage}</div>}
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