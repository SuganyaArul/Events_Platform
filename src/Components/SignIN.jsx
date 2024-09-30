import { useEffect , useState, useContext} from "react";
import {getUserDetails} from "../Utils/api";
import UserContext from "../Contexts/UserContext";

export default function SignIN({status, setStatus, handleAuthClick}){
    const [error, setError] =useState(false)
    const [email, setEmail]=useState('')
    const [password, setPassword]=useState('')
    const {loggedInUser, setLoggedInUser} =useContext(UserContext)
    const [pointer, setPointer]=useState('signin')
    function handleSubmit(e){
        e.preventDefault();
        setEmail(e.target[0].value)
        setPassword(e.target[1].value)
        setPointer('pointer');
    }
    
    useEffect(()=>{
        getUserDetails(email,password).then((body)=>{
            setLoggedInUser(body)
            setStatus(true)
            setPointer('signin')
            setError(false)
        }).catch((error)=>{
            setError(true)
            setStatus(false)
            setPointer('signin')
        })
    },[email, password])
    if(status) return <h1>Hi {loggedInUser.user.fullname}, welcome back</h1>
    return <section>
        <h2>Sign In</h2>
        <form onSubmit={handleSubmit} className={pointer}>
        <div className="mb-1 flex flex-col gap-6">
        {error? <p className="error">Oops, the e-mail address and/or password do not match.</p>:null}
        <label className="title">Your Email</label>
        
        <input className='inp' type="email" placeholder="type your email"  required/>
        
        <label className="title">Password</label>
       
        <input className='inp' type="password" placeholder="type your password"   required="enter password"/>
        </div>
        <button className="button">Submit</button>
        </form>
    </section>

    
}