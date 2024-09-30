import emailjs from '@emailjs/browser';

export default function ReserveEvent({addEventToGoogleCalendar}){
    
  const eventsFromStorage = JSON.parse(localStorage.getItem('events'));

console.log('event',eventsFromStorage);
    const sendEmail =(e)=>{
        e.preventDefault();
        emailjs.sendForm('service_pnuh23h','template_xlhp2gl',e.target,'NX_g3-od0DvZqSgk2');
        addEventToGoogleCalendar(eventsFromStorage);
        // e.target.reset();
    }
    return (
        <form onSubmit={sendEmail} className='signin'>
            <div className="mb-1 flex flex-col gap-6">
            <h1>Contact Information</h1>
            <label className="title">First Name</label>
            <input className='inp' type='text' name='user_name'/>
            <label className="title">Last Name</label>
            <input className='inp' type='text'/>
            <label className="title">Email</label>
            <input className='inp' type='email' name='user_email'/>
            <button className="button">Reserve</button>
            </div>
        </form>
    )
}