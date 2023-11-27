import React from 'react'
import { Link } from 'react-router-dom'

const home = () => {
  return (
    <div>
      home
      <Link to="/loggin" >
        <button>
          loggin
        </button>
      </Link>
    </div>
  )
}

export default home