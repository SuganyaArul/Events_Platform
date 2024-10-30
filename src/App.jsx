import './App.css';
import Header from './Components/Header';
import SignIN from './Components/SignIN';
import SignUP from './Components/SignUP';
import EventCreation from './Components/EventCreation';
import UserContext from "./Contexts/UserContext";
import { useState,useEffect } from 'react';
import {  Route,Routes,Navigate, useLocation } from "react-router-dom";
import EventsList from './Components/EventsList';
import IndividualEvents from './Components/IndividualEvents';
import Home from './Components/Home';
import UserEvents from './Components/UserEvents';
import ReserveEvent from './Components/ReserveEvent';
import { gapi } from 'gapi-script';

function App() {
  const [loggedInUser,setLoggedInUser] = useState({})
  const [status,setStatus]=useState(false)
  const [events, setEvents] =useState([])
  
  const CLIENT_ID = process.env.REACT_APP_CLIENT_ID;
  const API_KEY = process.env.REACT_APP_API_KEY;
  const SCOPES = 'https://www.googleapis.com/auth/calendar.events';
  
  let location = useLocation();
 
     const addEventToGoogleCalendar = (events) => {
          gapi.load('client:auth2', ()=>{
            gapi.client.init({
              apiKey: API_KEY,
              clientId: CLIENT_ID,
              discoveryDocs: ['https://www.googleapis.com/discovery/v1/apis/calendar/v3/rest'],
              scope: SCOPES,
            });

            gapi.client.load('calendar','v3',()=>{console.log('bang')})

            gapi.auth2.getAuthInstance().signIn().then(()=>{
              console.log('got permission');
              const actualDate=events.date;
              const date=actualDate.split('-')
              const startDate=convertToCalendarFormat(date[0]);
              const endDate=convertToCalendarFormat(date[1])
              
              const event = {
                'summary': events.title,
                'location': events.address,
                'description': events.description,
                'start': {
                  'dateTime': startDate, // Change with your event time
                  'timeZone': 'Greenwich Mean Time',
                },
                'end': {
                  'dateTime': endDate, // Change with your event time
                  'timeZone': 'Greenwich Mean Time',
                },
              };
              
              const request =gapi.client.calendar.events.insert({
                'calendarId': 'primary',
                'resource': event,
              })
              console.log('request',request);
              
              request.execute(event=>{
                window.open(event.htmlLink)
              })
            }).catch((error)=>{
              console.log('gapi script error',error);
              
            })

          });

    }
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
  return (
    <div className="App">
      <UserContext.Provider value={{loggedInUser,setLoggedInUser}}>
        {location.pathname!=='/register'?
      <Header status={status} setStatus={setStatus} events={events} setEvents={setEvents}/>:null}
      <Routes>
          <Route path='/' element={<Home/>}></Route>
          <Route path='/SignIN' element={<SignIN status={status} setStatus={setStatus}/>}></Route>
          <Route path='/SignUP' element={<SignUP status={status} setStatus={setStatus}/>}></Route>
          <Route path='/newEvents' element={loggedInUser.user?<EventCreation/>:<Navigate replace to={'/SignIN'}/>}></Route>
          <Route path='/events' element={<EventsList events={events}/>}></Route>
          <Route path='/events/:event_id' element={<IndividualEvents events={events} setEvents={setEvents} addEventToGoogleCalendar={addEventToGoogleCalendar}/>}></Route>
          <Route path='/userEvents' element={<UserEvents events={events} setEvents={setEvents}/>}></Route>
          <Route path='/register' element={<ReserveEvent addEventToGoogleCalendar={addEventToGoogleCalendar} />}></Route>
      </Routes>
      </UserContext.Provider>
    </div>
  );
}

export default App;
