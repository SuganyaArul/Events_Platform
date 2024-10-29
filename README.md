# EVENTS PLATFORM

This website project is typically used by business, organizations, or individuals who want to promote and manage their events within a community.In this Project, I have developed an responsive UI and accessible webpages for the user to sign up, sign in, create events, view events and adding events to user calendar. Also I have created a new backend Api [eventsAPI](https://github.com/SuganyaArul/events_API) to fetch/retrieve the relevant data based on the webpage load. 

The website is now deployed in live, available on Vercel hosted at https://events-platform-pi.vercel.app/

# HOW TO USE
Below are few sample user logon details which I have used for testing the scope of MVP features, please consider the below for your testing and as well create own user accounts 

# Test user Accounts:

username:suganyaarul@abc.com
password:sugan@12

username:benmitchell24@abc.com
password:benmi@24

username:sarahmachin04@abc.com
password:Sara@y04

# Website Features:

# 1. Home Page:
A.Search Events: User can search events by location and title, by default if user clicks on search button all the events will be loaded. Based on the search criteria the corresponding event cards will be displayed.

![Home Page](image.png)

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


