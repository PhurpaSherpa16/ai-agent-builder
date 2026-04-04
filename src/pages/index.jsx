import React from 'react'
import { Link } from 'react-router-dom'

export default function Index() {
  return (
    <div>
        <h1 className='text-3xl text-red-500 font-bold underline'>This is Home Page.</h1>
        <Link to="/new">Go to Agent Builder</Link>
    </div>
  )
}
