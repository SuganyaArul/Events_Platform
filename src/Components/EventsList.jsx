import { useState } from "react";
import Event from "./Event";
import Pagination from "./Pagination";
export default function EventsList({events}){
   
    //pagination
    const postsPerPage = 3;
    const [currentPage, setCurrentPage]=useState(1)
    const indexOfLastEvent=currentPage * postsPerPage;
    const indexOfFirstEvent=indexOfLastEvent - postsPerPage;
    let currentEvents;
    
    if(events!==null && events.length!==0){
     currentEvents=events.events.slice(indexOfFirstEvent,indexOfLastEvent)
    }
    const handlePagination = (pageNumber) => {
        setCurrentPage (pageNumber);
    };
    return(
        <>
        <ol>
        {events!==null && events.length!==0 && events.events.length!==0 && events.events.length!==undefined?(
            currentEvents.map((event)=>{
              return  <Event key={event.event_id} event={event}/>
            })
        ):<p>No Events to show now.</p>}
        </ol>
        {events!==null && events.length!==0 ?
        <Pagination length={events.events.length}
        currentPage={currentPage}
        postsPerPage={postsPerPage}
        handlePagination={handlePagination}
        />:null}
        </>
    )

}