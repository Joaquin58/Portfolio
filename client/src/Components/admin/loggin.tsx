import React, { MouseEvent } from 'react'

const loggin = () => {
  function getusers(e: MouseEvent<HTMLButtonElement>) {
    e.preventDefault()
    
  }
  return (
    <div>loggin
      <div>

      <button onClick={getusers}>get users</button>
      </div>
    </div>
  )
}

export default loggin