import React from 'react'
import { useNavigate } from 'react-router-dom'



function PageNotFound() {
    const navigate = useNavigate();
  return (
    <div> 
        
        <h1>404 PageNotFound</h1>
        
        
        <button onClick = {() => navigate('/login')} >Back to Login</button>
        </div>
  )
}

export default PageNotFound