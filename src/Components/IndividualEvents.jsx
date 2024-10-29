import { useParams,Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { getEventsByID } from "../Utils/api";
import LoadingScreen from "./LoadingScreen";
export default function IndividualEvents({events, setEvents}){
    const {event_id}=useParams()
    const[isLoading,setIsLoading]=useState(true)
    useEffect(()=>{
        
        getEventsByID(event_id).then((body)=>{
            setEvents(body)
            setIsLoading(false)
        }).catch((error)=>{
            console.log(error); 
            setIsLoading(false)   
        })
    },[])
    const handleReserve=(e)=>{
        localStorage.setItem('events', JSON.stringify(events));
       window.open('https://events-platform-pi.vercel.app/register','_blank','noreferrer')
    }
    if(isLoading) return <LoadingScreen/>
    return (
        <div className="individual_event">
            <img src={events.image} alt="Images for this event"/>
            <div className="in-span">
            <span className="span1">
            <p className="title">{events.title}</p>
            <label className="title">Date and Time</label>
            <p>{events.date}</p>
            <label className="title">Address</label>
            <p>{events.address}</p>
            <label className="title">Description</label>
            <p>{events.description} 💙</p>
            <label className="title">Organized By</label>
            <p>{events.created_by}</p>
            </span>
            <span className="span2">
            <label className="title">Tickets</label>   
            {events.ticket_info==='free'?<p>Free</p>:<p>{events.ticket_info} </p>}
            
                <button onClick={()=>{handleReserve()}}>Reserve a spot</button>
            </span>
            </div>
        </div>
    )
}