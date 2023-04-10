import React, { useState } from 'react'
import AppHeader from '../components/AppHeadder/index'
import AppContent from '../components/AppContent/index'
import AppFooter from '../components/AppFotter/index'
const DefaultLayout = () => {
  const [route, setroute] = useState('home')
  return (
    <div>
      <div  className="wrapper d-flex flex-column min-vh-100 ">
        <AppHeader route={route} />
        <div className="body flex-grow-1 px-3">
          <AppContent setroute={setroute}/>
        </div>
        <AppFooter />
      </div>
    </div>
  )
}

export default DefaultLayout
