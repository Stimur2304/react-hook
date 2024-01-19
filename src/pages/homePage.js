import React from 'react'
import "./home.css"
const HomePage = () => {
        const Data  = JSON.parse(localStorage.getItem("data"))
        console.log(Data)
  return (
    <div className='HomePage'>
      <h1>Home Page</h1>
      {JSON.stringify(Data.id)}
    </div>
  )
}

export default HomePage