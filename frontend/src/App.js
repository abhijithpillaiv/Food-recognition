import React, { useState, Suspense } from 'react'
import { BrowserRouter, Route, Router, Routes } from 'react-router-dom'
import './scss/style.scss'
import './assets/css/style.css'
import { CookiesProvider } from 'react-cookie';
import { useCookies } from 'react-cookie';
import {LoginContext} from './context/loginContext'
import './assets/css/index.css'

export default function App() {
  const loading = (
    <div className="pt-3 text-center">
      <div className="sk-spinner sk-spinner-pulse"></div>
    </div>
  )
  // Containers
   const DefaultLayout = React.lazy(() => import('./layout/DefaultLayout'))
  // Pages
  const Login = React.lazy(() => import('./container/login&Signup/login/login'))

  const [cookies, setCookie] = useCookies(['status']);
  const [User, setUser] = useState(null)
  return (
    <BrowserRouter>
      <CookiesProvider>
      <LoginContext.Provider value={{ User: User, setUser: setUser }}>
    
        <Suspense fallback={loading}>
          <Routes>
              <Route path="*" name="Home" element={<DefaultLayout />} /> 
          </Routes>
        </Suspense>
        </LoginContext.Provider>
      </CookiesProvider>
    </BrowserRouter>
  )
}