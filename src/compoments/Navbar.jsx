import React from 'react'
import { Link } from 'react-router-dom'
export default function Navbar() {
  return (
    <div className='navBar opa fixed-top'>
      <div className='row'>
        <div className='col-12'><Link to={'/'}>Home</Link></div>
      </div>
    </div>
  )
}
