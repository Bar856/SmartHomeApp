import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import Navbar from './compoments/Navbar'
import AddRoom from './compoments/AddRoom'
import Header from './compoments/Header'
import HomePage from './compoments/HomePage'
import Room from './compoments/Room';

import { useState } from 'react';
import {
  BrowserRouter as Router,
  Route,
  Routes,
} from "react-router-dom";

function App() {
  const [rooms, setRooms] = useState([]);

  const addRoomFn = (room) =>{
    setRooms([...rooms,room]);
  }
  const [roomSelected, setRoomSelected] = useState({})
  const getRoomLink = () =>{
    return '/room/' + roomSelected.name
  }
  return (
    
    <div className="App">
      <Router>
      <Navbar/>
      <Header title="Smart Home"/>
        <Routes>
          <Route path='/' element={<HomePage getRoomLink={getRoomLink} setRoomSelected={setRoomSelected} rooms={rooms} />}/>
          <Route path='/AddRoom' element={<AddRoom addRoomFn={addRoomFn}/>}/>
          <Route path={getRoomLink()} element={<Room link={getRoomLink()} rooms={rooms} setRooms={setRooms} roomSelected={roomSelected}/>}/>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
