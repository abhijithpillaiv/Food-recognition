import React from 'react'
import AppHeader from '../components/AppHeadder/index'
import AppContent from '../components/AppContent/index'
import AppFooter from '../components/AppFotter/index'
const DefaultLayout = () => {
  return (
    <div>
      {/* <AppSidebar /> */}
      <div  className="wrapper d-flex flex-column min-vh-100 ">
        <AppHeader />
        <div className="body flex-grow-1 px-3">
          <AppContent />
        </div>
        <AppFooter />
      </div>
    </div>
  )
}

export default DefaultLayout
