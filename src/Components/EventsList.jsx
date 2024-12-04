import { useState, useEffect } from "react";
import Event from "./Event";
import Pagination from "./Pagination";
import { getEvents } from "../Utils/api";
import {useSearchParams} from "react-router-dom"
import { Hourglass } from "react-loader-spinner";
export default function EventsList({events,setEvents}){
    const [searchParams]=useSearchParams()
    const [isLoading,setIsLoading] = useState()
    // const [searchQuery,setSearchQuery]=useState([])
    
    const topics=searchParams.get('topics')
    const location=searchParams.get('location')
    const searchQuery={
        topics:topics,
        location:location
    }
    
    useEffect(()=>{
      
          setIsLoading(true)
        getEvents(searchQuery).then((body)=>{
            setEvents(body)
            
            setIsLoading(false)
            
        }).catch((error)=>{
            setEvents(null)
            setIsLoading(false)
            
        })
    },[topics,location])
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
    if(isLoading){return <div><Hourglass
        visible={true}
        height="80"
        width="80"
        ariaLabel="hourglass-loading"
        wrapperClass=""
        colors={["#575757", "#949494"]}
      />
      <p>Events Loading, please wait...</p></div>}
    return(
        <>
        <ol>
        {events!==null && events.length!==0 && events.events.length!==0 && events.events.length!==undefined?(
            currentEvents.map((event)=>{
              return  <Event key={event.event_id} event={event}/>
            })
        ):<p>No Events to show matching the search criteria!!!</p>}
        </ol>
        {events!==null && events.length!==0 ?
        <Pagination length={events.events.length}
        currentPage={currentPage}
        postsPerPage={postsPerPage}
        handlePagination={handlePagination}
        />:null}
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