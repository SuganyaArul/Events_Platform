import UserContext from "../Contexts/UserContext";
import { useContext, useEffect } from "react";
import DatePicker from "react-datepicker";
import React,{ useState } from "react";
import "react-datepicker/dist/react-datepicker.css";
import { postNewEvents } from "../Utils/api";
import { Navigate } from "react-router-dom";

export default function EventCreation(){
    const {loggedInUser} =useContext(UserContext);
    const [startDate, setStartDate] = useState();
    const [endDate, setEndDate] = useState();
    const [startTime, setStartTime] = useState();
    const [endTime, setEndTime] = useState();
    const [newEvent, setNewEvent] = useState([]);
    const [status, setStatus] = useState(false);
    const [isPosting, setIsPosting] = useState(false)
    const [userCalled, setUserCalled]=useState(false)
    function handleSubmit(e) {
      e.preventDefault();
      const options = { 
        weekday: 'short',    
        day: 'numeric',      
        month: 'short',      
        year: 'numeric'      
      };
      
      const formattedStartDate = startDate.toLocaleDateString('en-GB', options);  // 'en-GB' gives the desired order
      let fDate='';
      if(endDate!==null){
        const formattedEndDate = endDate.toLocaleDateString('en-GB', options);  // 'en-GB' gives the desired order 
         fDate = formattedStartDate+' ' + document.getElementById('startTime').value+'-'+formattedEndDate+' '+document.getElementById('endTime').value;
      }
      else{
       fDate = formattedStartDate+' ' + document.getElementById('startTime').value+'-'+formattedStartDate+' '+document.getElementById('endTime').value;
      }
      console.log(fDate);
      
      
        const event={}
        event.title=document.getElementById('title').value;
        event.date=fDate;
        event.address=document.getElementById('address').value;
        event.event_location_map=document.getElementById('map').value;
        event.ticket_info=document.getElementById('ticket').value;
        event.created_by=loggedInUser.user.email;
        event.image=document.getElementById('image').value;
        event.description=document.getElementById('description').value;
        console.log('newEvent',event);
        setNewEvent(event)
        setUserCalled(true)
    }
    useEffect(()=>{
         if(userCalled){
          setIsPosting(true)
      postNewEvents(newEvent).then((body)=>{
          setIsPosting(false)
          setStatus(true);
          setUserCalled(false)
      }).catch((error)=>{
            setIsPosting(false)
            setUserCalled(false)
          console.log('error',error);
      })
    }
  },[newEvent])
    const handleChange = (range) => {
        const [startDate, endDate] = range;
        setStartDate(startDate);
        setEndDate(endDate);
      };
   if(isPosting) return (<p>Posting the new Events... Please wait</p>)   
   if(status) return (<div><p>New Event Created Successfully</p><Navigate to='/' replace={true}/></div>)
    return(
        <div>
            <h1>Create an New Event</h1>
            <form onSubmit={handleSubmit} className="event_create">
            <div className="mb-1 flex flex-col gap-6">
            <label className="title">What's the name of your Event ?</label>
            <input className='inp' id='title' type="text" placeholder="Event Title"/>
             <label className="title">Description</label>
            <input className='inp' type="text" id="description"/> 
            <label className="title">When does your event start and end?</label>
            <div className='ec_date'>
                <div>
            <label>Start and End Date</label>
            <DatePicker
            id="date"
            selected={startDate}
            onChange={(handleChange)}
            startDate={startDate}
            endDate={endDate}
            selectsRange
            ariaLabelledBy="date"
            title='date'
          />
          </div>
          <div>
          <label>Start time</label>
           <DatePicker showTimeSelect showTimeSelectOnly minTime={new Date(0, 0, 0, 24, 0)}
        maxTime={new Date(0, 0, 0, 23,30)} id='startTime' onChange={(newValue) => setStartTime(newValue)} selected={startTime} dateFormat='h:mm aa'/>
        </div>
        <div>
           <label>End time</label>
           <DatePicker showTimeSelect showTimeSelectOnly minTime={new Date(0, 0, 0, 24, 0)}
        maxTime={new Date(0, 0, 0, 23,30)} id='endTime' onChange={(newValue) => setEndTime(newValue)} selected={endTime} dateFormat='h:mm aa'/>
        </div>
           </div>
            <label className="title">Where it is Located</label>
            <input className='inp' type="text" id='address'/>
            <label className="title">Location Map</label>
            <input className='inp' type="text" id='map'/>
            <label className="title">How much do you want to charge for tickets</label>
            £<input className='inp' type="text" defaultValue='0.00' id='ticket'/>
            <label className="title">Image of your event</label>
            <input className='inp' type="text" id='image'/>
            <label className="title">What's the capacity of your event</label>
            <input className='inp' type="number" min='0' defaultValue={0} id='capacity'/>
            <button>Submit</button>
            </div>
        </form>
    </div>
    )
}