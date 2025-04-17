
import './App.css'
import { BrowserRouter , Router, Route, Routes , Navigate} from 'react-router-dom'
import GoogleLogin from './GoogleLogin'
import { useState } from 'react'  
import Dashboard from './Dashboard'
import PageNotFound from './PageNotFound'
import { GoogleOAuthProvider } from '@react-oauth/google';
import RefreshHandler from './RefreshHandler';



function App() {

  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const GoogleAuthWrapper = () =>{

    return (
      <GoogleOAuthProvider clientId='***********************************************************************'>
        <GoogleLogin></GoogleLogin>
      </GoogleOAuthProvider>

    )

  }
  const PrivateRoute = ({element}) => {
		return isAuthenticated ? element : <Navigate to="/login" />
	}
  console.log('isAuthenticated:', isAuthenticated);
  return (
    <BrowserRouter>
    <RefreshHandler setIsAuthenticated={setIsAuthenticated} />

    <Routes>
      <Route path= "/login" element={<GoogleAuthWrapper/>}/>

      <Route path= "/" element={<Navigate to = '/login'/>}/>

      <Route path='/dashboard' element={<PrivateRoute element={<Dashboard/>}/>}/>

      <Route path= "*" element={<PageNotFound/>}/>

    </Routes>
      
    </BrowserRouter>
  )
}

export default App
