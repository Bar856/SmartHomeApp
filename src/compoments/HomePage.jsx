import React from 'react'
import RoomSQ from './RoomSQ'
import { useState } from 'react';
import { Navigate } from 'react-router';

export default function HomePage(props) {
  const [navToAddRoom, setNavToAddRoom] = useState(false)
  
  return (
    <div className='container'>
      <div className='col'>
        <input type="button" className='plusBtn' value="+" onClick={()=>setNavToAddRoom(true)}/>   
      </div>
      <div className='row'>
        {
          props.rooms.map((room,i)=>{
          return <RoomSQ getRoomLink={props.getRoomLink} setRoomSelected={props.setRoomSelected} key={i} room={room}/>
          })
        }
      </div>
      
      {/* NAV */}
      {navToAddRoom && <Navigate replace to="/AddRoom"/>}
    </div>
  )
}
