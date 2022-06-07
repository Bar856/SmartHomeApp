import React from 'react'
import { Navigate } from 'react-router';
import { useState } from 'react';

export default function RoomSQ(props) {
  const [navToRoom, setNavToRoom] = useState(false)

  const goToRoom = () =>{
    props.setRoomSelected(props.room);
    setNavToRoom(true);
  }
  return (
    <div className='col-6'>
      <div onClick={goToRoom} style={{'backgroundColor':props.room.color}} className='roomSq white'>
        {props.room.name}
        <br/>
        {props.room.devices.length} Devices
        {navToRoom && <Navigate replace to={props.getRoomLink()}/>}
      </div>
    </div>
  )
}
