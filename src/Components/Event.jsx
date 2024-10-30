import { Link } from "react-router-dom"
export default function Event({event}){
    return(
        <Link to={`/events/${event.event_id}`} className="event_link">
        <li className="event">
            <img src={event.image} alt="Images for this event"/>
            <span className="event_details">
            <p className="title">{event.title}</p>
            <p>{event.date}</p>
            <p>{event.address}</p>
            {/* <p>{event.description} 💙</p> */}
            {event.ticket_info==='free' || event.ticket_info === '0.00'?<p>Free</p>:<p>{event.ticket_info} </p>}
            {/* <p>{event.created_by}</p> */}
            </span>
        </li>
       </Link>
    )
}