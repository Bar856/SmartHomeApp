import React from 'react';
import { useState } from 'react';
import Device from './Device';
import { Navigate } from 'react-router';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';
export default function Room(props) {

  const [navToHome, setNavToHome] = useState(false)

  const [addDeviceStyle, setAddDeviceStyle] = useState({display:'none'});
  const [deviceToAdd, setDeviceToAdd] = useState('');
  const [addOtherStyle, setAddOtherStyle] = useState({display:'none'});
  const capitalizeFirstLetter = (n) => {return n.charAt(0).toUpperCase() + n.slice(1);}
  const checkSelect = (option) =>{
    setDeviceToAdd(option);
    if (option === 'Other'){
      setAddOtherStyle({display:'block'})
    }else{
      setAddOtherStyle({display:'none'})
    }
  };

  // max stereo -1 + boiler only in BathRoom
  const devicesTest = () =>{
    const Boiler = 'Boiler';
    const BathRoom = 'BathRoom';
    const StereoSystem = 'Stereo System';
    let pass = true;
    let tmpRooms = [...props.rooms];
    let room = tmpRooms.filter(r=>r===props.roomSelected)[0];
    if (room.devices.length > 4){
      pass = false;
      return pass;
    }else{
      switch (deviceToAdd) {
        case Boiler:
          if (room.type !== BathRoom){
            pass = false;
          }
          return pass;
        case StereoSystem:
          if (room.devices.length){
            room.devices.forEach(d=>{
              if (d.name === StereoSystem){
                pass=false;
                return pass;
              }
            })
          }
        default:
          return pass;
      }
    }
  }
  const addDeviceToRoom = () => {
    if (deviceToAdd!==''){
      if (devicesTest()){
        let newDevice = {
          name:deviceToAdd,
          state:false
        }
        let tmpRooms = [...props.rooms];
        tmpRooms.forEach((r,i) => {
          if (r===props.roomSelected){
            let tmpDevices = tmpRooms[i].devices;
            tmpDevices.push(newDevice)
            tmpRooms[i].devices = tmpDevices;
            props.setRooms(tmpRooms);
          }
        });
        setAddDeviceStyle({display:'none'});
        setDeviceToAdd('');
        document.getElementById("selecBoxDevices").value = 'DEFAULT';
      }else{
        toast('Error');
      }
    }else{
      toast("please choose device");
    }
  }
  const changeStateOfDevice = (deviceNum) =>{
    let tmpRooms = [...props.rooms];
    tmpRooms.forEach((r,i)=>{
      if (r===props.roomSelected){
        let tmpDevices = tmpRooms[i].devices;
        tmpDevices[deviceNum].state = !tmpDevices[deviceNum].state;
        tmpRooms[i].devices = tmpDevices;
        props.setRooms(tmpRooms);
      }
    })
  }
  const deleteRoom = () =>{
    let tmpRooms = [...props.rooms];
    tmpRooms.forEach((r,i)=>{
      if (r===props.roomSelected){
        tmpRooms.splice(i,1);
        props.setRooms(tmpRooms);
        toast('Room Deleted Succesfully')
        setNavToHome(true);
      }
    })
  }
  const chukNumOfDevices = () =>{
    let tmpRooms = [...props.rooms];
    let room = tmpRooms.filter(r=>r===props.roomSelected)[0];
    if (room.devices.length >4){
      toast("Maximum Devices")
    }else{
      setAddDeviceStyle({display:'block'})
    }
  }
  const deleteDevice = (deviceNum) =>{
    let tmpRooms = [...props.rooms];
    tmpRooms.forEach((r,i)=>{
      if (r===props.roomSelected){
        let tmpDevices = tmpRooms[i].devices;
        tmpDevices.splice(deviceNum,1);
        tmpRooms[i].devices = tmpDevices;
        props.setRooms(tmpRooms);
      }
    })
  }
  return (
    <div className='black'>
      <div className='container'>
        <h2 >{props.roomSelected.name}</h2>
        <h3 >{props.roomSelected.type}</h3>
        <div className='row'>
          {
            props.roomSelected.devices.map((d,i)=>{
              return <Device key={i} deleteDevice={deleteDevice} changeStateOfDevice={changeStateOfDevice} deviceNum={i} name={d.name} state={d.state}/>
            })
          }

        </div>
        <div className='col margeTen'>
          <input className='bigButtons' type={'button'} onClick={chukNumOfDevices} value='Add Device' />
        </div>
        <div className='col margeTen'>
          <input className='bigButtons' type={"button"} value="Back Home" onClick={()=>setNavToHome(true)} />
        </div>
        <div className='col margeTen'>
          <input className='bigButtons' style={{color:'red'}} type={"button"} value="Delete Room" onClick={deleteRoom} />
        </div>
      </div>

      <div style={addDeviceStyle} className='container'>
        <select id='selecBoxDevices' className='col margeTen' defaultValue={'DEFAULT'} onChange={(e)=>{checkSelect(e.target.value)}}>
          <option value="DEFAULT" disabled>Choose Device</option>
          <option value='AC'>AC</option>
          <option value='Boiler'>Boiler</option>
          <option value='Stereo System'>Stereo System</option>
          <option value='Light'>Light</option>
          <option value='Other'>Other</option>
        </select>

        <div className='col margeTen' style={addOtherStyle}>
          <input type={'text'}  maxLength='11' placeholder='Write Name Of Device' onChange={(e)=>{setDeviceToAdd(capitalizeFirstLetter(e.target.value))}}/>
        </div>
        
        <div className='col margeTen'>
          <input type={'button'} onClick={addDeviceToRoom} value='Add' />
        </div>
      </div>
      {/* NAV */}
      {<ToastContainer/>}
      {navToHome && <Navigate replace to="/SmartHomeApp"/>}
    </div>
  )
}
