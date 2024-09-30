import { useParams,Link } from "react-router-dom";
import { useEffect } from "react";
import { getEventsByID } from "../Utils/api";
export default function IndividualEvents({events, setEvents}){
    const {event_id}=useParams()
    useEffect(()=>{
        
        getEventsByID(event_id).then((body)=>{
            setEvents(body)
           
        }).catch((error)=>{
            console.log(error);    
        })
    },[])
    const handleReserve=(e)=>{
        localStorage.setItem('events', JSON.stringify(events));
       window.open('http://localhost:3000/register','_blank','noreferrer')
    }
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