import React from 'react'
import { useState } from 'react';
import { Navigate } from 'react-router';

export default function Contact(props) {
  const [roomType, setRoomType] = useState('');
  const [roomName, setRoomName] = useState('');
  const [roomColor, setRoomColor] = useState('');
  const [navToHome, setNavToHome] = useState(false);
  const capitalizeFirstLetter = (n) => {return n.charAt(0).toUpperCase() + n.slice(1);}
  
  const addRoom = () =>{
    if (!(roomType.length)){
      alert("Please Choose Room Type");
      return setNavToHome(true);
    }else if (!(roomName.length)){
      alert("Please Choose Room Name");
      return setNavToHome(true);
    }else if (!(roomColor.length)){
      alert("Please Choose Room Color");
      return setNavToHome(true);
    }
    let room = {
      type:roomType,
      name:roomName,
      color:roomColor,
      devices:[]
    };
    props.addRoomFn(room);
    setNavToHome(true);
  }
  return (
    <div className='container'>
      <div className='row'>
        <div className='row'>
          <select style={{"width":"300px"}} className='margeTen' defaultValue={'DEFAULT'} name="selectRoomType" id="selectRoomType" onChange={(e)=>{setRoomType(e.target.value)}}>
            <option value="DEFAULT" disabled >Choose Room</option>
            <option value='BathRoom'>BathRoom</option>
            <option value='BedRoom'>BedRoom</option>
            <option value='Kitchen'>Kitchen</option>
          </select>
        </div>
        <div className='row'>
          <input style={{"width":"300px"}} className='margeTen' type="text" placeholder='Room Name' maxLength={5} onChange={(e)=>{setRoomName(capitalizeFirstLetter(e.target.value))}}/>
        </div>
        <div className='col'>
          <div className='row'>
          <label style={{marginRight:'10px'}} className='black' htmlFor="roomColor">Color:</label>
          </div>
          <input style={{width:'50px',height:'40px'}} type="color" name="roomColor"onChange={(e)=>{setRoomColor(e.target.value)}}/>
        </div>
        <div className='col'>
          <input className='margeTen' type="button" value="Create" onClick={addRoom}/>   
        </div>
      </div>
      {/* NAV */}
      {navToHome && <Navigate replace to="/SmartHomeApp" />}
    </div>
  )
}
