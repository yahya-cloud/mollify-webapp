# Mollify Webapp

This is MERN stack web application which connects people suffering from mental disorders to a specified psychologists. visit the live webapp here [Mollify](https://mollify-webapp.herokuapp.com/).

## Description

• This web app facilitates people with registered psychologist's details such as price address etc so that users can schedule a session (home, virtual, clinic) by their choice

• Psychologist gets the requests and can accept or reject it as per their schedule. A schedule table and calendar are provided on schedule page.

• If psychologist accepts the request. Both can now have message communication from the chat panel in the web-app. Accepted Session is also added in Calendar and schedule table on patient side.

• If virtual session was requested a tab is been generated with the photo of the each other on both the side in video conference page. After clicking the tab user have the option to place a video call.

• On the other side user is been notified about the incoming call hence he/she can pick it up.

• Both can navigate each other from their present location

• According to the session succeed or failed, the data like total earnings, type of session, patient with disorder, rating etc is been updated

•Patient now give their rating to the doctor with whom they had the session

## Technology Stack

- **Frontend**: React.js, MaterialUI, CSS, Chart.js, Redux, MapBoxGL
- **Backend**: Express, Node.js, Socket.io, SimplePeer
- **IDE**: VS Code
- **Design**: Figma
- **Version Control**: Git and GitHub
- **Database**: MongoDB

## Get Started

Clone the app then in root folder install the dependencies
`npm install`

then go to client folder and install dependencies
`cd client`
`npm install`

make a .env file with two fields <br/>
`REACT_APP_API_URL`: 'your localhost backend server'<br/>
`REACT_APP_SOCKET_URL`: 'ws:backend server'<br/>
`REACT_APP_MAPBOX_TOKEN`: 'your mapBoxGl access token'<br/>


come back to root folder and then go to server folder make a .env file with two <br/>
`CONNECTION_URL`: 'your mongodb connection url'<br/>
`SECRET`: 'any string value'<br/>

then go to client folder and start the development server
`npm run start`

come back to root folder and start the backend server
`npm run start`
