import { useState } from "react";
import Event from "./Event";
import Pagination from "./Pagination";
export default function EventsList({events}){
   
    //pagination
    const postsPerPage = 1;
    const [currentPage, setCurrentPage]=useState(1)
    const indexOfLastEvent=currentPage * postsPerPage;
    const indexOfFirstEvent=indexOfLastEvent - postsPerPage;
    const currentEvents=events.events.slice(indexOfFirstEvent,indexOfLastEvent)

    const handlePagination = (pageNumber) => {
        setCurrentPage (pageNumber);
    };
    return(
        <>
        <ol>
        { events.events.length!==0 && events.events.length!==undefined?(
            currentEvents.map((event)=>{
              return  <Event key={event.event_id} event={event}/>
            })
        ):<p>No Events to show now.</p>}
        </ol>
        <Pagination length={events.events.length}
        currentPage={currentPage}
        postsPerPage={postsPerPage}
        handlePagination={handlePagination}
        />
        </>
    )

}