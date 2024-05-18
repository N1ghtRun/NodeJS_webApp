import './App.css';
import { Component } from 'react';

import React from 'react';
import { BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import RegisterEvent from './components/RegisterEvent';
import ViewParticipants from './components/ViewParticipants';
import Home from './components/home';


class App extends Component {

constructor(props){
  super(props);
  this.state={
    events:[]
  }
}


API_URL = "http://localhost:3002";

componentDidMount(){
  this.refreshEvents();
}

async refreshEvents() {
  fetch(this.API_URL + "/events")
    .then(response => {
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return response.json(); // This line parses the JSON body of the response
    })
    .then(data => {
      console.log("Fetched events:", data);
      this.setState({ events: data }); // Make sure 'data' is an array
    })
    .catch(error => {
      console.error("Error fetching events:", error);
    });
}


render() {
  const { events } = this.state;
  return (
    <Router>
      <Routes> {/* Use 'Routes' instead of 'Switch' */}
        <Route path="/" element={<Home events={events} />} />
        <Route path="/register/:eventId" element={<RegisterEvent />} />
        <Route path="/participants/:eventId" element={<ViewParticipants />} />
      </Routes>
    </Router>
  );
}

}
export default App;
