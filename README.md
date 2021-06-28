# Mollify Webapp

This is MERN stack web application which connects people suffering from mental disorders to a specified physiologist [Mollify](https://mollify-webapp.herokuapp.com/).

## Description

·This web app facilitates people with registered psychologist's details such as price address etc so that users can schedule a session (home / clinic) as per his feasibility

·Psychologist will receive details such as requested time, disorder etc, hence can accept or reject request according to scheduled calendar depending on the session booked already and location feasibility,

·Once Psychologist has accepted the patient request then both have the facility to navigate to each other present location

·Data driven Dashboard has been created to facilitate doctor to view information like completed session, earning etc

·Graphical representation of failed/successful session, daily schedule,rating & pending requests is also provided in the dashboard.

·Both Doctors and patients can update & delete their profile.

## Technology Stack

React.js, Exress.js, Node.js, Mongo DB, Redux, Chart.js for graphical representation,
MapboxGl for integrating Map,Material UI, Heroku, Figma for designing website and styling Svg.

## Get Started
Clone the app then in root folder install the dependencies
```npm install```

then go to client folder and install dependencies 
```cd client```
```npm install```

change the baseURL in client/api/index.js to
```http://localhost:5000/```
so as to direct all requests to your local backend server

come back to root folder and then go to server folder make a .env file with two fields
```CONNECTION_URL```: 'your mongodb connection url'
```SECRET```: 'any string value'

then go to client folder and start the development server
```npm run start``

come back to root folder and start the backend server
```npm run start``