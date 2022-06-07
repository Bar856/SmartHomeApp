import React from 'react'
import { useState } from 'react';


export default function Device(props) {
  const [onOffState, setOnOffState] = useState(props.state)

  const turnOnOffDevice = () =>{
    props.changeStateOfDevice(props.deviceNum);
    setOnOffState(!onOffState)
  }
  return (
    <div className='turnOfDiv col margeTen pad' style={props.state ? {'backgroundColor':'red'} : {'backgroundColor':'white'}} >
      <div style={{"marginTop":'10px',"fontSize":'12px'}} >
        <div>
          <h6>{props.name}</h6>
        </div>
        <input className='margeTwo' onClick={turnOnOffDevice} type={'button'} value={props.state ? 'Turn off' : 'Turn on'}></input>
        <input className='margeTwo'  style={{color:'red'}} onClick={()=>props.deleteDevice(props.deviceNum)} type={'button'} value={'Delete'}></input>
      </div>
    </div>
  )
}
