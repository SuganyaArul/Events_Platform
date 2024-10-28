# EVENTS PLATFORM

This project is typically used by business, organizations, or individuals who want to promote and manage their events within a community.
In this Project, I developed responsive UI and accessible pages and fetched data from backend Api which I developed for this events project [eventsAPI](https://github.com/SuganyaArul/events_API)
It is live now , deployed on Vercel at https://events-platform-pi.vercel.app/

# HOW TO USE
Below are few sample user details for testing in your local environment, you might consider creating users
username:suganyaarul@abc.com
password:sugan@12

username:benmitchell24@abc.com
password:benmi@24

username:sarahmachin04@abc.com
password:Sara@y04

1.Search Events: Users can search events by location and title, and corresponding event cards will be displayed.

2.View Event Details: Clicking an event displays detailed information about the event.

3.Reserve a Ticket:
   - When the user clicks "Reserve," a new window opens where they can enter their full name and email.
   - If a Google email is provided, the event will be automatically added to the user's Google Calendar using the Google Calendar API.
   - If a non-Google email is provided, they will receive an email confirmation of their reservation.

4.Create Events: Users who are signed in to the app will have the ability to create new events.


# INSTRUCTIONS TO SETUP

The code for this project will available in [this GitHub Repo](https://github.com/SuganyaArul/Events_Platform)

1.To clone using the git command

```
git clone https://github.com/SuganyaArul/Events_Platform
```
2.cd into the root Events_Platform

3.To install npm package

```
npm install
```
4.To install axios package

```
npm install axios
```
5.To install react router package

```
npm i react-router-dom
```
6.Create new .env file to set CLIENT_ID and API_KEY

REACT_APP_CLIENT_ID=
REACT_APP_API_KEY=

7.To view in browser, give the below command in Terminal

```
npm start
```


