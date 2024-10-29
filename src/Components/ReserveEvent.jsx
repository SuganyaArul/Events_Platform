import emailjs from '@emailjs/browser';
import { postAttendeeDetails } from '../Utils/api';
import { useState } from 'react';
import { google, outlook, office365, yahoo, ics } from "calendar-link";
export default function ReserveEvent({addEventToGoogleCalendar}){
    
  const eventsFromStorage = JSON.parse(localStorage.getItem('events'));
    const [result,setResult]=useState(false)
    const actualDate=eventsFromStorage.date;
    const date=actualDate.split('-')
    const startDate=convertToCalendarFormat(date[0]);

const event = {
    title: eventsFromStorage.title,
    description: eventsFromStorage.description,
    start: startDate,
    duration: [3, "hour"],
  };
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
    const googleURL=  google(event); // https://calendar.google.com/calendar/render...
    const outlookURL= outlook(event); // https://outlook.live.com/owa/...
    const officeURL=  office365(event); // https://outlook.office.com/owa/...
    const yahooURL=   yahoo(event); // https://calendar.yahoo.com/?v=60&title=...
    const icsURL=   ics(event);

    const sendEmail =(e)=>{
        e.preventDefault();
        emailjs.sendForm('service_ovuz17t','template_xifdvwk',e.target,'NX_g3-od0DvZqSgk2');
        const email=document.getElementById('email').value;
        const provider =email.split('@')[1].split('.')[0];
        const attendee={
            firstname:document.getElementById('firstname').value,
            lastname:document.getElementById('lastname').value,
            email:document.getElementById('email').value,
            event_id:eventsFromStorage.event_id
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
            addEventToGoogleCalendar(eventsFromStorage);
        }
        else if(provider === 'outlook'){
            window.open(outlookURL, '_blank')
        }
        
        // e.target.reset();
    }
    return (
        <form onSubmit={sendEmail} className='signin'>
            <div className="mb-1 flex flex-col gap-6">
            <h1>Contact Information</h1>
            <label className="title">First Name</label>
            <input className='inp' type='text' name='user_name' id='firstname'/>
            <label className="title">Last Name</label>
            <input className='inp' type='text' id='lastname'/>
            <label className="title">Email</label>
            <input className='inp' type='email' name='user_email' id='email'/>
            <button className="button">Reserve</button>
            </div>
        </form>
    )
}