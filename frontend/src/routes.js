import React from 'react'

const Dashboard = React.lazy(() => import('./views/dashboard/Dashboard'))


const Login = React.lazy(() => import('./views/pages/login/Login'))
const logout = React.lazy(() => import('./views/settings/logout'))

const personalise = React.lazy(() => import('./views/Personalise/index'))



const routes = [
  { path: '/', exact: true, name: 'Home' },
  { path: '/dashboard', name: 'Dashboard', element: Dashboard },

  { path: '/login', name: 'Settings / Change Password', element: Login },
  { path: '/logout', name: 'notice / Edit Notice', element: logout },


  { path: '/personalise', name: 'Personalise', element: personalise },

]

export default routes
