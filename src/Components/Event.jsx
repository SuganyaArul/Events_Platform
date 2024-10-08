import { Link } from "react-router-dom"
export default function Event({event}){
    return(
        <Link to={`/events/${event.event_id}`}>
        <li className="event">
            <img src={event.image} alt="Images for this event"/>
            <span>
            <p>{event.title}</p>
            <p>{event.date}</p>
            <p>{event.address}</p>
            <p>{event.description} 💙</p>
            <p>{event.ticket_info} </p>
            <p>{event.created_by}</p>
            </span>
        </li>
       </Link>
    )
}