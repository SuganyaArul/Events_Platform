import { useEffect, useState, useContext } from "react"
import UserContext from "../Contexts/UserContext";
import { getUserEvents } from "../Utils/api";
import EventsList from "./EventsList";

export default function UserEvents({events, setEvents}){
    const [error, setError]=useState();
    const {loggedInUser} = useContext(UserContext);
    const email=loggedInUser.user.email
    useEffect(()=>{
        getUserEvents(email).then((body)=>{
            setEvents(body)
            setError(false)
        }).catch((error)=>{
            setError(true)
        })
    },[])
    return (
        <>
            {error?<div>No Events Created By you to List...</div>:<EventsList events={events}/>}
        </>
    )
}