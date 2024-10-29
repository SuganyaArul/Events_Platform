import {Link, useNavigate} from 'react-router-dom';
import { useContext, useState } from "react"
import UserContext from "../Contexts/UserContext"
import '../dropdown.css'
import { useEffect } from 'react';
import { getEvents } from '../Utils/api';
import { Hourglass } from "react-loader-spinner";

export default function Header({status, setStatus, events, setEvents}){
    const {loggedInUser, setLoggedInUser} =useContext(UserContext)
    const [searchQuery,setSearchQuery]=useState([])
    const [error, setError] =useState(false)
    const [eventStatus, setEventStatus] = useState(false)
    const [isLoading,setIsLoading] = useState()
    const navigate =useNavigate();
    function handleSearch(e){
      e.preventDefault();
        const search={
          topics:document.getElementById('topic').value,
        location:document.getElementById('location').value
        }
        setSearchQuery(search)
    }
    useEffect(()=>{
      
      if(searchQuery.topics!==undefined){
        setIsLoading(true)
      getEvents(searchQuery).then((body)=>{
          setEvents(body)
          setEventStatus(true)
          setError(false)
          setIsLoading(false)
          navigate('/events', { state: { events } })
      }).catch((error)=>{
          setEventStatus(false)
          setEvents(null)
          setError(true)
          setIsLoading(false)
      })}
  },[searchQuery])
    
    function myFunction() {
        document.getElementById("myDropdown").classList.toggle("show");
      }
      window.onclick = function(e) {
        
        if (!e.target.matches('.dropbtn')) {
        const myDropdown = document.getElementById("myDropdown");
        if(myDropdown!=null){
          if (myDropdown.classList.contains('show')) {
            myDropdown.classList.remove('show');
          }
        }
        }
      }
return (
          <>
           <section className='header'>
           <input type="text" id="topic" placeholder="Search Events"></input>
           <input type="text" id='location' placeholder="Location"></input>
           <button onClick={handleSearch} className='button'>Search</button>
           <Link to='/'>Home</Link>
           <Link to='/newEvents'>Create Events</Link>
           {status?
            (
               <div class="dropdown">
                <button onClick={myFunction} class="dropbtn" >{loggedInUser.user.email}</button>
                <div id="myDropdown" class="dropdown-content">
                  <Link to='/events'>Browse Events</Link>
                <Link to='/userEvents'>Manage My Events</Link>
                <a href="#" onClick={(event)=>{setLoggedInUser({})
              setStatus(false)}}>Log out</a>
                
                 </div>
                </div>
            )
           :
            (<>
           <Link to='/SignIN'>Log In</Link>
           <Link to="/SignUP">Sign Up</Link>
           </>
            )}
            
       </section>
       {isLoading?<div className="loading">
      <Hourglass
        visible={true}
        height="80"
        width="80"
        ariaLabel="hourglass-loading"
        wrapperClass=""
        colors={["#575757", "#949494"]}
      />
      <p>Events Loading, please wait...</p>
    </div>:null} 
       </>
      
      )
}

