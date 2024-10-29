import axios from "axios";
const eventsApi = axios.create({ baseURL: "https://events-platform-api.onrender.com/api" });
export  const getEvents=( searchQuery)=> {
    return eventsApi.get('/events',{
    params:{
      topics:searchQuery.topics,
      location:searchQuery.location,
    }
  }).then((response) => {
    return response.data;
  });
}

export  const getEventsByID=( id)=> {
  return eventsApi.get(`/events/${id}`).then((response) => {
    
  return response.data.event;
});
}

export const getUserDetails=(email,password)=>{
  return eventsApi.get('/user',{
    params:{
        email:email,
        password:password,
    }
}).then((response)=>{
    return response.data;
})
}

export const getUserEvents=(email)=>{
  return eventsApi.get('/user/events',{
    params:{
        email:email,
    }
}).then((response)=>{
    return response.data;
})
}

export const postUserDetails=(userDetail)=>{
  return eventsApi.post('/user',userDetail).then((response)=>{
    return response.data;
})
}

export const postNewEvents=(eventsData)=>{
  return eventsApi.post('/event',eventsData).then((response)=>{
    return response.data;
})
}

export const postAttendeeDetails=(attendeeData)=>{
  return eventsApi.post('/events/attendees',attendeeData).then((response)=>{
    return response.data;
  })
}