import { useParams,Link } from "react-router-dom";
import { useEffect, useState, useContext } from "react";
import { getEventsByID } from "../Utils/api";
import LoadingScreen from "./LoadingScreen";
import UserContext from "../Contexts/UserContext"
import emailjs from '@emailjs/browser';
import { postAttendeeDetails } from '../Utils/api';
import { google, outlook, office365, yahoo, ics } from "calendar-link";
export default function IndividualEvents({events, setEvents, addEventToGoogleCalendar}){
    const {event_id}=useParams()
    const[isLoading,setIsLoading]=useState(true)
    const {loggedInUser, setLoggedInUser} =useContext(UserContext)
    useEffect(()=>{
        
        getEventsByID(event_id).then((body)=>{
            setEvents(body)
            setIsLoading(false)
        }).catch((error)=>{
            console.log(error); 
            setIsLoading(false)   
        })
    },[])
    const [result,setResult]=useState(false)
    
  function convertToCalendarFormat(dateString) {
    // Parse the custom date string into a Date object
    const date = new Date(dateString);

    // Helper function to pad single digits with leading zero
    const pad = (num) => num < 10 ? '0' + num : num;

    // Get timezone offset in minutes and convert it to hours and minutes
    const offset = -date.getTimezoneOffset();
    const sign = offset >= 0 ? '+' : '-';
    const hoursOffset = pad(Math.floor(Math.abs(offset) / 60));
    const minutesOffset = pad(Math.abs(offset) % 60);

    // Format the date to the desired format
    return `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())}T${pad(date.getHours())}:${pad(date.getMinutes())}:${pad(date.getSeconds())}${sign}${hoursOffset}:${minutesOffset}`;
}
   

    const sendEmail =(e)=>{
        
    const actualDate=events.date;
    const date=actualDate.split('-')
    const startDate=convertToCalendarFormat(date[0]);

    const event = {
    title: events.title,
    description: events.description,
    start: startDate,
    duration: [3, "hour"],
  };
  const googleURL=  google(event); // https://calendar.google.com/calendar/render...
  const outlookURL= outlook(event); // https://outlook.live.com/owa/...
  const officeURL=  office365(event); // https://outlook.office.com/owa/...
  const yahooURL=   yahoo(event); // https://calendar.yahoo.com/?v=60&title=...
  const icsURL=   ics(event);
        const emailForm={
            user_name:loggedInUser.user.fullname,
            user_email:loggedInUser.user.email
        }
        emailjs.send('service_ovuz17t','template_xifdvwk',emailForm,'NX_g3-od0DvZqSgk2').then((response)=>{
            console.log('success');
            
        }).catch((error)=>{
           alert('Please enter valid email',error);
            
        })
        const email=loggedInUser.user.email;
        const provider =email.split('@')[1].split('.')[0];
        const attendee={
            firstname:loggedInUser.user.fullname,
            lastname:loggedInUser.user.fullname,
            email:loggedInUser.user.email,
            event_id:events.event_id
        }
        postAttendeeDetails(attendee).then((body)=>{
            setResult(true)
            alert('Thank you, Reserved a spot!!')
        })
        .catch((error)=>{
            setResult(false)
        })
        if(provider === 'yahoo'){
            
            window.open(yahooURL, '_blank');
        }
        else if(provider === 'gmail'){
            window.open(googleURL, '_blank')
        }
        else if(provider === 'outlook'){
            window.open(outlookURL, '_blank')
        }
        
        // e.target.reset();
    }
    const handleReserve=(e)=>{
        if(loggedInUser.user === undefined){
        localStorage.setItem('events', JSON.stringify(events));
        window.open('https://events-platform-pi.vercel.app/register','_blank','noreferrer')
        }
        else{
            sendEmail()
        }
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