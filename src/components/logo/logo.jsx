import React from 'react'

import './logo.css'
import logoImg from './job.png'

export default function Logo() {
  return (
    <div className="logo-img">
      <img src={logoImg} alt=""/>
    </div>
  )
}